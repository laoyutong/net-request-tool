import { Storage } from "@plasmohq/storage"

import { STORAGE_KEY } from "~config"
import type { Configuration } from "~types"

const storage = new Storage()

const state: { ruleIds: number[]; bigId: number; smallId: number } = {
  ruleIds: [],
  bigId: 1,
  smallId: 1
}

const getRuleId = () => {
  const id = state.bigId++ * 100 + state.smallId++
  state.ruleIds.push(id)
  return id
}

const clear = async () => {
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: state.ruleIds
  })
  state.ruleIds = []
}

const handle = async (configuration?: Configuration) => {
  await clear()

  if (!configuration?.isOpen) {
    return
  }

  const activeConfig = configuration.configs[configuration.configIdx]
  if (
    !activeConfig?.requestHeaders?.length &&
    !activeConfig?.redirects?.length
  ) {
    return
  }

  const rules: chrome.declarativeNetRequest.Rule[] = []

  const activeRequestHeaders = activeConfig.requestHeaders?.filter((item) =>
    Object.values(item).every(Boolean)
  )

  if (activeRequestHeaders.length) {
    const action = {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
      requestHeaders: activeRequestHeaders.map((item) => ({
        header: item.name,
        value: item.value,
        operation: chrome.declarativeNetRequest.HeaderOperation.SET
      }))
    }

    const activeRequestUrlFilters = activeConfig.requestUrlFilters?.filter(
      (item) => Object.values(item).every(Boolean)
    )

    if (activeRequestUrlFilters?.length) {
      rules.push(
        ...activeRequestUrlFilters.map((filterItem) => ({
          id: getRuleId(),
          action,
          condition: {
            urlFilter: filterItem.urlFilter,
            requestMethods: filterItem.methods
          }
        }))
      )
    } else {
      rules.push({
        id: getRuleId(),
        action,
        condition: {}
      })
    }
  }

  const activeRedirect = activeConfig.redirects?.filter((item) =>
    Object.values(item).every(Boolean)
  )

  if (activeRedirect?.length) {
    rules.push(
      ...activeRedirect.map((item) => ({
        id: getRuleId(),
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
          redirect: {
            regexSubstitution: item.to
          }
        },
        condition: {
          regexFilter: `^${item.from.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")}$`
        }
      }))
    )
  }

  chrome.declarativeNetRequest.updateSessionRules({
    addRules: rules
  })
}

const watch = () => {
  storage.watch({
    [STORAGE_KEY.configuration]: ({ newValue }) => {
      handle(newValue)
    }
  })
}

const init = async () => {
  const configuration = await storage.get<Configuration>(
    STORAGE_KEY.configuration
  )
  handle(configuration)
}

init()
watch()

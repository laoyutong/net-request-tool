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
  if (!activeConfig?.requestHeaders?.length) {
    return
  }

  const action = {
    type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
    requestHeaders: activeConfig.requestHeaders
      .filter((item) => Object.values(item).every(Boolean))
      .map((item) => ({
        header: item.name,
        value: item.value,
        operation: chrome.declarativeNetRequest.HeaderOperation.SET
      }))
  }

  const activeRequestUrlFilters =
    activeConfig.requestUrlFilters?.filter(
      (item) => item.active && item.urlFilter
    ) ?? []

  if (activeRequestUrlFilters.length) {
    chrome.declarativeNetRequest.updateSessionRules({
      addRules: activeRequestUrlFilters.map((filterItem) => {
        const ruleId = getRuleId()
        return {
          id: ruleId,
          action,
          condition: {
            urlFilter: filterItem.urlFilter,
            requestMethods: filterItem.methods
          }
        }
      })
    })
  } else {
    const ruleId = getRuleId()
    chrome.declarativeNetRequest.updateSessionRules({
      addRules: [
        {
          id: ruleId,
          action,
          condition: {}
        }
      ]
    })
  }
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

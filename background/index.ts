import { Storage } from "@plasmohq/storage"

import { STORAGE_KEY } from "~config"
import { Configuration } from "~types"

const storage = new Storage()

const state: { ruleIds: number[]; bigId: number; smallId: number } = {
  ruleIds: [],
  bigId: 1,
  smallId: 1
}

const getRuleId = () => state.bigId++ * 100 + state.smallId++

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

  const ruleId = getRuleId()
  state.ruleIds.push(ruleId)

  chrome.declarativeNetRequest.updateSessionRules({
    addRules: [
      {
        id: ruleId,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          requestHeaders: activeConfig.requestHeaders
            .filter((item) => item.active)
            .map((item) => ({
              header: item.name,
              value: item.value,
              operation: chrome.declarativeNetRequest.HeaderOperation.SET
            }))
        },
        condition: {}
      }
    ]
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

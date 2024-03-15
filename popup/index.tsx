import { useDebounce, useMount, useUpdateEffect } from "ahooks"
import icon from "data-base64:~assets/icon.png"
import React, { useState } from "react"

import "@icon-park/react/styles/index.css"

import { Storage } from "@plasmohq/storage"

import type { ConfigContent, Configuration } from "~types"

import "./style.css"

import { Empty } from "antd"
import { produce } from "immer"

import { DEFAULT_CONFIGURATION, STORAGE_KEY } from "~config"

import { ConfigForm } from "./components/ConfigForm"
import { Navigation } from "./components/Navigation"

const storage = new Storage()

const Popup = () => {
  const [configuration, setConfiguration] = useState<Configuration>()

  const activeConfig = configuration?.configs[configuration?.configIdx]

  useMount(async () => {
    const content = await storage.get<Configuration>(STORAGE_KEY.configuration)
    setConfiguration(content || DEFAULT_CONFIGURATION)
  })

  const debouncedValue = useDebounce(configuration, { wait: 500 })

  useUpdateEffect(() => {
    storage.set(STORAGE_KEY.configuration, debouncedValue)
  }, [debouncedValue])

  const renderHeader = () => (
    <div className="flex items-center p-[8px] bg-gray-100">
      <img className="w-[24px] h-[24px] mr-[12px]" src={icon} alt="" />
      <span className="font-semibold text-[14px]">Net Request Tool</span>
    </div>
  )

  const removeConfig = () => {
    setConfiguration((pre) =>
      produce(pre, (draft) => {
        draft.configs.splice(draft.configIdx, 1)
        draft.configIdx = 0
      })
    )
  }

  const updateConfig = (configContent: ConfigContent) => {
    setConfiguration((pre) =>
      produce(pre, (draft) => {
        draft.configs[draft.configIdx] = configContent
      })
    )
  }

  const renderContent = () => {
    if (!configuration) {
      return null
    }

    return (
      <div className="flex h-[360px]">
        <Navigation
          configuration={configuration}
          setConfiguration={setConfiguration}
        />
        {activeConfig ? (
          <div className="relative flex-grow">
            <ConfigForm
              config={activeConfig}
              onChange={updateConfig}
              remove={removeConfig}
            />
            {!configuration.isOpen ? (
              <div className="absolute top-0 left-0 w-full h-full opacity-50 bg-black" />
            ) : null}
          </div>
        ) : (
          <Empty style={{ width: "100%" }} />
        )}
      </div>
    )
  }

  return (
    <div className="w-[600px] overflow-hidden flex flex-col">
      {renderHeader()}
      {renderContent()}
    </div>
  )
}

export default Popup

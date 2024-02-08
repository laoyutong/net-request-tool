import { AddFour } from "@icon-park/react"
import { Switch } from "antd"
import cls from "classnames"
import { produce } from "immer"
import React, { useState } from "react"

import { getDefaultConfig } from "~config"
import { Configuration } from "~types"

interface NavigationProps {
  configuration: Configuration
  setConfiguration: ReturnType<typeof useState<Configuration>>[1]
}

export const Navigation = ({
  configuration,
  setConfiguration
}: NavigationProps) => (
  <div className="w-[60px] bg-gray-200 flex flex-col items-center py-[12px] overflow-auto flex-shrink-container hide-scrollbar">
    <Switch
      value={configuration.isOpen}
      onChange={(v) =>
        setConfiguration((pre) =>
          produce(pre, (draft) => {
            draft.isOpen = v
          })
        )
      }
    />
    <div className="my-2 w-full">
      {configuration.configs.map((item, index) => {
        const isActiveConfig = configuration.configIdx === index
        return (
          <div
            key={`${item.name}-${index}`}
            className={cls(
              "w-full cursor-pointer h-[50px] flex-center",
              isActiveConfig && "bg-gray-50"
            )}
            onClick={() =>
              setConfiguration((pre) =>
                produce(pre, (draft) => {
                  draft.configIdx = index
                })
              )
            }>
            <div
              className={cls(
                "w-[30px] h-[30px] rounded-full flex-center font-semibold text-[16px]",
                isActiveConfig ? "bg-blue-300" : "bg-gray-300"
              )}>
              {item.name.slice(0, 1)}
            </div>
          </div>
        )
      })}
    </div>
    <AddFour
      className="cursor-pointer"
      theme="filled"
      size="24"
      fill="#9b9b9b"
      onClick={() => {
        setConfiguration((pre) =>
          produce(pre, (draft) => {
            const configLength = draft.configs.length

            draft.configs.push(getDefaultConfig((configLength + 1).toString()))
            draft.configIdx = configLength
          })
        )
      }}
    />
  </div>
)

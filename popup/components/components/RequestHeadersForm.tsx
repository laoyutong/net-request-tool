import { Copy, DeleteOne, Plus } from "@icon-park/react"
import { Checkbox, Input } from "antd"
import cls from "classnames"
import { produce } from "immer"
import React from "react"

import { FORM_HEADER_ICON_PROPS, FORM_ITEM_ICON_PROPS } from "~config"
import { ConfigContent } from "~types"

interface RequestHeadersFormProps {
  config: ConfigContent
  onChange: (value: ConfigContent) => void
  add: () => void
}

export const RequestHeadersForm = ({
  config,
  onChange,
  add
}: RequestHeadersFormProps) => {
  const updateRequestHeadersSelect = (checked: boolean) => {
    onChange(
      produce(config, (draft) => {
        draft.requestHeaders = draft.requestHeaders.map((item) => ({
          ...item,
          active: checked
        }))
      })
    )
  }

  return (
    <div className="rounded-sm border border-gray-200 border-solid">
      <div className="p-[8px] flex justify-between items-center">
        <Checkbox
          onChange={(e) => updateRequestHeadersSelect(e.target.checked)}
          checked={config.requestHeaders.every((item) => item.active)}
          indeterminate={
            config.requestHeaders.some((item) => item.active) &&
            config.requestHeaders.some((item) => !item.active)
          }>
          Request header
        </Checkbox>
        <Plus {...FORM_HEADER_ICON_PROPS} onClick={add} />
      </div>
      <div className="bg-gray-300 p-[8px]">
        {config.requestHeaders.map((item, index) => (
          <div className={cls("flex items-center", index !== 0 && "mt-[4px]")}>
            <Checkbox
              checked={item.active}
              onChange={(e) =>
                onChange(
                  produce(config, (draft) => {
                    draft.requestHeaders[index].active = e.target.checked
                  })
                )
              }
            />
            <div className="w-full flex items-center gap-[4px] ml-[4px]">
              <Input
                size="small"
                placeholder="name"
                value={item.name}
                onChange={(e) =>
                  onChange(
                    produce(config, (draft) => {
                      draft.requestHeaders[index].name = e.target.value
                    })
                  )
                }
              />
              <Input
                placeholder="value"
                size="small"
                value={item.value}
                onChange={(e) =>
                  onChange(
                    produce(config, (draft) => {
                      draft.requestHeaders[index].value = e.target.value
                    })
                  )
                }
              />
              <DeleteOne
                {...FORM_ITEM_ICON_PROPS}
                onClick={() =>
                  onChange(
                    produce(config, (draft) => {
                      draft.requestHeaders.splice(index, 1)
                    })
                  )
                }
              />
              <Copy
                {...FORM_ITEM_ICON_PROPS}
                onClick={() =>
                  onChange(
                    produce(config, (draft) => {
                      draft.requestHeaders.push(item)
                    })
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

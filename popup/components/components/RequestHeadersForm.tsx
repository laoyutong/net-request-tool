import { Copy, DeleteOne } from "@icon-park/react"
import { Checkbox, Input } from "antd"
import { produce } from "immer"
import React from "react"

import { FORM_ITEM_ICON_PROPS } from "~config"

import { renderFormHeader, type FormComponentProps } from "../config"

export const RequestHeadersForm = ({
  config,
  onChange,
  add
}: FormComponentProps) => {
  const onHeaderSelectChange = (checked: boolean) => {
    onChange(
      produce(config, (draft) => {
        draft.requestHeaders = draft.requestHeaders.map((item) => ({
          ...item,
          active: checked
        }))
      })
    )
  }

  if (!config?.requestHeaders?.length) {
    return null
  }

  return (
    <div className="form-container">
      {renderFormHeader(
        "Request header",
        config.requestHeaders,
        add,
        onHeaderSelectChange
      )}
      <div className="form-sub-container">
        {config.requestHeaders.map((item, index) => (
          <div className="flex items-center">
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
            <div className="form-item-wrapper">
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

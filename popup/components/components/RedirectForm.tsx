import { Copy, DeleteOne } from "@icon-park/react"
import { Checkbox, Input } from "antd"
import { produce } from "immer"
import React from "react"

import { FORM_ITEM_ICON_PROPS } from "~config"

import { renderFormHeader, type FormComponentProps } from "../config"

export const RedirectForm = ({ config, onChange, add }: FormComponentProps) => {
  const onHeaderSelectChange = (checked: boolean) => {
    onChange(
      produce(config, (draft) => {
        draft.redirects = draft.redirects.map((item) => ({
          ...item,
          active: checked
        }))
      })
    )
  }

  if (!config?.redirects?.length) {
    return null
  }

  return (
    <div className="form-container">
      {renderFormHeader(
        "Redirect",
        config.redirects,
        add,
        onHeaderSelectChange
      )}
      <div className="form-sub-container">
        {config.redirects.map((item, index) => (
          <div className="flex items-center">
            <Checkbox
              checked={item.active}
              onChange={(e) =>
                onChange(
                  produce(config, (draft) => {
                    draft.redirects[index].active = e.target.checked
                  })
                )
              }
            />
            <div className="form-item-wrapper">
              <Input
                size="small"
                placeholder="from"
                value={item.from}
                onChange={(e) =>
                  onChange(
                    produce(config, (draft) => {
                      draft.redirects[index].from = e.target.value
                    })
                  )
                }
              />
              <Input
                placeholder="to"
                size="small"
                value={item.to}
                onChange={(e) =>
                  onChange(
                    produce(config, (draft) => {
                      draft.redirects[index].to = e.target.value
                    })
                  )
                }
              />
              <DeleteOne
                {...FORM_ITEM_ICON_PROPS}
                onClick={() =>
                  onChange(
                    produce(config, (draft) => {
                      draft.redirects.splice(index, 1)
                    })
                  )
                }
              />
              <Copy
                {...FORM_ITEM_ICON_PROPS}
                onClick={() =>
                  onChange(
                    produce(config, (draft) => {
                      draft.redirects.push(item)
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

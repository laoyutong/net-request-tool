import { Copy, DeleteOne } from "@icon-park/react"
import { Checkbox, Input, Select } from "antd"
import { produce } from "immer"
import React from "react"

import { FORM_ITEM_ICON_PROPS, REQUEST_METHOD_LIST } from "~config"

import { FormComponentProps, renderFormHeader } from "../config"

export const RequestUrlFiltersForm = ({
  config,
  onChange,
  add
}: FormComponentProps) => {
  const onHeaderSelectChange = (checked: boolean) => {
    onChange(
      produce(config, (draft) => {
        draft.requestUrlFilters = draft.requestUrlFilters.map((item) => ({
          ...item,
          active: checked
        }))
      })
    )
  }

  if (!config?.requestUrlFilters?.length) {
    return null
  }

  return (
    <div className="form-container">
      {renderFormHeader(
        "Request URL filters",
        config.requestUrlFilters,
        add,
        onHeaderSelectChange
      )}
      <div className="form-sub-container">
        {config.requestUrlFilters.map((item, index) => (
          <div className="flex items-center">
            <Checkbox
              checked={item.active}
              onChange={(e) =>
                onChange(
                  produce(config, (draft) => {
                    draft.requestUrlFilters[index].active = e.target.checked
                  })
                )
              }
            />
            <div className="form-item-wrapper">
              <Input
                size="small"
                placeholder=".*://.*.google.com/.*"
                value={item.urlFilter}
                onChange={(e) =>
                  onChange(
                    produce(config, (draft) => {
                      draft.requestUrlFilters[index].urlFilter = e.target.value
                    })
                  )
                }
              />
              <Select
                style={{ minWidth: "50%" }}
                size="small"
                mode="multiple"
                allowClear
                maxTagCount="responsive"
                placeholder="All methods"
                options={REQUEST_METHOD_LIST.map((item) => ({
                  label: item,
                  value: item
                }))}
                value={item.methods}
                onChange={(v) =>
                  onChange(
                    produce(config, (draft) => {
                      draft.requestUrlFilters[index].methods = v?.length
                        ? v
                        : undefined
                    })
                  )
                }
              />
              <DeleteOne
                {...FORM_ITEM_ICON_PROPS}
                onClick={() =>
                  onChange(
                    produce(config, (draft) => {
                      draft.requestUrlFilters.splice(index, 1)
                    })
                  )
                }
              />
              <Copy
                {...FORM_ITEM_ICON_PROPS}
                onClick={() =>
                  onChange(
                    produce(config, (draft) => {
                      draft.requestUrlFilters.push(item)
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

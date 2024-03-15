import { Edit, More, Plus } from "@icon-park/react"
import { Input, Popover } from "antd"
import { produce } from "immer"
import React, { useState } from "react"

import {
  DEFAULT_REDIRECT,
  DEFAULT_REQUEST_HEADER,
  DEFAULT_URL_FILTER,
  FORM_CONTAINER_ICON_PROPS
} from "~config"
import type { ConfigContent } from "~types"

import { RedirectForm } from "./components/RedirectForm"
import { RequestHeadersForm } from "./components/RequestHeadersForm"
import { RequestUrlFiltersForm } from "./components/RequestUrlFiltersForm"
import { renderOperationContent } from "./config"

interface ConfigFormProps {
  config: ConfigContent
  onChange: (value: ConfigContent) => void
  remove: () => void
}

export const ConfigForm = ({ config, onChange, remove }: ConfigFormProps) => {
  const [isEditingName, setIsEditingName] = useState(false)

  const [editingName, setEditingName] = useState(config.name)

  const updateConfigName = () => {
    if (editingName) {
      onChange({
        ...config,
        name: editingName
      })
    }
    setIsEditingName(false)
  }

  const addRequestHeader = () => {
    onChange(
      produce(config, (draft) => {
        if (!draft.requestHeaders) {
          draft.requestHeaders = []
        }
        draft.requestHeaders.push(DEFAULT_REQUEST_HEADER)
      })
    )
  }

  const addRequestUrlFilter = () => {
    onChange(
      produce(config, (draft) => {
        if (!draft.requestUrlFilters) {
          draft.requestUrlFilters = []
        }
        draft.requestUrlFilters.push(DEFAULT_URL_FILTER)
      })
    )
  }

  const addRedirect = () => {
    onChange(
      produce(config, (draft) => {
        if (!draft.redirects) {
          draft.redirects = []
        }
        draft.redirects.push(DEFAULT_REDIRECT)
      })
    )
  }

  const renderHeader = () => {
    const addOperateContent = renderOperationContent([
      {
        label: "Request header",
        onClick: addRequestHeader
      },
      {
        label: "Request URL filter",
        onClick: addRequestUrlFilter
      },
      {
        label: "Redirect",
        onClick: addRedirect
      }
    ])

    const moreOperateContent = renderOperationContent([
      {
        label: "删除",
        onClick: remove
      }
    ])

    return (
      <div className="flex justify-between items-center">
        <div className="font-semibold text-[14px] flex items-center">
          <div className="mr-[4px]">
            {isEditingName ? (
              <Input
                style={{ width: "100px" }}
                value={editingName}
                size="small"
                onChange={(e) => setEditingName(e.target.value)}
                onPressEnter={() => updateConfigName()}
                onBlur={() => updateConfigName()}
              />
            ) : (
              config.name
            )}
          </div>
          {!isEditingName ? (
            <Edit
              theme="outline"
              size="12"
              fill="#000000"
              onClick={() => setIsEditingName(true)}
            />
          ) : null}
        </div>
        <div className="flex">
          <Popover placement="bottomRight" content={addOperateContent}>
            <Plus {...FORM_CONTAINER_ICON_PROPS} />
          </Popover>
          <Popover
            className="ml-[4px]"
            placement="bottomRight"
            content={moreOperateContent}>
            <More {...FORM_CONTAINER_ICON_PROPS} />
          </Popover>
        </div>
      </div>
    )
  }

  return (
    <div className="p-[12px]">
      {renderHeader()}
      <div className="mt-[12px] flex flex-col gap-[12px] h-[300px] overflow-auto hide-scrollbar">
        <RequestHeadersForm
          add={addRequestHeader}
          config={config}
          onChange={onChange}
        />
        <RedirectForm add={addRedirect} config={config} onChange={onChange} />
        <RequestUrlFiltersForm
          add={addRequestUrlFilter}
          config={config}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

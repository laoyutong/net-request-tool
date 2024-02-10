import { Copy, DeleteOne, Edit, More, Plus } from "@icon-park/react"
import { Button, Checkbox, Input, Popover } from "antd"
import cls from "classnames"
import { produce } from "immer"
import React, { useState } from "react"

import { DEFAULT_REQUEST_HEADERS } from "~config"
import { ConfigContent } from "~types"

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

  const renderOperationContent = (
    config: {
      label: string
      onClick: () => void
    }[]
  ) => (
    <div className="flex flex-col">
      {config.map((item) => (
        <Button type="link" size="small" onClick={item.onClick}>
          {item.label}
        </Button>
      ))}
    </div>
  )

  const addEmptyRequestHeader = () => {
    onChange(
      produce(config, (draft) => {
        if (!draft.requestHeaders) {
          draft.requestHeaders = []
        }
        draft.requestHeaders.push(DEFAULT_REQUEST_HEADERS)
      })
    )
  }

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

  const renderRequestHeadersContent = () => {
    if (!config.requestHeaders?.length) {
      return null
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
          <Plus
            theme="filled"
            size="20"
            fill="#000"
            className="cursor-pointer"
            onClick={() => addEmptyRequestHeader()}
          />
        </div>
        <div className="bg-gray-300 p-[8px]">
          {config.requestHeaders.map((item, index) => (
            <div
              className={cls("flex items-center", index !== 0 && "mt-[4px]")}>
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
                  theme="outline"
                  size="14"
                  fill="#000000"
                  className="cursor-pointer"
                  onClick={() =>
                    onChange(
                      produce(config, (draft) => {
                        draft.requestHeaders.splice(index, 1)
                      })
                    )
                  }
                />
                <Copy
                  theme="outline"
                  size="14"
                  fill="#000000"
                  className="cursor-pointer"
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

  const addOperateContent = renderOperationContent([
    {
      label: "Request header",
      onClick: addEmptyRequestHeader
    }
  ])

  const moreOperateContent = renderOperationContent([
    {
      label: "删除",
      onClick: remove
    }
  ])

  const renderHeader = () => (
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
          <Plus theme="filled" size="24" fill="#9b9b9b" />
        </Popover>
        <Popover
          className="ml-[4px]"
          placement="bottomRight"
          content={moreOperateContent}>
          <More theme="filled" size="24" fill="#9b9b9b" />
        </Popover>
      </div>
    </div>
  )

  return (
    <div className="p-[12px]">
      {renderHeader()}
      <div className="mt-[12px] flex flex-col gap-[12px]">
        {renderRequestHeadersContent()}
      </div>
    </div>
  )
}

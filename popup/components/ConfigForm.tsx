import { Edit, More, Plus } from "@icon-park/react"
import { Button, Input, Popover } from "antd"
import React, { useState } from "react"

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

  return (
    <div className="p-[12px]">
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
          <Plus theme="filled" size="24" fill="#9b9b9b" />
          <Popover
            className="ml-[4px]"
            placement="bottomRight"
            content={
              <>
                <Button type="link" onClick={() => remove()}>
                  删除
                </Button>
              </>
            }>
            <More theme="filled" size="24" fill="#9b9b9b" />
          </Popover>
        </div>
      </div>
    </div>
  )
}

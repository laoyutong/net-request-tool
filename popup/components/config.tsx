import { Plus } from "@icon-park/react"
import { Button, Checkbox } from "antd"
import React from "react"

import { FORM_HEADER_ICON_PROPS } from "~config"
import type { ConfigContent } from "~types"

export interface FormComponentProps {
  config: ConfigContent
  onChange: (value: ConfigContent) => void
  add: () => void
}

export const renderOperationContent = (
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

export const renderFormHeader = (
  title: string,
  list: { active: boolean }[],
  add: () => void,
  onChange: (flag: boolean) => void
) => (
  <div className="p-[8px] flex justify-between items-center">
    <Checkbox
      onChange={(e) => onChange(e.target.checked)}
      checked={list.every((item) => item.active)}
      indeterminate={
        list.some((item) => item.active) && list.some((item) => !item.active)
      }>
      {title}
    </Checkbox>
    <Plus {...FORM_HEADER_ICON_PROPS} onClick={add} />
  </div>
)

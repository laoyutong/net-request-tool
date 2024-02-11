import { Button } from "antd"
import React from "react"

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

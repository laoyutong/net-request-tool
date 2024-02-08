import React from "react"

import { ConfigContent } from "~types"

interface ConfigFormProps {
  config: ConfigContent
  onChange: (value: ConfigContent) => void
}

export const ConfigForm = ({ config }: ConfigFormProps) => {
  return <div className="p-[12px]">{config.name}</div>
}

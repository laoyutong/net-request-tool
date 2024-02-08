import { Configuration } from "~types"

export const STORAGE_KEY = {
  configuration: "configuration"
}

export const getDefaultConfig = (
  index: number
): Configuration["configs"][number] => ({
  name: `${index}-Profile`,
  requestHeaders: [
    {
      key: "",
      value: ""
    }
  ]
})

export const DEFAULT_CONFIGURATION: Configuration = {
  isOpen: true,
  configIdx: 0,
  configs: [getDefaultConfig(1)]
}

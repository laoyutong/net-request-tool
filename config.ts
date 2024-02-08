import { Configuration } from "~types"

export const STORAGE_KEY = {
  configuration: "configuration"
}

export const getDefaultConfig = (
  name: string
): Configuration["configs"][number] => ({
  name,
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
  configs: [getDefaultConfig("1")]
}

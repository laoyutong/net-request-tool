import { Configuration } from "~types"

export const STORAGE_KEY = {
  configuration: "configuration"
}

export const DEFAULT_REQUEST_HEADERS = {
  name: "",
  value: "",
  active: true
}

export const getDefaultConfig = (
  index: number
): Configuration["configs"][number] => ({
  name: `${index}-Profile`,
  requestHeaders: [DEFAULT_REQUEST_HEADERS]
})

export const DEFAULT_CONFIGURATION: Configuration = {
  isOpen: true,
  configIdx: 0,
  configs: [getDefaultConfig(1)]
}

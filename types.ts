export interface RequestHeader {
  name: string
  value: string
  active: boolean
}

export interface RequestUrlFilters {
  urlFilter: string
  methods?: chrome.declarativeNetRequest.RequestMethod[]
  active: boolean
}

export type ConfigContent = {
  name: string
  requestHeaders?: RequestHeader[]
  requestUrlFilters?: RequestUrlFilters[]
}

export interface Configuration {
  configs: ConfigContent[]
  isOpen: boolean
  configIdx: number
}

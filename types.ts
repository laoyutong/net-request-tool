interface BaseConfigItem {
  active: boolean
}

export interface RequestHeader extends BaseConfigItem {
  name: string
  value: string
  active: boolean
}

export interface RequestUrlFilters extends BaseConfigItem {
  urlFilter: string
  methods?: chrome.declarativeNetRequest.RequestMethod[]
}

export interface Redirect extends BaseConfigItem {
  from: string
  to: string
}

export type ConfigContent = {
  name: string
  requestHeaders?: RequestHeader[]
  requestUrlFilters?: RequestUrlFilters[]
  redirects?: Redirect[]
}

export interface Configuration {
  configs: ConfigContent[]
  isOpen: boolean
  configIdx: number
}

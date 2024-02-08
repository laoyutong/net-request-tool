export interface RequestHeader {
  name: string
  value: string
  active: boolean
}

export type ConfigContent = {
  name: string
  requestHeaders?: RequestHeader[]
}

export interface Configuration {
  configs: ConfigContent[]
  isOpen: boolean
  configIdx: number
}

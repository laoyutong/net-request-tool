export type ConfigContent = {
  name: string
  requestHeaders?: {
    key: string
    value: string
  }[]
}

export interface Configuration {
  configs: ConfigContent[]
  isOpen: boolean
  configIdx: number
}

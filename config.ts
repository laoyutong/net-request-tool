import { IIconProps } from "@icon-park/react/lib/runtime"

import { Configuration, RequestUrlFilters } from "~types"

export const STORAGE_KEY = {
  configuration: "configuration"
}

export const DEFAULT_REQUEST_HEADER = {
  name: "",
  value: "",
  active: true
}

export const REQUEST_METHOD_LIST = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "patch",
  "post",
  "put"
]

export const DEFAULT_URL_FILTER: RequestUrlFilters = {
  urlFilter: "",
  active: true
}

export const getDefaultConfig = (
  index: number
): Configuration["configs"][number] => ({
  name: `${index}-Profile`,
  requestHeaders: [DEFAULT_REQUEST_HEADER],
  requestUrlFilters: [DEFAULT_URL_FILTER]
})

export const DEFAULT_CONFIGURATION: Configuration = {
  isOpen: true,
  configIdx: 0,
  configs: [getDefaultConfig(1)]
}

export const FORM_CONTAINER_ICON_PROPS: IIconProps = {
  theme: "filled",
  size: "24",
  fill: "#9b9b9b",
  className: "cursor-pointer"
}

export const FORM_ITEM_ICON_PROPS: IIconProps = {
  theme: "outline",
  size: "14",
  fill: "#000",
  className: "cursor-pointer"
}

export const FORM_HEADER_ICON_PROPS: IIconProps = {
  theme: "filled",
  size: "20",
  fill: "#000",
  className: "cursor-pointer"
}

export const SET_LOADING_STATUS = "SET_LOADING_STATUS"

interface LoadingStatusAction {
  type: typeof SET_LOADING_STATUS,
  loaded: boolean
}

export type LoadingStatusTypes = LoadingStatusAction
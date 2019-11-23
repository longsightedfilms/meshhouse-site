export const SET_ERROR_STATUS = "SET_ERROR_STATUS"

interface ErrorStatusAction {
  type: typeof SET_ERROR_STATUS,
  visible: boolean,
  message: string
}

export type ErrorStatusTypes = ErrorStatusAction
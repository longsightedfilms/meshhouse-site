import { SET_ERROR_STATUS } from './types'

export function setErrorStatusDispatch(visible: boolean, message: string) {
  return function (dispatch: any) {
    dispatch(setErrorStatus(visible, message))
  }
}

export function setErrorStatus(visible: boolean, msg: string) {
  return {
    type: SET_ERROR_STATUS,
    visible: visible,
    message: msg
  }
}
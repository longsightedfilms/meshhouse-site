import { SET_LOADING_STATUS } from './types'

export function setLoadingStatus(status: boolean) {
  return {
    type: SET_LOADING_STATUS,
    loaded: status
  }
}
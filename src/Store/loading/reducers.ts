import { SET_LOADING_STATUS, LoadingStatusTypes } from './types'

const initialState = false

export function loadingReducer(
  state = initialState,
  action: LoadingStatusTypes
): boolean {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return action.loaded
    default:
      return state;
  }
}
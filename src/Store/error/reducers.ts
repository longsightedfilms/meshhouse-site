import { SET_ERROR_STATUS, ErrorStatusTypes } from './types'

type ErrorState = {
  visible: boolean;
  message: string;
}

const initialState: ErrorState = {
  visible: false,
  message: ''
}

export function errorReducer(
  state = initialState,
  action: ErrorStatusTypes
): ErrorState {
  switch (action.type) {
    case SET_ERROR_STATUS:
      return {
        visible: action.visible,
        message: action.message
      }
    default:
      return state;
  }
}
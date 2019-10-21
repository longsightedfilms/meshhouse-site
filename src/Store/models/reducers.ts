import { SET_MODELS_DATA, SET_SINGLE_MODEL, ModelsActionTypes } from './types'

const initialState: any = []

export function modelsReducer(
  state = initialState,
  action: ModelsActionTypes
): any {
  switch (action.type) {
    case SET_MODELS_DATA:
      return action.payload
    case SET_SINGLE_MODEL:
      return { model: action.payload }
    default:
      return state;
  }
}

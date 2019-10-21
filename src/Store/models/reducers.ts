import { SET_MODELS_DATA, ModelsActionTypes } from './types'

const initialState: any = []

export function modelsReducer(
  state = initialState,
  action: ModelsActionTypes
): any {
  switch (action.type) {
    case SET_MODELS_DATA:
      return action.payload
    default:
      return state;
  }
}

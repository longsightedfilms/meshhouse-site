export const SET_MODELS_DATA = "SET_MODELS_DATA"
export const SET_SINGLE_MODEL = "SET_SINGLE_MODEL"
export const GET_MODELS_DATA = "GET_MODELS_DATA"
export const GET_MODELS_SINGLE = "GET_MODELS_SINGLE"

interface FetchModelsAction {
  type: typeof SET_MODELS_DATA
  payload: any
}

interface FetchSingleModelAction {
  type: typeof SET_SINGLE_MODEL
  payload: any
}

export type ModelsActionTypes = FetchModelsAction | FetchSingleModelAction

export const SET_MODELS_DATA = "SET_MODELS_DATA"
export const SET_SINGLE_MODEL = "SET_SINGLE_MODEL"

interface FetchModelsAction {
  type: typeof SET_MODELS_DATA
  payload: any
}

interface FetchSingleModelAction {
  type: typeof SET_SINGLE_MODEL
  payload: any
}

export type ModelsActionTypes = FetchModelsAction | FetchSingleModelAction
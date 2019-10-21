export const SET_MODELS_DATA = "SET_MODELS_DATA"

interface FetchModelsAction {
  type: typeof SET_MODELS_DATA
  payload: any
}

export type ModelsActionTypes = FetchModelsAction
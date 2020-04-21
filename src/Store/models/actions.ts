import { GET_MODELS_DATA, GET_MODELS_SINGLE } from "./types"

export const fetchModels = (payload: any) => ({
  type: GET_MODELS_DATA,
  payload: payload
})

export const fetchSingleModel = (payload: any) => ({
  type: GET_MODELS_SINGLE,
  payload: payload
})

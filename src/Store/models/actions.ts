import { SET_MODELS_DATA, SET_SINGLE_MODEL } from './types'
import { setLoadingStatus } from '../loading/actions'
import { fetchAPI } from '../../Functions/Helpers'

export function fetchModelsFromDB(params: any) {
  return function (dispatch: any) {
    dispatch(setLoadingStatus(false))
    return fetchAPI('models.get', params).then((response) => {
      dispatch(setModelsData(response.data.result))
      dispatch(setLoadingStatus(true))
    })
  }
}

export function fetchSingleModel(slug: string) {
  return function (dispatch: any) {
    dispatch(setLoadingStatus(false))
    return fetchAPI('models.get.single', [slug]).then((response) => {
      dispatch(setModelPageData(response.data.result))
      dispatch(setLoadingStatus(true))
    })
  }
}

export function setModelsData(data: any) {
  return {
    type: SET_MODELS_DATA,
    payload: data
  }
}

export function setModelPageData(data: any) {
  return {
    type: SET_SINGLE_MODEL,
    payload: data
  }
}
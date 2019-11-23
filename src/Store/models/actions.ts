import { SET_MODELS_DATA, SET_SINGLE_MODEL } from './types'
import { setLoadingStatus } from '../loading/actions'
import { setErrorStatus } from '../error/actions'
import { fetchAPI } from '../../Functions/Helpers'
import nprogress from 'nprogress'

function callAPI (dispatch: any, method: string, params: any) {
  dispatch(setLoadingStatus(false))
  dispatch(setErrorStatus(false, ''))

  nprogress.start()

  return fetchAPI(method, params)
  .catch((err) => {
    switch (err.message) {
      case 'Network Error':
        dispatch(setErrorStatus(true, 'errors.types.network'))
        break
      default:
        dispatch(setErrorStatus(true, 'errors.types.unknown'))
        break
    }
  })
  .finally(() => {
    nprogress.done()
  })
}

export function fetchModelsFromDB(params: any) {
  return function (dispatch: any) {
    return callAPI(dispatch, 'models.get', params)
    .then((response) => {
      dispatch(setModelsData(response.data.result))
      dispatch(setLoadingStatus(true))
    })
  }
}

export function fetchSingleModel(slug: string) {
  return function (dispatch: any) {
    return callAPI(dispatch, 'models.get.single', [slug])
    .then((response) => {
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
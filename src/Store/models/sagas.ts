import { SET_MODELS_DATA, SET_SINGLE_MODEL } from './types'
import { SET_ERROR_STATUS } from '../error/types'
import { fetchAPI } from 'Functions/Helpers'
import { call, put, takeEvery } from 'redux-saga/effects'
import { AxiosError } from 'axios'

function* handleErrors (error: AxiosError) {
  switch (error.message) {
    case 'Network Error':
      yield put({ type: SET_ERROR_STATUS, payload: { visible: true, message: 'errors.types.network' } })
      break
    default:
      yield put({ type: SET_ERROR_STATUS, payload: { visible: true, message: 'errors.types.unknown' } })
      break
  }
}

function getModelsFromDB (action: any) {
  return fetchAPI('models.get', action.payload)
}

function getSingleModelFromDB (action: any) {
  return fetchAPI('models.get.single', [action.payload])
}

function* fetchModels (params: any) {
  try {
    const response = yield call(getModelsFromDB, params)
    response.data.result.totalPages = Math.ceil(response.data.result.modelsLength / 50)
    yield put({ type: SET_MODELS_DATA, payload: response.data.result })
  } catch (error) {
    yield handleErrors(error)
  }
}

function* fetchSingleModel (params: any) {
  try {
    const response = yield call(getSingleModelFromDB, params)
    yield put({ type: SET_SINGLE_MODEL, payload: response.data.result })
  } catch (error) {
    yield handleErrors(error)
  }
}

export function* modelsWatcher() {
  yield takeEvery('GET_MODELS_DATA', fetchModels)
  yield takeEvery('GET_MODELS_SINGLE', fetchSingleModel)
}

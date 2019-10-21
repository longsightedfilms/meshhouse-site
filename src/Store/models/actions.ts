import { SET_MODELS_DATA, SET_SINGLE_MODEL } from './types'
import axios from 'axios'

export function fetchModelsFromDB(params: any) {
  return function (dispatch: any) {
    return axios({
      method: "POST",
      url: "http://172.16.1.45/backend/api/v1",
      data: {
        "jsonrpc": "2.0",
        "method": "models.get",
        "params": params,
        "id": 1
      },
      responseType: "json",
    }).then((response) => {
      dispatch(setModelsData(response.data.result))
    })
  }
}

export function fetchSingleModel(slug: string) {
  return function (dispatch: any) {
    return axios({
      method: "POST",
      url: "http://172.16.1.45/backend/api/v1",
      data: {
        "jsonrpc": "2.0",
        "method": "models.get.single",
        "params": [slug],
        "id": 1
      },
      responseType: "json",
    }).then((response) => {
      dispatch(setModelPageData(response.data.result))
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
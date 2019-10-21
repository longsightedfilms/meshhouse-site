import { SET_MODELS_DATA } from './types'
import axios from 'axios'

export function fetchModelsFromDB() {
  return function (dispatch: any) {
    return axios({
      method: "POST",
      url: "http://172.16.1.45/backend/api/v1",
      data: {
        "jsonrpc": "2.0",
        "method": "models.get",
        "params": [],
        "id": 1
      },
      responseType: "json",
    }).then((response) => {
      dispatch(setModelsData(response.data.result))
    })
  }
}

export function setModelsData(data: any) {
  return {
    type: SET_MODELS_DATA,
    payload: data
  }
}
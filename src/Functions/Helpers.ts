import axios from 'axios'
import uniqid from 'uniqid'

import max from '../Assets/icons/max.svg'
import maya from '../Assets/icons/maya.svg'
import modo from '../Assets/icons/modo.svg'
import blender from '../Assets/icons/blender.svg'
import c4d from '../Assets/icons/cinema4d.svg'
import houdini from '../Assets/icons/houdini.svg'

export const categories: any = {
  electronics: "Electronics"
}
export const SITE_URL = 'http://172.16.1.45/'

export function getImageLink(url: string) {
  return `${SITE_URL}upload/thumbnails/${url}`
}

export function getDccIcon(item: any) {
  let dcc = item.dcc
  let icons: any = {
    "3dsmax": max,
    "maya": maya,
    "blender": blender,
    "cinema4d": c4d,
    "houdini": houdini,
    "modo": modo,
  }
  let names: any = {
    "3dsmax": "3ds Max",
    "maya": "Maya",
    "blender": "Blender",
    "cinema4d": "Cinema 4D",
    "houdini": "Houdini",
    "modo": "Modo",
  }
  return { name: names[dcc], icon: icons[dcc] }
}

export function stringCapitalize(string: string) {
  return string.substr(0, 1).toUpperCase() + string.substr(1)
}

export function getStringedArray(array: string[]) {
  let string = ''
  array.forEach((item, index) => {
    string += stringCapitalize(item)
    if (index < (array.length - 1)) {
      string += ', '
    }
  })
  return string
}

export function fetchAPI(method: string, params: any) {
  return axios({
    method: "POST",
    url: `${SITE_URL}backend/api/v1`,
    data: {
      "jsonrpc": "2.0",
      "method": method,
      "params": params,
      "id": uniqid()
    },
    responseType: "json"
  })
}
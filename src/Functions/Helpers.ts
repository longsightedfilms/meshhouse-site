import axios from 'axios'
import uniqid from 'uniqid'

export function getImageLink(url: string): string {
  return `/backend/upload/thumbnails/${url}`
}

export function getPreviewLink(url: string): string {
  return `/backend/upload/interactive/${url}`
}

export function getDccName(item: any) {
  let names: any = {
    "3dsmax": "3ds Max",
    "maya": "Maya",
    "blender": "Blender",
    "cinema4d": "Cinema 4D",
    "houdini": "Houdini",
    "modo": "Modo",
  }
  return names[item.dcc]
}

export function stringCapitalize(string: string): string  {
  return string.substr(0, 1).toUpperCase() + string.substr(1)
}

export function getStringedArray(array: string[]): string  {
  let string = ''
  array.forEach((item, index) => {
    string += stringCapitalize(item)
    if (index < (array.length - 1)) {
      string += ', '
    }
  })
  return string
}

export function fetchAPI(method: string, params: any): Promise<any> {
  return axios({
    method: "POST",
    url: `/backend/api/v1`,
    data: {
      "jsonrpc": "2.0",
      "method": method,
      "params": params,
      "id": uniqid()
    },
    responseType: "json"
  })
}

export function getNestedCategories(links: any[]): any {
  if (links === undefined) {
    return []
  } else {
    const categories: any[] = []
    const nestedLinks = links.filter((link: any) => link.parentId !== null)
    links.forEach((link: any) => {
      if(link.parentId === null) {
        const newLink = {...link, subcategories: []}
        nestedLinks.forEach((nestedLink: any) => {
          if (nestedLink.parentId === link.id) {
            newLink.subcategories.push(nestedLink)
          }
        })
        categories.push(newLink)
      }
    })
    return categories
  }
}

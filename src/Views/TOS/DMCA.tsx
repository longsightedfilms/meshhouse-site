import React from 'react'
import { renderToStaticMarkup } from "react-dom/server"
import { Translate } from "react-localize-redux"

const DMCA = () => {
  return (
    <React.Fragment>
      <h2><Translate id="pages.tos.dmcaTitle" /></h2>
      <hr className="mb-2" />
      <p><Translate id="pages.tos.dmcaText" options={{ renderToStaticMarkup, renderInnerHtml: true }} /></p>
    </React.Fragment>
  )
}

export default DMCA
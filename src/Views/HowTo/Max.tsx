import React from 'react'
import { Alert } from 'reactstrap'
import { renderToStaticMarkup } from "react-dom/server"
import { Translate } from "react-localize-redux"

import max_xref from '../../Assets/images/howto/max_xref.png'

const Max = () => {
  return (
    <React.Fragment>
      <Alert color="info">
        <Translate id="pages.howto.tabs.max.alert" />
      </Alert>
      <h2><Translate id="pages.howto.tabs.max.titleMerge" /></h2>
      <ul className="list-unstyled lead">
        <Translate id="pages.howto.tabs.max.mergeList" options={{ renderToStaticMarkup, renderInnerHtml: true }} />
      </ul>
      <p><Translate id="pages.howto.tabs.max.mergeText" /></p>
      <h2><Translate id="pages.howto.tabs.max.titleXref" /></h2>
      <ul className="list-unstyled lead">
        <Translate id="pages.howto.tabs.max.xrefList" options={{ renderToStaticMarkup, renderInnerHtml: true }} />
      </ul>
      <p><Translate id="pages.howto.tabs.max.xrefText1" /></p>
      <img src={max_xref} alt="3ds max xRef" className="d-block img-fluid mx-auto my-4" />
      <p><Translate id="pages.howto.tabs.max.xrefText2" /></p>
    </React.Fragment>
  )
}

export default Max
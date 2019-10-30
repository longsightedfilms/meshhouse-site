import React, { useEffect } from 'react'
import { renderToStaticMarkup } from "react-dom/server"
import { Translate, withLocalize } from "react-localize-redux"
import { Jumbotron } from 'reactstrap'

const Home = (props: any) => {
  useEffect(() => {
    document.title = 'Meshhouse - ' + props.translate('pages.home.title')
  })
  
  return (
    <div>
      <Jumbotron className="jumbotron-home" fluid>
        <h1 className="text-center"><Translate id="pages.home.title" /></h1>
        <p className="lead text-uppercase text-center"><Translate id="pages.home.description" /></p>
        <p className="jumbotron-courtesy"><Translate id="pages.home.link" options={{ renderToStaticMarkup, renderInnerHtml: true }} /></p>
      </Jumbotron>
    </div>
  )
}

export default withLocalize(Home)
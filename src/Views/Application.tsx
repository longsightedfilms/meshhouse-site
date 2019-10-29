import React, { useEffect } from 'react'
import { renderToStaticMarkup } from "react-dom/server"
import { Jumbotron, Container, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Translate, withLocalize } from "react-localize-redux"
import img_1 from '../Assets/images/meshhouse_1.png'

const Application = (props: any) => {
  useEffect(() => {
    document.title = props.translate('pages.application.title') + ' - Meshhouse' 
  })

  return (
    <React.Fragment>
      <Jumbotron className="text-center" fluid>
        <h1><Translate id="pages.application.title" /></h1>
      </Jumbotron>
      <Container>
        <Row>
          <Col>
            <p className="lead"><Translate id="pages.application.lead" options={{ renderToStaticMarkup, renderInnerHtml: true }} /></p>
            <img src={img_1} alt="Meshhouse application" className="img-fluid my-4" />
            <h3><Translate id="pages.application.featureTitle" /></h3>
            <hr />
            <ul>
              <Translate id="pages.application.featureList" options={{ renderToStaticMarkup, renderInnerHtml: true }} />
            </ul>
            <p><Translate id="pages.application.note" /></p>
            <h3><Translate id="pages.application.platforms" /></h3>
            <hr />
            <ul className="list-unstyled">
              <li className="d-flex align-items-center">
                <FontAwesomeIcon icon={['fab', 'windows']} size="3x" />
                <p className="mb-0 ml-2 h5"><Translate id="pages.application.platformWin" /></p>
              </li>
              <li className="d-flex align-items-center">
                <FontAwesomeIcon icon={['fab', 'apple']} size="3x" />
                <p className="mb-0 ml-2 h5"><Translate id="pages.application.platformMac" /></p>
              </li>
              <li className="d-flex align-items-center">
                <FontAwesomeIcon icon={['fab', 'linux']} size="3x" />
                <p className="mb-0 ml-2 h5"><Translate id="pages.application.platformLinux" /></p>
              </li>
            </ul>
            <hr />
            <h3><Translate id="pages.application.localize" /></h3>
            <hr />
            <p>English, Русский</p>
            <p><Translate id="pages.application.status" /></p>
            <a href="https://github.com/longsightedfilms/meshhouse"><Translate id="pages.application.link" /></a>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default withLocalize(Application)
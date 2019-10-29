import React, { useEffect } from 'react'
import { Jumbotron, Container, Row, Col } from 'reactstrap'
import { Translate, withLocalize } from "react-localize-redux"
import { renderToStaticMarkup } from "react-dom/server"
import UseContent from './TOS/UseContent'
import PrivacyPolicy from './TOS/PrivacyPolicy'
import DMCA from './TOS/DMCA'

const TermsOfUse = (props: any) => {
  useEffect(() => {
    document.title = props.translate('pages.tos.title') + ' - Meshhouse'
  })

  return (
    <div>
      <Jumbotron className="text-center" fluid>
        <h1><Translate id="pages.tos.title" /></h1>
      </Jumbotron>
      <Container>
        <Row>
          <Col>
            <h2><Translate id="pages.tos.summary" /></h2>
            <p><Translate id="pages.tos.note" /></p>
            <dl><Translate id="pages.tos.summaryList" options={{ renderToStaticMarkup, renderInnerHtml: true }} /></dl>
            <hr className="mb-2"/>
            <UseContent />
            <PrivacyPolicy />
            <DMCA />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withLocalize(TermsOfUse)
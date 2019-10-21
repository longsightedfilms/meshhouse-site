import React from 'react'
import { Jumbotron, Container, Row, Col } from 'reactstrap'
import UseContent from './TOS/UseContent'
import PrivacyPolicy from './TOS/PrivacyPolicy'
import DMCA from './TOS/DMCA'

const TermsOfUse = (props: any) => {
  return (
    <div>
      <Jumbotron className="text-center" fluid>
        <h1>Terms of use, privacy policy, DMCA</h1>
      </Jumbotron>
      <Container>
        <Row>
          <Col>
            <h2>Summary</h2>
            <dl>
              <dt>Website</dt>
              <dd>Meshhouse.ml (or any TLD) is a website that offers a library of different sorts of 3D models (the "Content")</dd>
            </dl>
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

export default TermsOfUse
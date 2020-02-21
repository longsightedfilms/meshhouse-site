import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { withRouter } from 'react-router-dom'

const Footer = (props: any) => (
  <React.Fragment>
    {props.location.pathname !== '/' &&
      <Container
        fluid
        className="App__footer bg-dark text-light"
      >
        <Row>
          <Col xs="12">
            <p className="m-0">
              &copy; { new Date().getFullYear() } Long-Sighted Films LLC
            </p>
          </Col>
        </Row>
      </Container>
    }
  </React.Fragment>
)

export default withRouter(Footer)
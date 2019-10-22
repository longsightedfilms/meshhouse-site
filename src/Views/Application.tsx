import React from 'react'
import { Jumbotron, Container, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import img_1 from '../Assets/images/meshhouse_1.png'

const Application = (props: any) => {
  return (
    <React.Fragment>
      <Jumbotron className="text-center" fluid>
        <h1>Meshhouse application</h1>
      </Jumbotron>
      <Container>
        <Row>
          <Col>
            <p className="lead">Meshhouse - open-source 3D catalogizer program, built with Electron.</p>
            <b className="d-block">100% optional</b>
            <img src={img_1} alt="Meshhouse application" className="img-fluid my-4" />
            <h3>Features:</h3>
            <hr />
            <ul>
              <li><p className="mb-0">Meshhouse integration*</p></li>
              <li><p className="mb-0">Adding custom catalogs (grid and table view)</p></li>
              <li><p className="mb-0">Filter through your models collection</p></li>
              <li><p className="mb-0">Localization support</p></li>
            </ul>
            <p>* - currently not implemented.</p>
            <h3>Supported platforms:</h3>
            <hr />
            <ul className="list-unstyled">
              <li className="d-flex align-items-center">
                <FontAwesomeIcon icon={['fab', 'windows']} size="3x" />
                <p className="mb-0 ml-2 h5">Windows 7-10 (x64 only)</p>
              </li>
              <li className="d-flex align-items-center">
                <FontAwesomeIcon icon={['fab', 'apple']} size="3x" />
                <p className="mb-0 ml-2 h5">MacOS 10.10 Yosemite and newer</p>
              </li>
              <li className="d-flex align-items-center">
                <FontAwesomeIcon icon={['fab', 'linux']} size="3x" />
                <p className="mb-0 ml-2 h5">Ubuntu 12.04, Fedora 21, Debian 8 and newer</p>
              </li>
            </ul>
            <hr />
            <h3>Localizations:</h3>
            <hr />
            <p>English, Русский</p>
            <p>Currently in development, but you can build application by own:</p>
            <a href="https://github.com/longsightedfilms/meshhouse">Github repo</a>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Application
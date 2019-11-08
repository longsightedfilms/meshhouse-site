import React, { useEffect, useState } from 'react'
import { Jumbotron, Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { Translate, withLocalize } from "react-localize-redux"
import { getDccIcon } from '../Functions/Helpers'
import classnames from 'classnames'
// Tab contents
import Max from './HowTo/Max'
import Maya from './HowTo/Maya'
import Blender from './HowTo/Blender'
import Cinema4D from './HowTo/Cinema4D'
import Houdini from './HowTo/Houdini'
import Modo from './HowTo/Modo'

const HowToUseModels = (props: any) => {
  const [activeTab, setActiveTab] = useState(0)

  const [navList] = useState([
    { dcc: '3dsmax', view: Max },
    { dcc: 'maya', view: Maya },
    { dcc: 'blender', view: Blender },
    { dcc: 'cinema4d', view: Cinema4D },
    { dcc: 'houdini', view: Houdini },
    { dcc: 'modo', view: Modo },
  ])

  useEffect(() => {
    document.title = props.translate('pages.howto.title') + ' - Meshhouse'
  })

  return (
    <div>
      <Jumbotron className="text-center" fluid>
        <h1><Translate id="pages.howto.title" /></h1>
      </Jumbotron>
      <Container>
        <Nav tabs>
          {navList.map((nav: any, index: number) =>
            <NavItem key={'tab_' + index}>
              <NavLink
                className={classnames({ active: activeTab === index }, "model-view__nav-link")}
                onClick={() => { setActiveTab(index) }}
              >
                <img src={getDccIcon(nav).icon} alt={getDccIcon(nav).name} />
                {getDccIcon(nav).name}
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Container>
      <TabContent activeTab={activeTab}>
        {navList.map((nav: any, index: number) =>
          <TabPane
            key={'tab_content_' + index}
            tabId={index}
          >
            <Container>
              <Row>
                <Col>
                  <nav.view/>
                </Col>
              </Row>
            </Container>
          </TabPane>
        )}
      </TabContent>
    </div>
  )
}

export default withLocalize(HowToUseModels)
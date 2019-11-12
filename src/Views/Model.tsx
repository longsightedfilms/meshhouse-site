import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleModel } from '../Store/models/actions'
import { Jumbotron, Container, Row, Col, Table, TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap'
import { getImageLink, getDccIcon, getStringedArray, stringCapitalize } from '../Functions/Helpers'
import { format } from 'date-fns'
import { Translate } from "react-localize-redux"
import ModelViewer from "../Components/Models/Viewer"
import classnames from 'classnames'

class Model extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      activeTab: 0
    }
  }

  componentDidMount() {
    const slug = this.props.match.params.slug
    this.props.fetchSingleModel(slug).then(() => {
      document.title = `${this.props.pageData[0].name} - Meshhouse`
    })
  }

  handleTabToggle(index: number) {
    this.setState({ activeTab: index })
  }

  render() {
    let model = this.props.pageData !== undefined ? this.props.pageData[0] : {}
    return (
      <React.Fragment>
        {this.props.pageData !== undefined &&
        <div>
          <Jumbotron className="jumbotron-model" fluid>
            <React.Fragment>
              <h1>{model.name}</h1>
              <img className="jumbotron-cover" src={getImageLink(model.variations[0].thumbnail)} alt={model.name} />
              <img className="jumbotron-cover jumbotron-cover_lg" src={getImageLink(model.variations[0].thumbnail)} alt={model.name} />
            </React.Fragment>
          </Jumbotron>
          <Container>
            <Nav tabs>
              {model.variations.map((item: any, index: number) =>
                <NavItem key={index}>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === 0 }, "model-view__nav-link")}
                    onClick={() => { this.handleTabToggle(0) }}
                  >
                    <img src={getDccIcon(item).icon} alt={item.dcc} />
                    {getDccIcon(item).name}
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </Container>
          <TabContent activeTab={this.state.activeTab}>
            {model.variations.map((item: any, index: number) =>
              <TabPane className="model-single" key={index} tabId={index}>
                <Container>
                  <Row>
                    <Col lg={7}>
                      <ModelViewer className="img-thumbnail mb-4 mb-lg-0" />
                    </Col>
                    <Col lg={5}>
                      <Table bordered>
                        <tbody>
                          <tr>
                            <th><Translate id="pages.model.dccVersion" /></th>
                            <td>{item.dccVersion}</td>
                          </tr>
                          <tr>
                            <th><Translate id="pages.model.size" /></th>
                            <td>{item.size}</td>
                          </tr>
                          <tr>
                            <th><Translate id="pages.model.date" /></th>
                            <td>{format(model.date, 'dd.MM.yyyy')}</td>
                          </tr>
                          <tr>
                            <th><Translate id="pages.model.polys" /></th>
                            <td>{item.polys}</td>
                          </tr>
                          <tr>
                            <th><Translate id="pages.model.verts" /></th>
                            <td>{item.verts}</td>
                          </tr>
                          <tr>
                            <th><Translate id="pages.model.hairFur" /></th>
                            <td>{item.hairFur}</td>
                          </tr>
                          <tr>
                            <th><Translate id="pages.model.morpher" /></th>
                            <td>{String(item.morpher)}</td>
                          </tr>
                          <tr>
                            <th><Translate id="pages.model.skinning" /></th>
                            <td>{item.skinning}</td>
                          </tr>
                          <tr>
                            <th><Translate id="pages.model.renderers" /></th>
                            <td>{getStringedArray(item.renderers)}</td>
                          </tr>
                          <tr>
                            <th><Translate id="pages.model.textures" /></th>
                            <td>{stringCapitalize(item.textures)}</td>
                          </tr>
                          <tr>
                            <th colSpan={2} className="text-center bg-secondary text-light"><Translate id="pages.model.links" /></th>
                          </tr>
                          <tr>
                            <th colSpan={2}>
                              {item.links.textures === null &&
                                <Button
                                  color="primary"
                                  block
                                  disabled
                                >
                                  <Translate id="pages.model.linksTexProc" />
                                </Button>
                              }
                              {item.links.textures !== null &&
                                <Button
                                  tag="a"
                                  color="primary"
                                  href={item.links.textures}
                                  block
                                  disabled
                                >
                                  <Translate id="pages.model.linksTex" />
                                </Button>
                              }
                            </th>
                          </tr>
                          <tr>
                            <th colSpan={2}>
                              <Button
                                tag="a"
                                color="primary"
                                href={item.links.model}
                                block
                              >
                                <Translate id="pages.model.linksModel" />
                              </Button>
                            </th>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Container>
              </TabPane>
            )}
          </TabContent>
        </div>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => ({ pageData: state.models.model })

export default connect(
  mapStateToProps,
  { fetchSingleModel }
)(Model)
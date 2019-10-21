import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleModel } from '../Store/models/actions'
import { Jumbotron, Container, Row, Col, Table, TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap'
import { getImageLink, getDccIcon, getStringedArray, stringCapitalize } from '../Functions/Helpers'
import { format } from 'date-fns'
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
    this.props.fetchSingleModel(slug)
  }

  handleTabToggle(index: number) {
    this.setState({ activeTab: index })
  }

  render() {
    let model = this.props.pageData !== undefined ? this.props.pageData[0] : {}
    return (
      <React.Fragment>
        <Jumbotron className="text-center" fluid>
          <React.Fragment>
            <h1>{model.name}</h1>
          </React.Fragment>
        </Jumbotron>
        {this.props.pageData !== undefined &&
        <div>
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
              <TabPane key={index} tabId={index}>
                <Container>
                  <Row>
                    <Col lg={7}>
                      <img src={getImageLink(item.thumbnail)} alt="" />
                    </Col>
                    <Col lg={5}>
                      <Table bordered>
                        <tbody>
                          <tr>
                            <th>Software version:</th>
                            <td>{item.dccVersion}</td>
                          </tr>
                          <tr>
                            <th>Archive size (with model):</th>
                            <td>{item.size}</td>
                          </tr>
                          <tr>
                            <th>Upload date:</th>
                            <td>{format(model.date, 'dd.MM.yyyy')}</td>
                          </tr>
                          <tr>
                            <th>Polys:</th>
                            <td>{item.polys}</td>
                          </tr>
                          <tr>
                            <th>Verts:</th>
                            <td>{item.verts}</td>
                          </tr>
                          <tr>
                            <th>Hair & fur:</th>
                            <td>{item.hairFur}</td>
                          </tr>
                          <tr>
                            <th>Morpher / blendshapes:</th>
                            <td>{String(item.morpher)}</td>
                          </tr>
                          <tr>
                            <th>Skinning:</th>
                            <td>{item.skinning}</td>
                          </tr>
                          <tr>
                            <th>Renderers:</th>
                            <td>{getStringedArray(item.renderers)}</td>
                          </tr>
                          <tr>
                            <th>Textures:</th>
                            <td>{stringCapitalize(item.textures)}</td>
                          </tr>
                          <tr>
                            <th colSpan={2} className="text-center bg-secondary text-light">Download links:</th>
                          </tr>
                          <tr>
                            <th colSpan={2}>
                              {item.links.textures === null &&
                                <Button
                                  color="primary"
                                  block
                                  disabled
                                >
                                  Textures not needed
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
                                  Download textures
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
                                Download model
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
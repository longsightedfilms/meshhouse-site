import React from 'react'
import qs from 'qs'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchModelsFromDB } from '../Store/models/actions'
import { renderToStaticMarkup } from "react-dom/server"
import { withLocalize } from "react-localize-redux"
import { NavLink } from "react-router-dom"
import { Card, CardBody, CardTitle, Jumbotron, FormGroup, Label, Input } from 'reactstrap'
import { Translate } from "react-localize-redux"
import { trackWindowScroll } from 'react-lazy-load-image-component'

import ModelCard from '../Components/Models/Card'

class Models extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props)

    this.handleNameInput = this.handleNameInput.bind(this)
    this.handleDCCChange = this.handleDCCChange.bind(this)
    this.handleKeyEnter = this.handleKeyEnter.bind(this)
  }

  params = {
    category: '',
    page: 0,
    query: {
      dcc: '',
      name: ''
    }
  }

  componentDidMount() {
    let category = this.props.match.params.category
    let page = qs.parse(this.props.location.search.substr(1)).page
    if (page === undefined) {
      page = 0
    }

    this.params.category = category
    this.params.page = page

    this.props.fetchModelsFromDB(this.params).catch(() => {})
    document.title = this.props.translate('pages.models.title') + ` - Meshhouse`
  }

  handleNameInput(event: any) {
    if (event.target.value !== this.params.query.name) {
      this.params.query.name = event.target.value
      this.props.fetchModelsFromDB(this.params).catch(() => {})
    }
  }

  handleDCCChange(event: any) {
    this.params.query.dcc = event.target.value
    this.props.fetchModelsFromDB(this.params).catch(() => { })
  }

  handleKeyEnter(event: any) {
    if (event.key === 'Enter') {
      this.handleNameInput(event)
    }
  }

  render() {
    const isLoaded = this.props.loaded
    const page = this.props.pageData
    const lang = this.props.activeLanguage !== undefined ? this.props.activeLanguage.code : "en"
    const category = isLoaded === true && this.props.match.params.category !== undefined ? page.categories.find((item: any) => {
      return item.categorySlug === this.props.match.params.category
    }).categoryName[lang] : undefined

    return (
      <React.Fragment>
        <Jumbotron className="text-center" fluid>
          {category !== undefined &&
            <React.Fragment>
              <h1><Translate id="pages.models.title" /></h1>
              <p className="lead"><Translate id="pages.models.category" data={{ category: category }} /></p>
            </React.Fragment>
          }
          {category === undefined &&
            <h1><Translate id="pages.models.title" /></h1>
          }
        </Jumbotron>
        <div className="models-container">
          <div className="models-grid">
            {isLoaded && page.models !== undefined && page.models.length > 0 &&
              page.models.map((item: any) =>
                <ModelCard key={item.id} item={item} scrollPosition={this.props.scrollPosition} />
              )}
            {isLoaded && page.models !== undefined && page.models.length === 0 &&
              <Card>
                <CardBody>
                  <CardTitle tag="h1"><Translate id="pages.models.notFound" options={{ renderToStaticMarkup, renderInnerHtml: true }} /></CardTitle>
                </CardBody>
              </Card>
            }
          </div>
          <React.Fragment>
            <Card className="models-categories">
              <CardBody>
                <h3><Translate id="pages.models.filters.title" /></h3>
                <FormGroup>
                  <Label for="filterName"><Translate id="pages.models.filters.name.title" /></Label>
                  <Translate>
                    {({ translate }) => (
                      <Input
                        id="filterName"
                        type="text"
                        name="name"
                        placeholder={(translate("pages.models.filters.name.placeholder") as string)}
                        defaultValue={this.params.query.name}
                        onBlur={this.handleNameInput}
                        onKeyPress={this.handleKeyEnter}
                      />
                    )}
                  </Translate>
                </FormGroup>
                <FormGroup>
                  <Label for="filterDCC"><Translate id="pages.models.filters.dcc.title" /></Label>
                  <Input
                    type="select"
                    name="dcc"
                    id="filterDCC"
                    value={this.params.query.dcc}
                    onChange={this.handleDCCChange}
                  >
                    <Translate>
                      {({ translate }) => (
                        <option value="">{translate("pages.models.filters.dcc.any")}</option>
                    )}
                    </Translate>
                    <option value="3dsmax">3ds Max</option>
                    <option value="maya">Maya</option>
                    <option value="blender">Blender</option>
                    <option value="cinema4d">Cinema 4D</option>
                    <option value="houdini">Houdini</option>
                    <option value="modo">Modo</option>
                  </Input>
                </FormGroup>
                <h3><Translate id="pages.models.categories" /></h3>
                {isLoaded && page.models !== undefined &&
                  <ul className="list-unstyled">
                    {page.categories.map((item: any) =>
                      <li key={item.id}>
                        <NavLink to={`/models/${item.categorySlug}`}>{`${item.categoryName[lang]} [${item.modelsCount}]`}</NavLink>
                      </li>
                    )}
                  </ul>
                }
              </CardBody>
            </Card>
          </React.Fragment>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => ({ loaded: state.loaded, pageData: state.models })

export default compose<any>(
  trackWindowScroll,
  withLocalize,
  connect(mapStateToProps, { fetchModelsFromDB })
)(Models)
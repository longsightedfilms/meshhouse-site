import React from 'react'
import qs from 'qs'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchModelsFromDB } from '../Store/models/actions'
import { renderToStaticMarkup } from "react-dom/server"
import { withLocalize } from "react-localize-redux"
import { Card, CardBody, CardTitle, Input } from 'reactstrap'
import { Translate } from "react-localize-redux"
import { trackWindowScroll } from 'react-lazy-load-image-component'

import ModelCard from '../Components/Models/Card'
import ModelsSidebar from '../Components/Models/Sidebar'

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
    this.handleFetchItems()
  }

  componentDidUpdate() {
    if (this.props.location.state?.categoryId !== this.params.category) {
      this.handleFetchItems()
    }
  }

  handleFetchItems() {
    let category = this.props.location.state?.categoryId
    let page = qs.parse(this.props.location.search.substr(1)).page
    if (page === undefined) {
      page = 0
    }

    this.params.category = category
    this.params.page = page

    this.props.fetchModelsFromDB(this.params).catch(() => { })
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
      <div className='models-view'>
        <ModelsSidebar links={page.categories}/>
        <main className="models-container">
          <div className="models-filter">
            {category !== undefined &&
              <p className='models-filter__title'><Translate id="pages.models.title" /> - {category}</p>
            }
            {category === undefined &&
              <p className='models-filter__title'><Translate id="pages.models.title" /></p>
            }
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
          </div>
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
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({ loaded: state.loaded, pageData: state.models })

export default compose<any>(
  trackWindowScroll,
  withLocalize,
  connect(mapStateToProps, { fetchModelsFromDB })
)(Models)

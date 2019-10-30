import React from 'react'
import qs from 'qs'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchModelsFromDB } from '../Store/models/actions'
import { renderToStaticMarkup } from "react-dom/server"
import { withLocalize } from "react-localize-redux"
import { NavLink } from "react-router-dom"
import { Card, CardBody, CardTitle, Jumbotron } from 'reactstrap'
import { Translate } from "react-localize-redux"
import { trackWindowScroll } from 'react-lazy-load-image-component'

import ModelCard from '../Components/Models/Card'

class Models extends React.PureComponent<any, any> {
  componentDidMount() {
    let category = this.props.match.params.category
    let page = qs.parse(this.props.location.search.substr(1)).page
    if (page === undefined) {
      page = 0
    }
    let params = {
      category: category,
      page: page
    }
    this.props.fetchModelsFromDB(params)
    document.title = this.props.translate('pages.models.title') + ` - Meshhouse`
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
        {isLoaded && page.models !== undefined &&
          <div className="models-container">
            <div className="models-grid">
              {page.models.length > 0 &&
                page.models.map((item: any) =>
                  <ModelCard key={item.id} item={item} scrollPosition={this.props.scrollPosition} />
                )}
              {page.models.length === 0 &&
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
                  <h3><Translate id="pages.models.categories" /></h3>
                  <ul className="list-unstyled">
                    {page.categories.map((item: any) =>
                      <li key={item.id}>
                        <NavLink to={`/models/${item.categorySlug}`}>{`${item.categoryName[lang]} [${item.modelsCount}]`}</NavLink>
                      </li>
                    )}
                  </ul>
                </CardBody>
              </Card>
            </React.Fragment>
          </div>
        }
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
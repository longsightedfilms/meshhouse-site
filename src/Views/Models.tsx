import React from 'react'
import { connect } from 'react-redux'
import { fetchModelsFromDB } from '../Store/models/actions'
import { NavLink } from "react-router-dom"
import { Card, CardBody, CardImg, CardText, CardTitle, Jumbotron } from 'reactstrap'
import { categories, getImageLink, getDccIcon } from '../Functions/Helpers'
import { format } from 'date-fns'
import qs from 'qs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Models extends React.PureComponent<any> {
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
  }

  render() {
    const isLoaded = this.props.loaded
    const category = this.props.match.params.category
    const page = this.props.pageData

    return (
      <React.Fragment>
        <Jumbotron className="text-center" fluid>
          {category !== undefined &&
            <React.Fragment>
              <h1>Models catalog</h1>
              <p className="lead">Category - {categories[category]}</p>
            </React.Fragment>
          }
          {category === undefined &&
            <h1>Models catalog</h1>
          }
        </Jumbotron>
        {isLoaded &&
          <div className="models-container">
            <div className="models-grid">
              {page.models.length > 0 &&
                page.models.map((item: any) =>
                  <Card key={item.index}>
                    <NavLink to={`/models/view/${item.slug}`}>
                      <CardImg top width="100%" src={getImageLink(item.variations[0].thumbnail)} alt={item.name} />
                      <div className="model-dccs">
                        {item.variations.map((variation: any, index: number) =>
                          <img key={index} src={getDccIcon(variation).icon} alt={variation.dcc} />
                        )}
                      </div>
                    </NavLink>
                    <CardBody>
                      <CardTitle tag="h3">{item.name}</CardTitle>
                      <CardText>
                        <small className="text-muted">
                          <FontAwesomeIcon icon="calendar-alt" /> {format(item.date, 'dd.MM.yyyy')}
                        </small>
                      </CardText>
                    </CardBody>
                  </Card>
                )}
              {page.models.length === 0 &&
                <Card>
                  <CardBody>
                    <CardTitle tag="h1">Models not found <span role="img" aria-label="sad face">😞</span></CardTitle>
                  </CardBody>
                </Card>
              }
            </div>
            <React.Fragment>
              <Card>
                <CardBody>
                  <h3>Categories:</h3>
                  <ul className="list-unstyled">
                    {page.categories.map((item: any) =>
                      <li key={item.index}>
                        <NavLink to={`/models/${item.categorySlug}`}>{`${item.categoryName.en} [${item.modelsCount}]`}</NavLink>
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

export default connect(
  mapStateToProps,
  { fetchModelsFromDB }
)(Models)
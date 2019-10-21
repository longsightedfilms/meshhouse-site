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
    console.log(new Date().getTime())
    this.props.fetchModelsFromDB(params).then(() => {
      console.log(this.props)
    })
  }

  render() {
    return (
      <React.Fragment>
        <Jumbotron className="text-center" fluid>
          {this.props.match.params.category !== undefined &&
            <React.Fragment>
              <h1>Models catalog</h1>
              <p className="lead">Category - {categories[this.props.match.params.category]}</p>
            </React.Fragment>
          }
          {this.props.match.params.category === undefined &&
            <h1>Models catalog</h1>
          }
        </Jumbotron>
        {this.props.pageData.length !== 0 &&
          <div className="models-container">
            <div className="models-grid">
              {this.props.pageData.models !== undefined &&
                this.props.pageData.models.map((item: any) =>
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
            </div>
            <React.Fragment>
              <Card>
                <CardBody>
                  <h3>Categories:</h3>
                  <ul className="list-unstyled">
                    {this.props.pageData.categories !== undefined &&
                      this.props.pageData.categories.map((item: any) =>
                        <li key={item.index}>
                          <NavLink to={`/models/${item.categorySlug}`}>{`${item.categoryName.en} [${item.modelsCount}]`}</NavLink>
                        </li>
                      )
                    }
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

const mapStateToProps = (state: any) => ({ pageData: state.models })

export default connect(
  mapStateToProps,
  { fetchModelsFromDB }
)(Models)
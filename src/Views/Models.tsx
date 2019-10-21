import React from 'react'
import { connect } from 'react-redux'
import { fetchModelsFromDB } from '../Store/models/actions'
import { NavLink } from "react-router-dom"
import { Card, CardBody, CardTitle, Jumbotron } from 'reactstrap'
import { categories } from '../Functions/Helpers'

class Models extends React.PureComponent<any> {
  componentDidMount() {
    this.props.fetchModelsFromDB()
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
        <div className="models-container">
          <React.Fragment>
            <Card>
              <CardBody>
                <CardTitle>Test model</CardTitle>
              </CardBody>
            </Card>
          </React.Fragment>
          <React.Fragment>
            <Card>
              <CardBody>
                <h3>Categories:</h3>
                <ul className="list-unstyled">
                  {this.props.pageData.length !== 0 &&
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
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => ({ pageData: state.models })

export default connect(
  mapStateToProps,
  { fetchModelsFromDB }
)(Models)
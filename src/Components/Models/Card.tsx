import React from 'react'
import { format } from 'date-fns'
import { Card, CardBody, CardText, CardTitle } from 'reactstrap'
import { NavLink } from "react-router-dom"
import { getImageLink, getDccIcon } from '../../Functions/Helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LazyLoadImage } from 'react-lazy-load-image-component'


const ModelCard = (props: any) => (
  <React.Fragment>
    <Card>
      <NavLink to={`/models/view/${props.item.slug}`}>
        <LazyLoadImage
          className="card-img-top"
          alt={props.item.name}
          src={getImageLink(props.item.variations[0].thumbnail)}
          scrollPosition={props.scrollPosition}
          effect='opacity'
        />
        <div className="model-dccs">
          {props.item.variations.map((variation: any, index: number) =>
            <img key={index} src={getDccIcon(variation).icon} alt={variation.dcc} />
          )}
        </div>
      </NavLink>
      <CardBody>
        <CardTitle tag="h3">{props.item.name}</CardTitle>
        <CardText>
          <small className="text-muted">
            <FontAwesomeIcon icon="calendar-alt" /> {format(props.item.date, 'dd.MM.yyyy')}
          </small>
        </CardText>
      </CardBody>
    </Card>
  </React.Fragment>
)

export default ModelCard
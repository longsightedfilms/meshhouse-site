import React from 'react'
import { format } from 'date-fns'
import { UncontrolledTooltip } from 'reactstrap'
import { NavLink } from "react-router-dom"
import { getImageLink, getDccName } from 'Functions/Helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Icon from 'Components/UI/Icon'


const ModelCard = (props: any) => (
  <div className="models-card">
    <div className="models-card__inner">
      <NavLink to={`/models/view/${props.item.slug}`}>
        <LazyLoadImage
          className="models-card__image"
          alt={props.item.name}
          src={getImageLink(props.item.variations[0].thumbnail)}
          scrollPosition={props.scrollPosition}
          effect='opacity'
        />
        <div className="models-card__info">
          <p className='models-card__info-title'>
            {props.item.name}
          </p>
          <p className="models-card__info-time">
            <FontAwesomeIcon icon="calendar-alt" /> {format(props.item.date, 'dd.MM.yyyy')}
          </p>
          <div className="models-card__info-dccs">
            {props.item.variations.map((variation: any, index: number) =>
              <div key={index}>
                <Icon
                  icon={`programs/${variation.dcc}`}
                  id={`Tooltip${variation.dcc}`}
                />
                <UncontrolledTooltip placement="left" target={`Tooltip${variation.dcc}`}>
                  {`${getDccName(variation)} ${variation.dccVersion}`}
                </UncontrolledTooltip>
              </div>
            )}
          </div>
        </div>
      </NavLink>
    </div>
  </div>
)

export default ModelCard

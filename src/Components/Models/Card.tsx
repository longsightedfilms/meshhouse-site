import React from 'react'
import { format } from 'date-fns'
import { UncontrolledTooltip } from 'reactstrap'
import { NavLink } from "react-router-dom"
import { getImageLink, getDccName } from 'Functions/Helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LazyLoad from 'react-lazyload'
import Icon from 'Components/UI/Icon'


const ModelCard = (props: any) => (
  <div className="models-card">
    <div className="models-card__inner">
      <NavLink to={`/models/view/${props.item.slug}`}>
        <LazyLoad>
          <img
            className="models-card__image"
            src={getImageLink(props.item.thumbnail)}
            alt={props.item.name}
          />
        </LazyLoad>
        <div className="models-card__info">
          <p className='models-card__info-title'>
            {props.item.name}
          </p>
          <p className="models-card__info-time">
            <FontAwesomeIcon icon="calendar-alt" /> {format(props.item.date, 'dd.MM.yyyy')}
          </p>
          <div className="models-card__info-dccs">
            {props.item.links !== undefined && props.item.links.model.map((item: any, index: number) =>
              <div key={index}>
                <Icon
                  icon={`programs/${item.dcc}`}
                  id={`Tooltip${item.dcc}`}
                />
                <UncontrolledTooltip placement="left" target={`Tooltip${item.dcc}`}>
                  {`${getDccName(item)} ${item.dccVersion}`}
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

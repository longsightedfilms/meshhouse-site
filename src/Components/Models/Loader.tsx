import React from 'react'
import logo from '../../Assets/logo_icon.svg'
import { Spinner } from 'reactstrap'
import classnames from 'classnames'

const Loader = (props: any) => (
  <div className={classnames("meshhouse-loader", props.className)}>
    <div className="spinner">
      <img src={logo} alt="Meshhouse"/>
      <Spinner color="success" />
    </div>
  </div>
)

export default Loader
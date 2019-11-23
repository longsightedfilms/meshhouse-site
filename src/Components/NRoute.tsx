import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { setErrorStatusDispatch } from '../Store/error/actions'
import nprogress from 'nprogress'

class NRoute extends React.Component<any, any> {
  UNSAFE_componentWillMount() {
    nprogress.start()
  }

  componentDidMount() {
    nprogress.done()
    this.props.setErrorStatusDispatch(false, '')
  }

  render() {
    return (
      <Route {...this.props} />
    )
  }
}
const mapStateToProps = (state: any) => ({ error: state.error })

export default connect(mapStateToProps, { setErrorStatusDispatch })(NRoute)
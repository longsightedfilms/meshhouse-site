import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

class CustomScrollbar extends React.Component<any,any> {
  render() {
    return (
      <Scrollbars
        autoHide autoHeight autoHeightMax={'100vh'}
        renderTrackHorizontal={props => <div {...props} className="track-horizontal" />}
        renderTrackVertical={props => <div {...props} className="track-vertical" />}
        renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" />}
        renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
        renderView={props => <div {...props} className="view" />}>
        {this.props.children}
      </Scrollbars>
    );
  }
}

export default CustomScrollbar
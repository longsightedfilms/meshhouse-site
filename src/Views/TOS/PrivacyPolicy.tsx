import React from 'react'
import { Translate } from "react-localize-redux"

const PrivacyPolicy = () => {
  return (
    <React.Fragment>
      <h2><Translate id="pages.tos.privacyTitle" /></h2>
      <hr className="mb-2" />
      <p><Translate id="pages.tos.privacyText" /></p>
    </React.Fragment>
  )
}

export default PrivacyPolicy
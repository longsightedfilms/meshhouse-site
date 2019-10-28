import React from 'react'
import { Translate, withLocalize } from "react-localize-redux"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LanguageToggle = ({ languages, activeLanguage, setActiveLanguage} : { languages:any, activeLanguage:any, setActiveLanguage:any }) => (
  <UncontrolledDropdown>
    <DropdownToggle tag="a" className="nav-link" caret>
      <FontAwesomeIcon icon="language" />
      </DropdownToggle>
    <DropdownMenu>
      <DropdownItem header><Translate id="language" /></DropdownItem>
      {languages.map((lang: any) => (
        <DropdownItem 
          key={lang.code}
          onClick={() => setActiveLanguage(lang.code)}
        >
          {lang.name}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </UncontrolledDropdown>
)

export default withLocalize(LanguageToggle)
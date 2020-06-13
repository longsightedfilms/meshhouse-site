import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { CustomInput } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ThemeSelector (props: any) {
  const [darkThemeSelected, setThemeState] = useState(localStorage.getItem('theme') === 'dark')

  function handleSwitcher(event: any): void {
    setThemeState(!darkThemeSelected)
    localStorage.setItem('theme', !darkThemeSelected === true ? 'dark' : 'light')
  }

  useEffect(() => {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', 'light')
    }
  })

  return (
    <>
      <Helmet>
        <body className={darkThemeSelected ? 'theme-dark' : 'theme-light'} />
      </Helmet>
      <div className='theme-selector'>
        <FontAwesomeIcon icon='sun' />
        <CustomInput
          id='theme-selector'
          type='switch'
          onChange={handleSwitcher}
          checked={darkThemeSelected}
        />
        <FontAwesomeIcon icon='moon' />
      </div>
    </>
  )
}

export default ThemeSelector

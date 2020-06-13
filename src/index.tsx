import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faImages } from '@fortawesome/free-regular-svg-icons'
import { faCalendarAlt, faLanguage, faExpand, faRedo, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { faApple, faLinux, faWindows } from '@fortawesome/free-brands-svg-icons'
import App from './App'
import { Provider } from 'react-redux'
import { LocalizeProvider } from "react-localize-redux"
import configureStore from './Store/'
import * as serviceWorker from './serviceWorker'

const store = configureStore()

library.add(faCalendarAlt, faLanguage, faApple, faLinux, faWindows, faExpand, faRedo, faImages, faSun, faMoon)

ReactDOM.render(
  <Provider store={store}>
    <LocalizeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocalizeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

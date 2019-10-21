import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCodeBranch, faGenderless, faVenus, faMars, faTransgender, faBirthdayCake } from '@fortawesome/free-solid-svg-icons'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from './Store/'
import * as serviceWorker from './serviceWorker'

const store = configureStore()

library.add(faCodeBranch, faGenderless, faMars, faVenus, faTransgender, faBirthdayCake)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import { Switch } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'nprogress/nprogress.css'
import './Styles/App.css'

import Header from './Components/Header'
// Views
import routes from './Routes'
import NRoute from './Components/NRoute'

function App () {
  return (
    <div className="App">
      <Header />
      <div className="view-margin">
        <Switch>
          {routes.map((route, i) =>
            <NRoute key={i} {...route} />
          )}
        </Switch>
      </div>
    </div>
  )
}

export default App;

import React, { Suspense } from 'react'
import { Switch } from "react-router-dom"
import { renderToStaticMarkup } from "react-dom/server"
import { withLocalize } from "react-localize-redux"
import globalTranslations from "./Intl/"
import Header from './Components/Header'
import Footer from './Components/Footer'
import routes from './Routes'
import NRoute from './Components/NRoute'
import CustomScrollbar from './Components/CustomScrollbar'
import './Styles/App.sass'

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    const languages = [
      { name: "English", code: "en" },
      { name: "Русский", code: "ru" }
    ]
    
    const defaultLanguage =
      localStorage.getItem("languageCode") || languages[0].code

    this.props.initialize({
      languages,
      translation: globalTranslations,
      options: {
        defaultLanguage,
        renderToStaticMarkup
      }
    })
  }

  componentDidUpdate(prevProps: any) {
    const prevLangCode = prevProps.activeLanguage && prevProps.activeLanguage.code
    const curLangCode = this.props.activeLanguage && this.props.activeLanguage.code

    const hasLanguageChanged = prevLangCode !== curLangCode;

    if (hasLanguageChanged) {
      document.documentElement.lang = curLangCode
      localStorage.setItem("languageCode", curLangCode);
    }
  }

  render() {
    return (
      <CustomScrollbar>
        <div className="App">
          <Header />
          <div className="view-margin">
            <Suspense fallback={null}>
              <Switch>
                {routes.map((route, i) =>
                  <NRoute key={i} {...route} />
                )}
              </Switch>
            </Suspense>
          </div>
          <Footer />
        </div>
      </CustomScrollbar>
    )
  }
}

export default withLocalize(App)

import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { modelsReducer as models } from './models/reducers'
import { errorReducer as error } from './error/reducers'

import { modelsWatcher } from './models/sagas'

const rootReducer = combineReducers({
  models,
  error
})

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  )

  sagaMiddleware.run(modelsWatcher)
  return store
}

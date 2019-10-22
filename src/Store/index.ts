import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from "redux-thunk"
import { modelsReducer as models } from './models/reducers'
import { loadingReducer as loaded } from './loading/reducers'

const rootReducer = combineReducers({
  models,
  loaded
})

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    middleWareEnhancer
  )

  return store
}
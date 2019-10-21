import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from "redux-thunk"
import { modelsReducer as models } from './models/reducers'

const rootReducer = combineReducers({
  models
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
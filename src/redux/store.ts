import runnerReducer, { runnerActions } from './runner-reducer';
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk, { ThunkAction } from "redux-thunk";

const reducers = combineReducers({
  runner: runnerReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export type AppStateType = ReturnType<typeof reducers>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>
export type ActionsTypes = InferActionsTypes<typeof runnerActions>

export type ThunkType = ThunkAction<void, AppStateType, any, ActionsTypes> 
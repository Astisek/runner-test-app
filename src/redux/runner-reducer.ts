import { walkingAPI } from './../api/walking-api';
import { RunnerItemType } from './../api/api';
import { ActionsTypes, ThunkType } from "./store";

const SET_SESSIONS = "RUNNER/SET_SESSIONS"
const SET_ERROR = "RUNNER/SET_ERROR"
const SET_LOADING = "RUNNER/SET_LOADING"
const CLEAR_ERROR = "RUNNER/CLEAR_ERROR"

const initialState = {
  sessions: [] as RunnerItemType[],
  error: null as null | string,
  isLoading: false
};

const runnerReducer = (state = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case SET_SESSIONS: 
      return {
        ...state,
        sessions: [...action.payload.reverse()]
      }
    case SET_ERROR: 
      return {
        ...state,
        error: action.text
      }
    case SET_LOADING: 
      return {
        ...state,
        isLoading: action.bool
      }
    case CLEAR_ERROR: 
      return {
        ...state,
        errors: null
      }

    default:
      return state;
  }
};

export const runnerActions = {
  setSessions: (payload: RunnerItemType[]) => ({type: SET_SESSIONS, payload} as const),
  setError: (text: string) => ({type: SET_ERROR, text} as const),
  setLoading: (bool: boolean) => ({type: SET_LOADING, bool} as const),
  clearError: () => ({type: CLEAR_ERROR} as const)
};

export const runnerThunks = {
  getAll: (): ThunkType => 
    async (dispatch) => {
      dispatch(runnerActions.clearError())
      dispatch(runnerActions.setLoading(true))
      try {
        const res = await walkingAPI.getAll()

        dispatch(runnerActions.setSessions(res.data))
      } catch (e) {
        dispatch(runnerActions.setError("Ошибка сервера"))
      }
      dispatch(runnerActions.setLoading(false))
    },

  create: (date: Date, distance: number): ThunkType => 
    async (dispatch) => {
      dispatch(runnerActions.setLoading(true))
      try {
        await walkingAPI.add(date, distance)

        dispatch(runnerThunks.getAll())
      } catch (e) {
        dispatch(runnerActions.setError("Ошибка сервера"))
        dispatch(runnerActions.setLoading(false))
      }
    },

  edit: (id: number, date: Date, distance: number): ThunkType => 
    async (dispatch) => {
      dispatch(runnerActions.setLoading(true))
      try {
        await walkingAPI.update(id, date, distance)

        dispatch(runnerThunks.getAll())
      } catch (e) {
        dispatch(runnerActions.setError("Ошибка сервера"))
        dispatch(runnerActions.setLoading(false))
      }
    },
    
  delete: (id: number): ThunkType => 
    async (dispatch) => {
      dispatch(runnerActions.setLoading(true))
      try {
        await walkingAPI.delete(id)

        dispatch(runnerThunks.getAll())
      } catch (e) {
        dispatch(runnerActions.setError("Ошибка сервера"))
        dispatch(runnerActions.setLoading(false))
      }
    },
};

export default runnerReducer;

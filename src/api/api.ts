import axios from "axios"

export const DOMEN = "http://localhost:3000"

export const instance = axios.create({
  baseURL: DOMEN
})

export type RunnerItemType = {
  id: number
  date: string,
  distance: number
}
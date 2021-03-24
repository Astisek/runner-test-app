import { instance, RunnerItemType } from './api'

export const walkingAPI = {
  getAll: () => instance.get<RunnerItemType[]>('/walking'),
  getOne: (id: number) => instance.get<RunnerItemType>(`/walking/${id}`),
  add: (date: Date, distance: number) => instance.post<RunnerItemType>(`/walking`, {date, distance}),
  update: (id: number, date: Date, distance: number) => instance.put<RunnerItemType>(`/walking/${id}`, {date, distance}),
  delete: (id: number) => instance.delete<RunnerItemType>(`/walking/${id}`),
} 
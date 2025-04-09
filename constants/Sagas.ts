import { DispatchType } from "@/constants/DispatchType";

export const Sagas = {
  setAcceptedNotification: (data: boolean) => ({
    type: DispatchType.setAcceptedNotification, payload: { data }
  }),
  getFavorites: () => ({ type: DispatchType.getFavorites }),
  addFavorites: (data: string) => ({ type: DispatchType.addFavorites, payload: { value: data, data } }),
  deleteFavorites: (data: string) => ({ type: DispatchType.delFavorites, payload: { value: data, data } }),
  getWeek: () => ({ type: DispatchType.getWeek }),
  requestWeek: () => ({ type: DispatchType.requestWeek }),
  setDay: (data: number) => ({ type: DispatchType.setDay, payload: { value: data, data } }),
  getWarnings: () => ({ type: DispatchType.getWarnings }),
  setThereIsWarning: (data: boolean) => ({ type: DispatchType.setThereIsWarning, payload: { value: data, thereIsWarn: data } }),
  updateConfigurations: (data: object) => ({ type: DispatchType.updateConfigurations, payload: { value: data, data } }),
  getConfigurations: () => ({ type: DispatchType.getConfigurations })
};

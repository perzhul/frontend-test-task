import { createEffect } from "effector";
import { api } from "./axios";
import { APIResponse, User } from "./types";
import { AxiosResponse } from "axios";

export const DEFAULT_USERS_COUNT = import.meta.env.VITE_RESULTS_COUNT || 500;

export const getUsersFx = createEffect<number, User[]>(async (count) => {
  const res = (await api.get("/", {
    params: { results: count },
  })) as AxiosResponse<APIResponse>;
  return res.data.results;
});

import { createEffect } from "effector";
import { api } from "./axios";
import { APIResponse, User } from "./types";
import { AxiosResponse } from "axios";

export const getUsersFx = createEffect<number, User[]>(async (count) => {
  const res = (await api.get("/", {
    params: { results: count },
  })) as AxiosResponse<APIResponse>;
  return res.data.results;
});

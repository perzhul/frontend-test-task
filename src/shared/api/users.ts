import { createEffect } from "effector";
import { api } from "./axios";
import { APIResponse } from "./types";

export const getUsersFx = createEffect<number, APIResponse>(async (count) => {
  const res = await api.get("/", { params: { results: count } });
  return res.data;
});

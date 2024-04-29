import { createEffect } from "effector";
import { api } from "./axios";
import { APIResponse } from "./types";

export const getUserEffect = createEffect<string, APIResponse>(
  async (params) => {
    const res = await api.get("/", { params });
    return res.data;
  },
);

export const getUsersEffect = createEffect<number, APIResponse>(
  async (count) => {
    const res = await api.get("/", { params: { results: count } });
    return res.data;
  },
);

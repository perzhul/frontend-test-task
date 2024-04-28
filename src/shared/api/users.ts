import { api } from "./axios";
import { APIResponse } from "./types";

export const getUser = async (params: string) => {
  return await api.get<APIResponse>("/", {
    params,
  });
};

export const getUsers = async (count: number) => {
  return await api.get<APIResponse>("/", { params: { results: count } });
};

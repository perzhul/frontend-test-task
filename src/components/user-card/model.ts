import { User } from "@/shared";
import { createEvent, createStore } from "effector";

export const userSelected = createEvent<User | null>();
export const userDisselected = createEvent<User>();

export const $selectedUser = createStore<User | null>(null)
  .on(userSelected, (_, user) => user)
  .on(userDisselected, () => null);

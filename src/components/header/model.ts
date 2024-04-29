import { createEvent, createStore } from "effector";

export const searchValueChanged = createEvent<string>();
export const $searchValue = createStore<string>("").on(
  searchValueChanged,
  (_, value) => value,
);

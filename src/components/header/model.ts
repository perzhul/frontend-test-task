import { createEvent, createStore } from "effector";
import { reset } from "patronum";

export const searchValueChanged = createEvent<string>();

export const $searchValue = createStore<string>("").on(
  searchValueChanged,
  (_, value) => value,
);

export const resetSearchValue = reset({ target: [$searchValue] });

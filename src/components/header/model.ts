import { createEvent, restore } from "effector";

export const searchValueChanged = createEvent<string>();

export const $searchValue = restore(searchValueChanged, "");

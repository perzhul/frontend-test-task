import {
  filterUsers,
  getAgeGroups,
  getGenderGroups,
  removeUser,
} from "@/lib/utils";
import {
  DEFAULT_USERS_COUNT,
  Group,
  User,
  appStarted,
  getUsersFx,
} from "@/shared";
import { createEvent, createStore, sample } from "effector";
import { searchValueChanged } from "./components/header/model";
import { debounce } from "patronum";

const DEBOUNCE_TIMEOUT_IN_MS = 200;

export const usersRefreshed = createEvent<number>();

debounce({
  source: usersRefreshed,
  timeout: DEBOUNCE_TIMEOUT_IN_MS,
  target: getUsersFx,
});

export const userRemoved = createEvent<User>();

export const $users = createStore<User[]>([]);
export const $filteredUsers = createStore<User[]>([]);

export const $usersCount = createStore(DEFAULT_USERS_COUNT);
export const $filteredUsersCount = $filteredUsers.map((users) => users.length);

export const $ageGroups = createStore<Group[]>([]);
export const $genderGroups = createStore<Group[]>([]);

export const $loading = getUsersFx.pending;
export const $error = getUsersFx.failData;

sample({
  clock: getUsersFx.doneData,
  fn: () => "",
  target: searchValueChanged,
});

sample({
  clock: userRemoved,
  source: $users,
  fn: removeUser,
  target: $users,
});

sample({
  clock: userRemoved,
  source: $filteredUsers,
  fn: removeUser,
  target: $filteredUsers,
});

sample({
  clock: userRemoved,
  source: $users,
  fn: (users) => users.length,
  target: $usersCount,
});

sample({
  clock: searchValueChanged,
  source: $users,
  fn: filterUsers,
  target: $filteredUsers,
});

sample({
  clock: appStarted,
  source: $usersCount,
  target: getUsersFx,
});

sample({
  clock: getUsersFx.doneData,
  target: [$users, $filteredUsers],
});

sample({
  source: $filteredUsers,
  fn: getAgeGroups,
  target: $ageGroups,
});

sample({
  source: $filteredUsers,
  fn: getGenderGroups,
  target: $genderGroups,
});

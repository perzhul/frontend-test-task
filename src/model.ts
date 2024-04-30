import {
  filterUsers,
  getAgeGroups,
  getGenderGroups,
  removeUser,
} from "@/lib/utils";
import { Group, User, appStarted, getUsersFx } from "@/shared";
import { createEvent, createStore, sample } from "effector";
import { searchValueChanged } from "./components/header/model";

export const usersRefreshed = createEvent<void>();
export const userRemoved = createEvent<User>();

export const $users = createStore<User[]>([]);
export const $filteredUsers = createStore<User[]>([]);

const DEFAULT_USERS_COUNT = import.meta.env.VITE_RESULTS_COUNT || 500;

export const $usersCount = createStore(DEFAULT_USERS_COUNT);
export const $filteredUsersCount = $filteredUsers.map((users) => users.length);

export const $ageGroups = createStore<Group[]>([]);
export const $genderGroups = createStore<Group[]>([]);

export const $loading = getUsersFx.pending;
export const $error = getUsersFx.failData;

sample({
  clock: usersRefreshed,
  fn: () => DEFAULT_USERS_COUNT,
  target: getUsersFx,
});

sample({
  clock: getUsersFx.doneData,
  fn: () => "",
  target: searchValueChanged,
});

sample({
  clock: usersRefreshed,
  fn: () => DEFAULT_USERS_COUNT,
  target: $usersCount,
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
  fn: (users) => users.results,
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

import { getAgeGroups, getGenderGroups } from "@/lib/utils";
import { Group, User, appStarted, getUsersEffect } from "@/shared";
import { createEvent, createStore, sample } from "effector";

export const refetchUsersEvent = createEvent<void>();

export const $users = createStore<User[]>([]);
export const $usersCount = createStore(20);

export const $loading = getUsersEffect.pending;
export const $error = getUsersEffect.failData;

export const $ageGroups = createStore<Group[]>([]);
export const $genderGroups = createStore<Group[]>([]);

sample({
  clock: appStarted,
  source: $usersCount,
  target: getUsersEffect,
});

sample({
  clock: getUsersEffect.doneData,
  fn: (users) => users.results,
  target: $users,
});

sample({
  source: $users,
  fn: getAgeGroups,
  target: $ageGroups,
});

sample({
  source: $users,
  fn: getGenderGroups,
  target: $genderGroups,
});

sample({
  clock: refetchUsersEvent,
  source: $usersCount,
  target: getUsersEffect,
});

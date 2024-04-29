import { Group, User } from "@/shared";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { groupBy } from "lodash";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGenderGroups = (users: User[]): Group[] => {
  const groups = groupBy(users, (user) => user.gender);
  return Object.keys(groups).map((key) => ({
    category: key,
    count: groups[key].length,
  }));
};

export const getAgeGroups = (users: User[]): Group[] => {
  const ageRanges = [11, 21, 31, 41, 51];

  const groupByAge = (users: User[], ageRanges: number[]) => {
    const labels = ageRanges
      .filter((range) => range > ageRanges[0])
      .map((range) => {
        const lower = range - 10;
        const upper = range - 1;
        return `${lower}-${upper}`;
      });

    const groups = groupBy(users, (user) => {
      const age = user.dob.age;
      const range = ageRanges.find((range) => age < range - 1);
      return range
        ? `${range - 10}-${range - 1}`
        : `${ageRanges[ageRanges.length - 1]}+`;
    });

    labels.forEach((label) => {
      if (!groups[label]) {
        // @ts-ignore
        groups[label] = 0;
      }
    });
    return groups;
  };

  const ageGroups = groupByAge(users, ageRanges);

  return Object.keys(ageGroups)
    .map((key) => ({
      category: key,
      count: ageGroups[key].length || 0,
    }))
    .sort((a, b) => {
      const aRange = a.category.split("-").map((n) => parseInt(n, 10));
      const bRange = b.category.split("-").map((n) => parseInt(n, 10));
      return aRange[0] - bRange[0];
    });
};

export const removeUser = (users: User[], userToRemove: User): User[] => {
  return users.filter((user) => user.login.uuid !== userToRemove.login.uuid);
};

const normalizeString = (input: string): string => {
  return input.toLowerCase().trim();
};

const userToString = (user: User): string => {
  const { name, email, phone, cell, dob, location } = user;
  const userInfo = `${name.first} ${name.last} ${email} ${phone} ${cell} ${dob.age} ${location.city} ${location.country}`;
  return normalizeString(userInfo);
};

export const filterUsers = (users: User[], searchString: string): User[] => {
  const searchNormalized = normalizeString(searchString);
  return users.filter((user) => userToString(user).includes(searchNormalized));
};

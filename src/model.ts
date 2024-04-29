import { Group, User } from "@/shared";
import { groupBy } from "lodash";

export const getGenderGroups = (users: User[]): Group[] => {
  const groups = groupBy(users, (user) => user.gender);
  return Object.keys(groups).map((key) => ({
    category: key,
    count: groups[key].length,
  }));
};

export const getAgeGroups = (
  users: User[],
  ageRanges: number[] = [11, 21, 31, 41, 51],
): Group[] => {
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

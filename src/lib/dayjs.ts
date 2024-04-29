import dayjs from "dayjs";

export const parseDate = (date: string) => {
  return dayjs(date).format("DD MMMM YYYY");
};

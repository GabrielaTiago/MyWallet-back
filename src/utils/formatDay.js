import dayjs from "dayjs";

export default function formatDay() {
  return dayjs().format("DD-MM");
}

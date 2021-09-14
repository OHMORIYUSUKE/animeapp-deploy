export const whenData = [];
const day = new Date();
const nowYear = day.getFullYear();
const startYear = 2013;
const coolArray = ["冬", "春", "夏", "秋"];
for (let i = startYear; i <= nowYear; i++) {
  for (let j = 0; j < 4; j++) {
    whenData.push({ index: j + 1, year: i, cool: coolArray[j] });
  }
}
export const nowYearAndCool = nowYear + "/1";

const monthsRu = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysNotLeap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const getDate = (date: Date) => {
  return date.getDate();
};

export const getMonth = (date: Date) => {
  return date.getMonth();
};

export const getStringMonth = (num: number) => {
  return {
    month: months[num],
    monthRu: monthsRu[num],
  };
};

export const getYear = (date: Date) => {
  return date.getFullYear();
};

export const getDay = (date: Date) => {
  return date.getDay();
};

export const calendar = (date: Date) => {
  let result = [];
  let dayCounter = 1;
  let dayAfter = 1;
  let id = 0;

  const firstDay = getDay(
    new Date(`${months[getMonth(date)]} 1,${getYear(date)}`)
  );
  const currentMonth = getMonth(date);
  const currentYear = getYear(date);
  const currentDay = getDate(date);
  const currentDaysLeapOrNot = currentYear % 4 == 0 ? daysLeap : daysNotLeap;

  for (let i = 0; i < 35; i++) {
    if (i < firstDay) {
      result.push({
        id: id,
        classname: "inactive",
        dayOfWeek: getDay(
          new Date(
            `${months[currentMonth - 1]} ${
              currentYear % 4 == 0
                ? daysLeap[currentMonth - 1] - (firstDay - i - 1)
                : daysNotLeap[currentMonth - 1] - (firstDay - i - 1)
            }, ${currentYear}`
          )
        ),
        day:
          currentYear % 4 == 0
            ? currentMonth - 1 == -1
              ? daysLeap[0] - (firstDay - i - 1)
              : daysLeap[currentMonth - 1] - (firstDay - i - 1)
            : currentMonth - 1 == -1
            ? daysNotLeap[0] - (firstDay - i - 1)
            : daysNotLeap[currentMonth - 1] - (firstDay - i - 1),
      });
    } else {
      if (dayCounter > currentDaysLeapOrNot[currentMonth]) {
        result.push({
          id: id,
          classname: "inactive",
          dayOfWeek: getDay(
            new Date(`${months[currentMonth + 1]} ${dayAfter}, ${currentYear}`)
          ),
          day: dayAfter,
        });
        dayAfter++;
        id++;
        continue;
      }
      if (
        i == currentDay &&
        currentMonth == new Date().getMonth() &&
        currentYear == new Date().getFullYear()
      ) {
        result.push({
          id: id,
          classname: "active",
          dayOfWeek: getDay(
            new Date(`${months[currentMonth]} ${dayCounter}, ${currentYear}`)
          ),
          day: currentDay,
        });
      } else {
        result.push({
          id: id,
          classname: "",
          dayOfWeek: getDay(
            new Date(`${months[currentMonth]} ${dayCounter}, ${currentYear}`)
          ),
          day: dayCounter,
        });
      }

      dayCounter++;
    }
    id++;
  }

  return result;
};

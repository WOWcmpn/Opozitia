export function formatDate(dateString: string) {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  // console.log(1, dateString);
  const [day, month, year] = dateString.split('.');
  // console.log(2, day, month, year);

  // console.log(3, `${day} ${months[parseInt(month) - 1]} ${year}`);
  return `${day} ${months[parseInt(month) - 1]} ${year}`;
}

export function formatDate123(date: Date) {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  console.log(1, date);
  // const [day, month, year] = dateString.split('.');
  console.log(2, day, month, year);

  console.log(3, `${day} ${months[month]} ${year}`);
  return `${day} ${months[month]} ${year}`;
}

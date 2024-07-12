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
  console.log(1, dateString);
  const [day, month, year] = dateString.split('.');
  console.log(2, day, month, year);

  console.log(3, `${day} ${months[parseInt(month) - 1]} ${year}`);
  return `${day} ${months[parseInt(month) - 1]} ${year}`;
}

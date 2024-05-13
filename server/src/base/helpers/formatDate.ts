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
  const [day, month, year] = dateString.split('.');

  return `${day} ${months[parseInt(month) - 1]} ${year}`;
}

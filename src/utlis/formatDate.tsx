export const formatDate = (dateString: string) => {
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date: Date = new Date(dateString);
  const day: number = date.getDate();
  const monthIndex: number = date.getMonth();
  const year: number = date.getFullYear();

  const month: string = months[monthIndex];

  return `${day} ${month} ${year}`;
};

export function convertToDubaiTime(utcDateTime) {
  let date = new Date(utcDateTime);

  date.setHours(date.getUTCHours() + 4);

  let hours = date.getHours().toString().padStart(2, '0');
  const hour = hours >= 12 ? hours % 12 : hours;
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hour}:${minutes} ${amOrPm}`;
}

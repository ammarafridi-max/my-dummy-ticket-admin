export function convertToDubaiDate(utcDateTime, format = 'short') {
  let date = new Date(utcDateTime);

  let dubaiDate = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Dubai' })
  );

  let day = dubaiDate.getDate();
  let monthShort = dubaiDate.toLocaleString('en-US', { month: 'short' });
  let monthLong = dubaiDate.toLocaleString('en-US', { month: 'long' });
  let year = dubaiDate.getFullYear();

  return format === 'long'
    ? `${day} ${monthLong}, ${year}`
    : `${day} ${monthShort}`;
}

export function formatMongoDBDate(mongoDate) {
  const utcDate = new Date(mongoDate);

  const uaeTimeOffset = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
  const uaeDate = new Date(utcDate.getTime() + uaeTimeOffset);

  const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
  const optionsDate = { day: "numeric", month: "long", year: "numeric" };

  const formattedTime = uaeDate.toLocaleTimeString("en-US", optionsTime);
  const formattedDate = uaeDate.toLocaleDateString("en-US", optionsDate);

  return `${formattedTime} (${formattedDate})`;
}

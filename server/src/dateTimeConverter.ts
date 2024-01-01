export default function DateTimeConverter(item: { created_at: any }) {
  const splitted = String(item.created_at).split(" ");
  const weekDay = splitted[0];
  const month = splitted[1];
  const date = splitted[2];
  const year = splitted[3];

  let hour = Number(splitted[4].slice(0, 2));
  let abbreviation = "AM";
  const minute = splitted[4].slice(3, 5);

  if (hour >= 13) {
    hour -= 12;
    abbreviation = "PM";
  } else if (hour === 0) {
    hour = 12;
  } else if (hour === 12) {
    abbreviation = "PM";
  }

  return {
    ...item,
    date_format: `[${hour}:${minute} ${abbreviation}] ${month} ${date}, ${year} (${weekDay})`,
  };
}

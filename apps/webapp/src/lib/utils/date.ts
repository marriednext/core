export function formatDate(date: string) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate.format(new Date(date));
}


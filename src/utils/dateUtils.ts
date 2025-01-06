import { Journal } from "../vite-env";

export const groupEntriesByDate = (entries: Journal[]) => {
  return entries.reduce((groups: { [key: string]: Journal[] }, entry) => {
    const date = new Date(entry.timestamp);
    const dateStr = date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!groups[dateStr]) {
      groups[dateStr] = [];
    }
    groups[dateStr].push(entry);
    return groups;
  }, {});
};

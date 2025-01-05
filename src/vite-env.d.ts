/// <reference types="vite/client" />
type Journal = {
  id: number;
  text: string;
  timestamp: string;
  time: string;
};

type GroupedEntries = {
  [dateStr: string]: Journal[]; // Keys are date strings, and values are arrays of entries
};

/// <reference types="vite/client" />
export interface Project {
  id: number;
  name: string;
}

export interface Journal {
  id: number;
  text: string;
  timestamp: string;
  time: string;
}

export interface ProjectEntries {
  [projectId: number]: Journal[];
}

export interface GroupedEntries {
  [date: string]: Journal[];
}

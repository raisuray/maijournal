import { useState } from "react";
import { Journal, ProjectEntries } from "../vite-env";

export const useJournalEntries = (
  projectEntries: ProjectEntries,
  setProjectEntries: (entries: ProjectEntries) => void,
  selectedProjectId: number | null,
) => {
  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  const addEntry = (text: string) => {
    if (text.trim() && selectedProjectId) {
      const now = new Date();
      const newEntry: Journal = {
        id: Date.now(),
        text: text.trim(),
        timestamp: now.toISOString(),
        time: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setProjectEntries({
        ...projectEntries,
        [selectedProjectId]: [
          newEntry,
          ...(projectEntries[selectedProjectId] || []),
        ],
      });
      return newEntry;
    }
  };

  const updateEntry = (entryId: number, text: string) => {
    if (text.trim() && selectedProjectId) {
      setProjectEntries({
        ...projectEntries,
        [selectedProjectId]: projectEntries[selectedProjectId].map((entry) =>
          entry.id === entryId ? { ...entry, text } : entry,
        ),
      });
    }
  };

  const deleteEntry = (entryId: number) => {
    if (selectedProjectId) {
      setProjectEntries({
        ...projectEntries,
        [selectedProjectId]: projectEntries[selectedProjectId].filter(
          (entry) => entry.id !== entryId,
        ),
      });
    }
  };

  return {
    currentEntry,
    setCurrentEntry,
    editingId,
    setEditingId,
    editContent,
    setEditContent,
    addEntry,
    updateEntry,
    deleteEntry,
  };
};

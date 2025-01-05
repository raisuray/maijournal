import React, { useState } from "react";
import { Trash2, Edit2, Check, X } from "lucide-react";

const TaskJournal = () => {
  const [entries, setEntries] = useState<Journal[]>([]);
  const [currentEntry, setCurrentEntry] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (currentEntry.trim()) {
        const now = new Date();
        const newEntry: Journal = {
          id: Date.now(),
          text: currentEntry,
          timestamp: now.toISOString(),
          time: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setEntries([newEntry, ...entries]);
        setCurrentEntry("");
      }
    }
  };

  const startEditing = (entry: Journal) => {
    setEditingId(entry.id);
    setEditContent(entry.text);
  };

  const saveEdit = () => {
    if (editContent.trim()) {
      setEntries(
        entries.map((entry) =>
          entry.id === editingId ? { ...entry, text: editContent } : entry,
        ),
      );
    }
    setEditingId(null);
    setEditContent("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  // Group entries by date
  const groupedEntries = entries.reduce((groups: GroupedEntries, entry) => {
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

  return (
    <div className="w-full p-4">
      <h1 className="my-3 text-xl font-bold	">マイ ジャーナル</h1>

      <div className="bg-[#fffdf8] min-h-screen p-6 shadow-inner">
        <textarea
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What did you work on? Press Enter to save..."
          className="w-full min-h-[100px] p-3 bg-transparent border-b border-gray-200 focus:outline-none resize-none mb-8 text-gray-800"
          style={{ fontSize: "16px" }}
        />

        <div className="space-y-8">
          {Object.entries(groupedEntries).map(([date, dateEntries]) => (
            <div key={date} className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-600 border-b border-gray-200 pb-2 text-left">
                {date}
              </h2>
              <div className="space-y-4">
                {dateEntries.map((entry: Journal) => (
                  <div key={entry.id} className="group">
                    {editingId === entry.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full p-2 bg-white border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          rows={3}
                        />
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={saveEdit}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start w-full">
                        <div className="text-gray-400 mr-3 flex-shrink-0">
                          •
                        </div>
                        <div className="min-w-0 flex-1 flex">
                          <p className="text-gray-800 break-all pr-4">
                            {entry.text}
                          </p>
                          <div className="flex-shrink-0 flex items-start gap-4 pl-4 ml-auto">
                            <span className="text-sm text-gray-400 whitespace-nowrap">
                              {entry.time}
                            </span>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                              <button
                                onClick={() => startEditing(entry)}
                                className="text-gray-400 hover:text-blue-500"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteEntry(entry.id)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {entries.length === 0 && (
            <p className="text-center text-gray-400 italic mt-8">
              Your journal is empty. Start writing...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskJournal;

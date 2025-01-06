import React from "react";
import { Edit2, Trash2, Check, X } from "lucide-react";
import { Journal } from "../vite-env";

interface JournalEntryProps {
  entry: Journal;
  isEditing: boolean;
  editContent: string;
  onEditStart: () => void;
  onEditChange: (content: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onDelete: () => void;
}

export const JournalEntry: React.FC<JournalEntryProps> = ({
  entry,
  isEditing,
  editContent,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onDelete,
}) => {
  if (isEditing) {
    return (
      <div className="space-y-2">
        <textarea
          value={editContent}
          onChange={(e) => onEditChange(e.target.value)}
          className="w-full p-2 bg-white border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={3}
        />
        <div className="flex justify-center gap-2">
          <button
            onClick={onEditSave}
            className="text-green-600 hover:text-green-700"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={onEditCancel}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start w-full">
      <div className="text-gray-400 mr-3 flex-shrink-0">•</div>
      <div className="min-w-0 flex-1 flex">
        <p className="text-gray-800 break-all pr-4">{entry.text}</p>
        <div className="flex-shrink-0 flex items-start gap-4 pl-4 ml-auto">
          <span className="text-sm text-gray-400 whitespace-nowrap">
            {entry.time}
          </span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button
              onClick={onEditStart}
              className="text-gray-400 hover:text-blue-500"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

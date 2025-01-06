import React from "react";
import { ChevronLeft } from "lucide-react";
import { ProjectSelector } from "./components/ProjectSelector";
import { JournalEntry } from "./components/JournalEntry";
import { useProjects } from "./hooks/useProjects";
import { useJournalEntries } from "./hooks/useJournalEntries";
import { groupEntriesByDate } from "./utils/dateUtils";

const ProjectJournal = () => {
  const {
    projects,
    projectEntries,
    selectedProject,
    editingProjectId,
    setSelectedProject,
    setProjectEntries,
    setEditingProjectId,
    addProject,
    deleteProject,
    renameProject,
  } = useProjects();

  const {
    currentEntry,
    setCurrentEntry,
    editingId,
    setEditingId,
    editContent,
    setEditContent,
    addEntry,
    updateEntry,
    deleteEntry,
  } = useJournalEntries(
    projectEntries,
    setProjectEntries,
    selectedProject?.id ?? null,
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (currentEntry.trim()) {
        addEntry(currentEntry);
        setCurrentEntry("");
      }
    }
  };

  if (!selectedProject) {
    return (
      <ProjectSelector
        projects={projects}
        editingProjectId={editingProjectId}
        onSelectProject={setSelectedProject}
        onDeleteProject={deleteProject}
        onAddProject={addProject}
        onRenameProject={renameProject}
        setEditingProjectId={setEditingProjectId}
      />
    );
  }

  const groupedEntries = groupEntriesByDate(
    projectEntries[selectedProject.id] || [],
  );

  return (
    <div className="w-full p-4">
      <div className="flex items-center gap-4 my-3">
        <button
          onClick={() => setSelectedProject(null)}
          className="text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">{selectedProject.name}</h1>
      </div>

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
                {dateEntries.map((entry) => (
                  <div key={entry.id} className="group">
                    <JournalEntry
                      entry={entry}
                      isEditing={editingId === entry.id}
                      editContent={editContent}
                      onEditStart={() => {
                        setEditingId(entry.id);
                        setEditContent(entry.text);
                      }}
                      onEditChange={setEditContent}
                      onEditSave={() => {
                        updateEntry(entry.id, editContent);
                        setEditingId(null);
                        setEditContent("");
                      }}
                      onEditCancel={() => {
                        setEditingId(null);
                        setEditContent("");
                      }}
                      onDelete={() => deleteEntry(entry.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {(!projectEntries[selectedProject.id] ||
            projectEntries[selectedProject.id].length === 0) && (
            <p className="text-center text-gray-400 italic mt-8">
              Your journal is empty. Start writing...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectJournal;

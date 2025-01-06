import React, { useState, useRef, useEffect } from "react";
import { Trash2, Plus, Edit2, Check, X } from "lucide-react";
import { Project } from "../vite-env";
interface ProjectSelectorProps {
  projects: Project[];
  editingProjectId: number | null;
  onSelectProject: (project: Project) => void;
  onDeleteProject: (id: number) => void;
  onAddProject: (name: string) => void;
  onRenameProject: (id: number, newName: string) => void;
  setEditingProjectId: (id: number | null) => void;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  projects,
  editingProjectId,
  onSelectProject,
  onDeleteProject,
  onAddProject,
  onRenameProject,
  setEditingProjectId,
}) => {
  const [newProjectName, setNewProjectName] = useState("");
  const [showNewProject, setShowNewProject] = useState(false);
  const [editName, setEditName] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingProjectId && editInputRef.current) {
      const project = projects.find((p) => p.id === editingProjectId);
      if (project) {
        setEditName(project.name);
        editInputRef.current.focus();
      }
    }
  }, [editingProjectId, projects]);

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      onAddProject(newProjectName);
      setNewProjectName("");
      setShowNewProject(false);
    }
  };

  const handleRename = (projectId: number) => {
    if (editName.trim()) {
      onRenameProject(projectId, editName);
      setEditName("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, projectId: number) => {
    if (e.key === "Enter") {
      handleRename(projectId);
    } else if (e.key === "Escape") {
      setEditingProjectId(null);
      setEditName("");
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="my-3 text-xl font-bold">プロジェクト選択</h1>
      <div className="bg-[#fffdf8] min-h-screen p-6 shadow-inner">
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm group hover:shadow-md transition-shadow"
            >
              {editingProjectId === project.id ? (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    ref={editInputRef}
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, project.id)}
                    className="flex-1 p-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleRename(project.id)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingProjectId(null);
                      setEditName("");
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex-1 text-left font-medium text-gray-700 hover:text-gray-900"
                  >
                    {project.name}
                  </button>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button
                      onClick={() => setEditingProjectId(project.id)}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProject(project.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {showNewProject ? (
          <div className="mt-4 space-y-2">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name..."
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && handleAddProject()}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewProject(false)}
                className="px-3 py-1 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Project
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowNewProject(true)}
            className="mt-4 flex items-center gap-2 text-blue-500 hover:text-blue-600"
          >
            <Plus className="w-4 h-4" /> New Project
          </button>
        )}
      </div>
    </div>
  );
};

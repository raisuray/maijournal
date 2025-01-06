import { useState } from "react";
import { Project, ProjectEntries } from "../vite-env";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectEntries, setProjectEntries] = useState<ProjectEntries>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);

  const addProject = (name: string) => {
    if (name.trim()) {
      const newProject = {
        id: Date.now(),
        name: name.trim(),
      };
      setProjects([...projects, newProject]);
      setProjectEntries({
        ...projectEntries,
        [newProject.id]: [],
      });
      return newProject;
    }
  };

  const deleteProject = (projectId: number) => {
    setProjects(projects.filter((p) => p.id !== projectId));
    const remainingEntries = { ...projectEntries };
    delete remainingEntries[projectId];
    setProjectEntries(remainingEntries);
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
  };

  const renameProject = (projectId: number, newName: string) => {
    if (newName.trim()) {
      setProjects(
        projects.map((p) =>
          p.id === projectId ? { ...p, name: newName.trim() } : p,
        ),
      );
      if (selectedProject?.id === projectId) {
        setSelectedProject({ ...selectedProject, name: newName.trim() });
      }
      setEditingProjectId(null);
    }
  };

  return {
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
  };
};

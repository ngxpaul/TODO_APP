import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { ProjectsSidebar } from "./components/ProjectsSidebar";
import { useState } from "react";
function App() {
  const [projectState, setProjectState] = useState({
    // selectedProjectID: underfined => state for not adding any projects
    selectedProjectID: undefined,
    //To add projects are created by users
    projects: [],
  });
  function handleStartAddProject() {
    setProjectState((prevState) => {
      //...prevState : copy of the previous state
      //selectedProjectID underfined => null : signal for now adding new projects
      return { ...prevState, selectedProjectID: null };
    });
  }
  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
      };
    });
  }
  console.log(projectState);
  let content;
  if (projectState.selectedProjectID === null) {
    content = <NewProject onAdd={handleAddProject} />;
  } else {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleAddProject}
        projects={projectState.projects}
      />
      {content}
    </main>
  );
}

export default App;
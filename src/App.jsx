import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { ProjectsSidebar } from "./components/ProjectsSidebar";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";
function App() {
  const [projectState, setProjectState] = useState({
    // selectedProjectID: underfined => state for not adding any projects
    selectedProjectID: undefined,
    //To add projects are created by users
    projects: [],
  });
  function handleSelectProject(id){
    setProjectState((prevState) => {
      //...prevState : copy of the previous state
      //selectedProjectID underfined => null : signal for now adding new projects
      return { ...prevState, selectedProjectID: id };
    });
  }
  function handleStartAddProject() {
    setProjectState((prevState) => {
      return { ...prevState, selectedProjectID: null };
    });
  }
  function handleCancelAddProject(){
    setProjectState((preState) =>{
      return{
        ...preState,
        selectedProjectID:undefined,
      }
    })
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
  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectID)
  let content = <SelectedProject project={selectedProject}/>;
  if (projectState.selectedProjectID === null) {
    content = <NewProject onCancel={handleCancelAddProject} onAdd={handleAddProject} />;
  } else {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
      />
    {content}
    </main>
  );
}

export default App;
import React from "react";

import UserRouter from "./Router/UserRouter";
import ProjectRouter from "./Router/ProjectRouter";
import WorkspaceRouter from "./Router/WorkspaceRouter";

function App() {
  return (
    <div className="">
      <UserRouter />
      <ProjectRouter />
      <WorkspaceRouter/>
    </div>
  );
}

export default App;

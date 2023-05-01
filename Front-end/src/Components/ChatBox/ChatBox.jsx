import React, { useEffect, useState } from "react";
import workspaceApi from "../../Api/workspaceApi";
import { userReducer } from "../../Redux/Slices/userSlice";
import { useSelector } from "react-redux";
import projectApi from "../../Api/projectApi";

function ChatBox() {
  const { fetchAllProjects } = projectApi();
  const { getWorkspaces } = workspaceApi();
  const [showWorkspaces,setShowWorkspaces] = useState(false)
  const [workspaces, setWorkspaces] = useState();
  const [projects, setProjects] = useState();
  const { userId, email } = useSelector(userReducer);
  const getAllWorkspaces = async () => {
    try {
      const response = await getWorkspaces(userId, email);
      setWorkspaces(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleWorkspaceClick = async (workspaceId) => {

    try {
      //const workspace = await getSelectedWorkspace(workspaceId)
      const projects = await fetchAllProjects(workspaceId);
      setProjects(projects.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllWorkspaces();
  }, []);



  return (
    <div className="h-full  overflow-scroll bg-gray-100 dark:bg-slate-800">
      <div className="h-full flex w-full rounded-3xl">
        <div className="w-1/4 h-full bg-gray-200 dark:bg-gray-800 ">
          <div className="flex 1/6 px-10 pt-8 justify-center items-center">
            {projects && (
              <button
                onClick={()=>setProjects('')}
                type="button"
                className=" text-white  w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Change workspace
              </button>
            )}
            {!projects && <p className="dark:text-white">Choose a Workspace</p>}
          </div>
          {!projects && (
            <div className="px-5 mt-5">
              {workspaces?.ownedWorkspaces?.map((owned) => {
                return (
                  <button
                    onClick={() => handleWorkspaceClick(owned._id)}
                    type="button"
                    class="w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-2xl border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    {owned.name}
                  </button>
                );
              })}
              {workspaces?.sharedWorkspaces?.map((shared) => {
                return (
                  <button
                    onClick={() => handleWorkspaceClick(shared._id)}
                    type="button"
                    class="w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-2xl border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    {shared.name}
                  </button>
                );
              })}
            </div>
          )}
          {
            <div className="px-5 mt-5">
              {projects ? projects?.map((project) => {
                return (
                <button
                  onClick={() => handleProjectClick(project._id)}
                  type="button"
                  class="w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-2xl border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  {project.name}
                </button>
                )
              }):""}
            </div>
          }
        </div>
        <div className="w-3/4 h-full bg-gray-300 dark:bg-gray-900 ">

        </div>
      </div>
    </div>
  );
}

export default ChatBox;

import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { userReducer } from "../../Redux/Slices/userSlice";
import workspaceApi from "../../Api/workspaceApi";
import projectApi from "../../Api/projectApi";
import { IoPersonRemove } from "react-icons/io5";
import CountUp from "react-countup";
import CreateWorkspace from "../Modal/CreateWorkspace";
import AddMembersToWorkspace from "../Modal/AddMembersToWorkspace";
import { useNavigate } from "react-router-dom";

function WorkspaceDetails() {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState();
  const [workspaceType, setWorkspaceType] = useState();
  const [projects, setProjects] = useState();
  const { getWorkspaces, getSelectedWorkspace } = workspaceApi();
  const { fetchAllProjects, fetchAProjectDetails } = projectApi();
  const [selectedWorkspace, setSelectedWorkspace] = useState();
  const { userId, email } = useSelector(userReducer);
  const [showModal, setShowModal] = React.useState(false);
  const getAllWorkspaces = async () => {
    try {
      const response = await getWorkspaces(userId, email);
      setWorkspaces(response.data);
 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllWorkspaces();
  }, []);

  const handleProjectClick = async (projectId) => {
    try {
    
      navigate("/project", {
        state: { projectId, workspaceType }
      });
    } catch (error) {
      console.log(error);
    }
  };


  const handleWorkspaceDropdown = () => {
    setShowModal(true);
  };

  const handleWorkspaceClick = async (workspaceId,workspaceType) => {
    try {
      setWorkspaceType(workspaceType)
      const workspace = await getSelectedWorkspace(workspaceId);
      setSelectedWorkspace(workspace.data);
      const projects = await fetchAllProjects(workspaceId);
      setProjects(projects.data);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dark:bg-slate-800 bg-gray-100 lg:p-4 h-screen overflow-y-auto w-full">
      <div className="flex flex-col lg:flex-row p-5 bg-gray-50  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
        <div className="w-full flex flex-col">
          {selectedWorkspace ? (
            <>
              <p className="flex items-end gap-3">
                <span className="dark:text-white text-3xl">
                  {selectedWorkspace.name}
                </span>{" "}
                <span
                  onClick={() => setShowModal(true)}
                  className="hover:cursor-pointer dark:text-white"
                >
                  <AiFillEdit />
                </span>
              </p>
            </>
          ) : (
            <p onClick={handleWorkspaceDropdown} className="dark:text-gray-100 cursor-pointer text-4xl">Choose a Workspace</p>
          )}
        </div>

        {showModal ? (
          <div className="justify-center w-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" dark:bg-slate-700  my-6 mx-auto ">
              {/*content*/}
              <div className="dark:bg-slate-700  border-0 rounded-lg shadow-lg  flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl dark:text-white font-semibold">
                    Choose Workspace
                  </h3>
                </div>
                {/*body*/}
                <div className=" p-6 w-full md:w-full flex">
                  <div className="w-full md:w-1/2 text-center">
                    <p className="dark:text-gray-200 mb-3 font-bold text-2xl">
                      Owned
                    </p>
                    <div className="">
                      {workspaces?.ownedWorkspaces?.map((owned) => {
                        return (
                          <button
                            key={owned._id}
                            className="dark:text-gray-300 text-xl mb-2
                          "
                            onClick={() => handleWorkspaceClick(owned._id,"Owned")}
                          >
                            {owned.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 text-center">
                    <p className="dark:text-gray-200 mb-3 font-bold text-2xl">
                      Shared{" "}
                    </p>
                    <div className="w-full">
                      {workspaces?.sharedWorkspaces?.map((shared) => {
                        return (
                          <button
                            key={shared._id}
                            onClick={() => handleWorkspaceClick(shared._id,"Shared")}
                            className="dark:text-gray-300 text-xl mb-2 hover:cursor-pointer"
                          >
                            {" "}
                            {shared.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div
          className={`${
            projects
              ? "flex  mt-5 gap-3 lg:gap-5 lg:mt-0 w-full  justify-around lg:w-4/6"
              : "hidden"
          }`}
        >
          <div className="p-6 gap-3 dark:text-white bg-white dark:bg-transparent w-auto shadow-xl dark:shadow-md dark:shadow-blue-700  flex justify-center items-center  ">
            <h1 className="text-lg font-thin md:text-xl md:font-semibold">
              Total
            </h1>
            <h1 className="text-blue-500 md:text-4xl md:font-bold">
              <CountUp end={projects ? projects.length : ""} duration={3} />
            </h1>
          </div>
          <div className="dark:text-white bg-white dark:bg-transparent flex justify-center items-center gap-3  p-6 w-auto shadow-xl dark:shadow-md dark:shadow-yellow-300">
            <h1 className="text-lg font-thin md:text-xl md:font-semibold">
              Pending
            </h1>
            <h1 className="text-yellow-300 md:text-4xl md:font-bold">30</h1>
          </div>
          <div className="dark:text-white bg-white dark:bg-transparent flex justify-center items-center gap-3  p-6 w-auto shadow-xl dark:shadow-md dark:shadow-green-500">
            <h1 className="text-lg font-thin md:text-xl md:font-semibold">
              Completed
            </h1>
            <h1 className="text-green-500 md:text-4xl md:font-bold">30</h1>
          </div>
        </div>
      </div>
      <div
        className={`${
          projects ? "hidden" : "w-full h-96 flex justify-center items-center"
        }`}
      >
        <div className="">
          <img
            className=" w-28 mt-24 animate-bounce"
            src="./Images/LOGO.png"
            alt=""
          />
        </div>
      </div>
      <div className={`${projects ? "" : "hidden"}`}>
        <div
          className={`${
            selectedWorkspace ? "flex justify-end items-center  mt-5" : "hidden"
          }`}
        >
          <AddMembersToWorkspace data={selectedWorkspace?._id} />
        </div>
        <div className="p-3 mt-0 w-full lg:flex lg:gap-3 lg:justify-between">
          <div className=" lg:w-2/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-5 mb-5  lg:mb-0 ">
            <p className="mb-4 border rounded-xl dark:bg-transparent dark:from-transparent dark:to-transparent bg-gradient-to-r from-gray-200 to-blue-300 border-blue-200 p-3 text-center text-xl font-semibold md:font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
              PROJECTS
            </p>

            <div className=" lg:my-4 shadow-2xl rounded-lg p-5 overflow-y-auto scrollbar-hide max-h-80 lg:max-h-96">
              <ul className="max-w-full">
                {projects?.map((project) => {
                  return (
                    <li key={project._id} className="pb-3 dark:bg-transparent dark:from-transparent dark:to-transparent bg-gradient-to-tr from-green-200 to-blue-200 rounded-2xl  border-cyan-900 mb-2 sm:pb-4 hover:dark:bg-slate-700 p-2 hover:bg-gray-300">
                      <div className="flex items-center space-x-4 hover:transform hover:-translate-y-1 transition duration-300">
                        <div className="flex-shrink-0">
                          <div
                            style={{ background: project?.theme }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center`}
                          >
                            {project.name[0]}
                          </div>
                        </div>
                        <button
                          className=""
                          onClick={() => handleProjectClick(project._id)}
                        >
                          <p className="lg:text-lg font-medium text-gray-900 truncate dark:text-white">
                            {project.name}
                          </p>
                        </button>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {project?.status}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className=" lg:w-3/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 lg:mt-5 mb-36  lg:mb-0 ">
            <p className="mb-4 border rounded-xl dark:bg-transparent dark:from-transparent dark:to-transparent bg-gradient-to-r from-gray-200 to-blue-300 border-blue-200 p-3 text-center text-xl font-semibold md:font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
              MEMBERS
            </p>
            <div className="lg:my-4 shadow-2xl rounded-lg p-5 overflow-y-auto scrollbar-hide max-h-80 lg:max-h-96">
              <ul className=" divide-gray-200 dark:divide-gray-700 p-5">
                {selectedWorkspace?.members?.map((member) => {
                  return (
                    <li key={member.email} className="pb-3 mb-3 sm:pb-4 dark:bg-transparent dark:from-transparent dark:to-transparent bg-gradient-to-tr from-green-200 to-blue-200 rounded-2xl hover:dark:bg-slate-700 p-2 hover:bg-gray-300">
                      <div className="flex items-center space-x-4 hover:transform hover:-translate-y-1 transition duration-300">
                        <div className="flex-shrink-0">
                          <div
                            className={`${
                              member.status == "accepted"
                                ? "bg-green-500"
                                : member.status == "pending"
                                ? "bg-yellow-400"
                                : member.status == "declined"
                                ? "bg-red-400"
                                : ""
                            } w-8 h-8 rounded-full flex items-center  justify-center`}
                          >
                            {member.email[0]}
                          </div>
                        </div>
                        <div className="flex justify-between w-full text-sm">
                          <p className=" text-xl text-gray-900 truncate dark:text-white">
                            {member.email}
                          </p>
                          <button>
                            <IoPersonRemove className="text-red-900 text-xl hidden" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
          
    </div>
  );
}

export default WorkspaceDetails;

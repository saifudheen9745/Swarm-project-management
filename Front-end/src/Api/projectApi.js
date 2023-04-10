import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const projectApi = () => {

  const axiosPrivate = useAxiosPrivate()

  const createProject = async (projectDetails) => {
    try {
      return await axiosPrivate.post("/project/create", projectDetails);
    } catch (error) {
      throw{error}
    }
  };

  return {createProject};
};

export default projectApi;

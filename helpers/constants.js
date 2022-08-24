const API_VERSION = `/api`;

module.exports = {
  REGISTER_API: {
    url: `${API_VERSION}/user/registerUser`,
    method: `POST`,
  },
  LOGIN_API: {
    url: `${API_VERSION}/user/loginUser`,
    method: `POST`,
  },
  ADD_PROJECT: {
    url: `${API_VERSION}/other/project/addProject`,
    method: `POST`,
  },
  UPDATE_PROJECT: {
    url: `${API_VERSION}/other/project/updateProject`,
    method: `POST`,
  },
  GET_PROJECT: {
    url: `${API_VERSION}/other/project/getProjects`,
    method: `GET`,
  },
  ADD_TASK: {
    url: `${API_VERSION}/other/task/addTask`,
    method: `POST`,
  },
  UPDATE_TASK: {
    url: `${API_VERSION}/other/task/updateTask`,
    method: `POST`,
  },
  GET_TASK: {
    url: `${API_VERSION}/other/task/getTasks`,
    method: `GET`,
  },
};

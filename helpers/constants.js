const API_VERSION = `/api`
module.exports = {
        REGISTER_API: {
                url: `${API_VERSION}/user/registerUser`,
                method: `POST`
        },
        LOGIN_API: {
                url: `${API_VERSION}/user/loginUser`,
                method: `POST`
        },
        ADD_PROJECT: `${API_VERSION}/project/addProject`,
        EDIT_PROJECT: `${API_VERSION}/project/editProject`,
        UPDATE_PROJECT: `${API_VERSION}/project/udpateProject`,
        GET_PROJECT: `${API_VERSION}/project/getProjects`
}
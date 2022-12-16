import axios from "axios";
const baseUrl = "/users/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    // console.log(error.response);
    return error.response.data.error;
  }
};

export default { login };

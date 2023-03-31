import axios from "axios";
// import {API_URL} from '@env';

export default axios.create({
  baseURL: "http://localhost:3010/api/v1/",
});

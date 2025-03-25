import axios from "axios";


  const newRequest = axios.create({
    baseURL : "http://localhost:8800/server/", 
    withCredentials : true,
  });

  export default newRequest;
  
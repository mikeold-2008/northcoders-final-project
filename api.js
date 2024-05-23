import axios from "axios";

//GET https://trailblaze-api-prod.onrender.com/users/:id



const getUsers = (id) => {
    return axios
      .get(`https://trailblaze-api-prod.onrender.com/users/{id}`)
      .then(response => {
       return response.data
      })
      .catch(error => {
        (error)
      })
}


export default getUsers;

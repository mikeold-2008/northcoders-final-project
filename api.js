import axios from "axios";

//GET https://trailblaze-api-prod.onrender.com/users/:id


const getUsers = async (id) => {
  try{
    const response = await axios.get(`https://trailblaze-api-prod.onrender.com/users/${id}`)
    return response.data
  } 
  catch(error){
    throw error;
  } 


}

//GET https://trailblaze-api-prod.onrender.com/users/auth/:email/:token

const getAuthUser = async (email, token) => {
    try {
        const response = await axios.get(`https://trailblaze-api-prod.onrender.com/users/auth/${email}/${token}`);
        return response.data;
    } catch (error) {
      console.log(error)
        throw new Error;
    }

};

//POST https://trailblaze-api-prod.onrender.com/challenges/solo

const postSoloChallenge = (ChallengeData) => {
    return axios
    .get(`https://trailblaze-api-prod.onrender.com/challenges/solo/${id}`, ChallengeData)
    .then(response => {
        return response.data
    })
    .catch(error => {
        (error)
    })
}

const getSolo = (id) => {
  return axios
    .get(`https://trailblaze-api-prod.onrender.com/challenges/solo/${id}`)
    .then(response => {
     return response.data
    })
    .catch(error => {
      (error)
    })
}



const postUser = async (userData) => {
 // console.log("in post user function", userData);
  try {
      const response = await axios.post(`https://trailblaze-api-prod.onrender.com/users/`,userData);
      return response.data;
  } catch (error) {
      //console.error(error);
      throw error; 
  }
}


export { getUsers, getAuthUser, postSoloChallenge, getSolo, postUser };

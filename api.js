import axios from "axios";

//GET https://trailblaze-api-prod.onrender.com/users/:id


const getUsers = (id) => {
    return axios
      .get(`https://trailblaze-api-prod.onrender.com/users/${id}`)
      .then(response => {
       return response.data
      })
      .catch(error => {
        (error)
      })
}

//GET https://trailblaze-api-prod.onrender.com/users/auth/:email/:token

const getAuthUser = async (email, token) => {
    console.log("in get auth user function");
    try {
        const response = await axios.get(`https://trailblaze-api-prod.onrender.com/users/auth/${email}/${token}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error; 
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

export { getUsers, getAuthUser, postSoloChallenge, getSolo };

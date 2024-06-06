import axios from "axios";




const getUsers = async (id) => {
  try{
    const response = await axios.get(`https://trailblaze-api-prod.onrender.com/users/${id}`)
    return response.data
  } 
  catch(error){
    throw error;
  } 


}



const getAuthUser = async (email, token) => {
    try {
        const response = await axios.get(`https://trailblaze-api-prod.onrender.com/users/auth/${email}/${token}`);
        return response.data;
    } catch (error) {
      throw error; 
    }

};



const postSoloChallenge = (ChallengeData) => {
    return axios
    .get(`https://trailblaze-api-prod.onrender.com/challenges/solo/${id}`, ChallengeData)
    .then(response => {
        return response.data
    })
    .catch(error => {
      throw error; 
    })
}

const getSolo = (id) => {
  return axios
    .get(`https://trailblaze-api-prod.onrender.com/challenges/solo/${id}`)
    .then(response => {
     return response.data
    })
    .catch(error => {
      throw error; 
    })
}



const postUser = async (userData) => {

  try {
      const response = await axios.post(`https://trailblaze-api-prod.onrender.com/users/`,userData);
      return response.data;
  } catch (error) {
      throw error; 
  }
}

const getDuo = (id) => {
  return axios
    .get(`https://trailblaze-api-prod.onrender.com/challenges/dual/${id}`)
    .then(response => {
     return response.data
    })
    .catch(error => {
      throw error; 
    })
}

const postDuo = (proposer_id, accepter_id, exercise_name, duration) => {
  return axios.post(`https://trailblaze-api-prod.onrender.com/challenges/dual`, {
    proposer_id: proposer_id,
    accepter_id: accepter_id,
    exercise_name: exercise_name,
    duration: duration,
  }).then((response) => {
    return response;
  })
  .catch((error) => {
    throw error; 
  });
};

const postSolo = (user_id, exercise_name, duration, distance) => {
  return axios.post(`https://trailblaze-api-prod.onrender.com/challenges/solo`, {
    user_id: user_id,
    exercise_name: exercise_name,
    duration: duration,
    distance: distance
  }).then((response) => {
    return response;
  })
  .catch((error) => {
    throw error; 
  });
};

const getAllActivities = async() =>{
  try{
    const response = await axios.get(`https://trailblaze-api-prod.onrender.com/activities`);
    return response.data;
  }
  catch(error){
    throw error;
  }
}

const PatchSoloChallengeProgress = async (challenge_id, progress) =>{
  return axios.patch(`https://trailblaze-api-prod.onrender.com/challenges/solo/${challenge_id}/progress`, {
    progress: progress,
  }).then((response) => {
    return response;
  })
  .catch((error) => {
    throw error; 
  });
}


const PatchSoloChallengePass = async (challenge_id, bool) =>{

  return axios.patch(`https://trailblaze-api-prod.onrender.com/challenges/solo/${challenge_id}`, {
    pass: bool,
  }).then((response) => {
    return response;
  })
  .catch((error) => {
    throw error; 
  });
}


const PatchTwoPersonChallengeProgress = async (challenge_id,user_id, progress) =>{
  return axios.patch(`https://trailblaze-api-prod.onrender.com/challenges/dual/${challenge_id}/progress`, {
    user_id: user_id,
    progress: progress
  }).then((response) => {
    return response;
  })
  .catch((error) => {
    throw error;
  });
}

const PatchTwoPersonChallengeWinner = async (challenge_id,winner_id) =>{
  return axios.patch(`https://trailblaze-api-prod.onrender.com/challenges/dual/${challenge_id}/winner`, {
    winner_id: winner_id,
  }).then((response) => {
    return response;
  })
  .catch((error) => {
    throw error;
  });
}


export { getUsers, getAuthUser, postSoloChallenge, getSolo, postUser, getDuo, postDuo, postSolo, getAllActivities, PatchSoloChallengeProgress, PatchSoloChallengePass, PatchTwoPersonChallengeProgress, PatchTwoPersonChallengeWinner };

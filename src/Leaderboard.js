import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { getAllActivities, getUsers } from '../api';
import {useEffect,useState} from 'react';


const Leaderboard = ({navigation}) => {
  const [activityList,setActivityList] = useState([])
  let walkingList = []
  let runningList = []
  let cyclingList = []
  const [walkingLeaderBoard,setWalkingLeaderBoard] = useState([])
  const [cyclingLeaderBoard,setCyclingLeaderBoard] = useState([])
  const [runningLeaderBoard,setRunningLeaderBoard] = useState([])



  useEffect(()=>{
    getAllActivities()
    .then((response)=>{
      setActivityList(response)
    })
    .catch((error)=>{
      throw error;
    })
  },[])

  useEffect(()=>{
    sortActivities(activityList)
  },[activityList])



  function sortActivities(activityList){
    const today = new Date()
    const lastWeekDate = new Date(today - 7 * 24 * 60 * 60 * 1000);

    activityList.forEach((activity)=>{
      let createdAt = new Date(activity.created_at)
      let difference = today.getTime() - createdAt.getTime()
      difference = difference/(1000*60*60*24)
      if(difference < 7){

        if(activity.exercise_name === "walking"){
          getUsers(activity.user_id)
          .then((response)=>{
            walkingList.push(
              {
              "activity_id": activity.activity_id,
              "firstName": response.firstName, 
              "lastName": response.lastName, 
              "Total": activity.distance
              }
          ) 
          walkingList = walkingList.sort(function(a,b){
            return b.Total - a.Total
          })
          })
          .catch((error)=>{
            throw error;
          })
        }

        else if(activity.exercise_name==="running"){
          getUsers(activity.user_id)
          .then((response)=>{
            runningList.push(
              {
              "activity_id": activity.activity_id,
              "firstName": response.firstName, 
              "lastName": response.lastName, 
              "Total": activity.distance
              }
          ) 
          runningList = runningList.sort(function(a,b){
            return b.Total - a.Total
          })
          })
          .catch((error)=>{
            throw error;
          })
        }

        else if(activity.exercise_name==="cycling"){
          getUsers(activity.user_id)
          .then((response)=>{
            cyclingList.push(
              {
              "activity_id": activity.activity_id,
              "firstName": response.firstName, 
              "lastName": response.lastName, 
              "Total": activity.distance
              }
          ) 
          cyclingList = cyclingList.sort(function(a,b){
            return b.Total - a.Total
          })
          })
          .catch((error)=>{
            throw error;
          })
        }
      }
    })



    let sortedWalks = walkingList.sort(function(a,b){
      return a.Total - b.Total
    })


    let sortedRuns = runningList.sort(function(a,b){
      return a.Total - b.Total
    })


    let sortedBikeRides = cyclingList.sort(function(a,b){
      return a.Total - b.Total
    })

    setWalkingLeaderBoard(sortedWalks)
    setRunningLeaderBoard(sortedRuns)
    setCyclingLeaderBoard(sortedBikeRides)


  }


    const renderLeaderBoard = ({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.firstName}</Text>
          <Text style={styles.name}>{item.lastName}</Text>
          <Text style={styles.score}>{item.Total}km</Text>
        </View>
      );



  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  return (
    
    <View >
    <View style={styles.topComponent}>
    <Text style={styles.header}>Top Walkers This Week</Text>
    </View>
    <FlatList style={styles.container}
      data={walkingLeaderBoard}
      renderItem={renderLeaderBoard}
      keyExtractor={(item) => item.activity_id.toString()}
      contentContainerStyle={styles.list}
    />



<View style={styles.topComponent}>
<Text style={styles.header}>Top Runners This Week</Text>
</View>
<FlatList style={styles.container}
      data={runningLeaderBoard}
      renderItem={renderLeaderBoard}
      keyExtractor={(item) => item.Total.toString()}
      contentContainerStyle={styles.list}
    />


          
  </View>
  
);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#002131',
    color: '#fff'
  },
  list: {
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 20,
    color: '#fff'
  },
  score: {
    fontSize: 20,
    color: '#fff'
  },
  topComponent: {
    backgroundColor: '#6495ED',
    padding: 20,
    fontSize: 50,
  },
  header:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  button:{
  padding: 10,
},
leaderboard:{

}
});

export default Leaderboard;

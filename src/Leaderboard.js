import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import MyAccountButton from './MyAccount';
import { getAllActivities, getUsers } from '../api';
import {useEffect,useState} from 'react';
import MyAccountScreen from './MyAccountScreen';


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
      console.log(error)
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
      //get number of days between activity created and today
      let difference = today.getTime() - createdAt.getTime()
      difference = difference/(1000*60*60*24)
      //we are only going to get activities from last 7 days
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
            console.log(error)
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
            console.log(error)
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
            console.log(error)
          })
        }
      }
    })



    let sortedWalks = walkingList.sort(function(a,b){
      return a.Total - b.Total
    })
    console.log(sortedWalks)


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


    // const data = [
    //     { id: 1, name: 'Player1', score: 100 },
    //     { id: 2, name: 'Player2', score: 90 },
    //     { id: 3, name: 'Player3', score: 80 },
    //     { id: 4, name: 'Player4', score: 70 },
    //     { id: 5, name: 'Player5', score: 60 },
    //     { id: 6, name: 'Player6', score: 100 },
    //     { id: 7, name: 'Player7', score: 90 },
    //     { id: 8, name: 'Player8', score: 80 },
    //     { id: 9, name: 'Player9', score: 70 },
    //     { id: 10, name: 'Player10', score: 60 },
    //   ];


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


    {/* <View style={styles.topComponent}>
      <Text style={styles.title}>Weekly Leaderboard</Text>
    </View> */}


    <View style={styles.topComponent}>
    <Text style={styles.header}>Top Walkers This Week</Text>
    </View>
    <FlatList style={styles.container}
      data={walkingLeaderBoard}
      renderItem={renderLeaderBoard}
      keyExtractor={(item) => item.activity_id.toString()}
      contentContainerStyle={styles.list}
    />


{cyclingLeaderBoard.length===0 ? <Text></Text> : <>

<View style={styles.topComponent}>
<Text style={styles.header}>Top Cyclists This Week</Text>
</View>
<FlatList style={styles.container} 
      data={cyclingLeaderBoard}
      renderItem={renderLeaderBoard}
      keyExtractor={(item) => item.activity_id.toString()}
      contentContainerStyle={styles.list}
    /></>
}
<View style={styles.topComponent}>
<Text style={styles.header}>Top Runners This Week</Text>
</View>
<FlatList style={styles.container}
      data={runningLeaderBoard}
      renderItem={renderLeaderBoard}
      keyExtractor={(item) => item.activity_id.toString()}
      contentContainerStyle={styles.list}
    />


<Button style={styles.button} title={`My Account`}
          onPress={() => navigation.navigate('MyAccountScreen')} />
          
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
    // backgroundColor: 'lightblue',
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

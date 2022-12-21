import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activity/ActivityDashboard';
import { v4 as uuidv4 } from 'uuid'


function App() {

  const[activities, setActivities] = useState<Activity[]>([]);
  const[selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);
 
  useEffect(()=> {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => {
      setActivities(response.data);
    })
  }, [])
  function handleSelectActivity(id : string){
    setSelectedActivity(activities.find(x=>x.id ===id));
  }
  function handleCancelActivity(){
    setSelectedActivity(undefined);
  }
  function handleOpenForm(id? : string){
    id ? handleSelectActivity(id) : handleCancelActivity();
    setEditMode(true);
  }
  function handleCloseForm(){
    setEditMode(false);
  }
  function handleCreateOrEdit(activity : Activity) {
    activity.id ? setActivities([...activities.filter(x=>x.id !==activity.id), activity])
    : setActivities([...activities, {...activity, id:uuidv4()}])
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(x=>x.id !==id)])
  }


  return (
    <>
     <NavBar openForm = {handleOpenForm}
    
     />
     <Container style={{marginTop: '7em'}}>
      <ActivityDashboard 
      activities={activities}
      selectedActivity = {selectedActivity}
      selectActivity = {handleSelectActivity}
      cancelActivity = {handleCancelActivity}
      openForm = {handleOpenForm}
      closeForm = {handleCloseForm}
      editMode = {editMode}
      createOrEdit = {handleCreateOrEdit}
      deleteActivity = {handleDeleteActivity}
      />
      </Container> 
    </>
  );
}

export default App;

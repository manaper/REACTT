import React, { useEffect, useState } from 'react';
import { Button, Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activity/ActivityDashboard';
import { v4 as uuidv4 } from 'uuid'
import agent from '../api/agent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from './LoadingComponent';



function App() {

  const {activityStore} = useStore();
  const[activities, setActivities] = useState<Activity[]>([]);
  const[selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);
  const[submitting, setSubmitting] = useState(false);

 
  useEffect(()=> {
     activityStore.loadActivities();
  }, [activityStore])
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
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(() =>{
      setActivities([...activities.filter(x=>x.id !==activity.id), activity])
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
    }else
    {
      activity.id = uuidv4();
      agent.Activities.create(activity).then(()=> {
        setActivities([...activities,activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
   
  }

  function handleDeleteActivity(id:string){
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x=>x.id !==id)]);
      setSubmitting(false);
    })
   
  }

  
  return (
    <>
     <NavBar openForm = {handleOpenForm}/>
     <Container style={{marginTop: '7em'}}>
      
      <ActivityDashboard 
      activities={activityStore.activities}
      selectedActivity = {selectedActivity}
      selectActivity = {handleSelectActivity}
      cancelActivity = {handleCancelActivity}
      openForm = {handleOpenForm}
      closeForm = {handleCloseForm}
      editMode = {editMode}
      createOrEdit = {handleCreateOrEdit}
      deleteActivity = {handleDeleteActivity}
      submitting = {submitting}
      />
      </Container> 
    </>
  );
}

export default observer(App);

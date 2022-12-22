import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
  
  activities: Activity[] = [];
  selectedActivity: Activity | null = null;
  editMode = false;
  

  constructor() {
    makeAutoObservable(this);
  }
 

  loadActivities = async () => {
 
    try {
      const activities = await agent.Activities.list();
        activities.forEach(activity => {
            activity.date = activity.date.split("T")[0];
            this.activities.push(activity);   
      })
      
   
    } catch (error) {
      console.log(error);
      

    }
  }
}

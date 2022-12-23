import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuidv4 } from "uuid";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a,b) => 
    Date.parse(a.date) -Date.parse(b.date))
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          activity.date = activity.date.split("T")[0];
          this.activityRegistry.set(activity.id, activity);
        });
       
        console.log(activities);
      });
    } catch (error) {
      runInAction(() => {});
      console.log(error);
    }
  };
  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id)
  };
  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };
  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };
  closeForm = () => {
    this.editMode = false;
  };
  createActivity = async (activity: Activity) => {
    activity.id = uuidv4();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id,activity)
        this.selectedActivity = activity;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    }
  };
  updateActivity = async (activity: Activity) => {
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id,activity)
        this.selectedActivity = activity;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    }
  };
  deleteActivity = async (id: string) => {
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id)
        if(this.selectedActivity?.id ===id) this.cancelSelectedActivity(); 
      });
    } catch (error) {}
  };
}

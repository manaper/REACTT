import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../app/models/activity";
import { useStore } from "../../app/stores/store";


export default observer(function ActivityList() {

 const {activityStore} = useStore();
 const {deleteActivity,activitiesByDate} = activityStore;
 const[target, setTarget] = useState(''); 
 

 function handleAcitivityDelete(e: SyntheticEvent<HTMLButtonElement>, id:string){
  setTarget(e.currentTarget.name);
  deleteActivity(id);
 }
   return (
    <Segment>
      <Item.Group>
        {activitiesByDate.map((activity) => (
          <Item.Content key={activity.id}>
            <Item.Header as="a">{activity.title}</Item.Header>
            <Item.Meta>{activity.date}</Item.Meta>
            <Item.Description>
              <div>{activity.description}</div>
              <div>{activity.city}</div>
            </Item.Description>
            <Item.Extra>
              <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue" />
              <Button
                name ={activity.id}
                loading={target === activity.id}
                onClick={(e) => {
                  handleAcitivityDelete(e,activity.id);
                }}
                floated="right"
                content="Delete"
                color="red"
              />
              <Label basic content={activity.category} />
            </Item.Extra>
          </Item.Content>
        ))}
      </Item.Group>
    </Segment>
  );
})

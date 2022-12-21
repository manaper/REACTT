import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity;
    cancelActivity : () => void;
    openForm : (id:string) =>void;
}

export default function ActivityDetails({activity, cancelActivity, openForm} : Props) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped ui={false}/>
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
             <span >{activity.date}</span>
        </Card.Meta>
        <Card.Description>
         {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths ='2'>
        <Button onClick={()=> {openForm(activity.id)}} content='Edit' basic color="blue"/>
        <Button onClick={cancelActivity} content='Cancel' basic color="grey"/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

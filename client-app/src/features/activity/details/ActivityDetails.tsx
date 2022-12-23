import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer(function ActivityDetails() {

  const {activityStore} = useStore();
  const {selectedActivity: activity, loadActivity} = activityStore;
  const {id} = useParams();

  useEffect(() =>{
    if(id) loadActivity(id)
  }, [id, loadActivity])

  if(!activity) return null;
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
        <Button as={Link} to={`/manage/${activity.id}`} content='Edit' basic color="blue"/>
        <Button as={Link} to='/activities' content='Cancel' basic color="grey"/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
})

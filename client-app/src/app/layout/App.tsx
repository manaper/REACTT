import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activity/ActivityDashboard";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
          <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);

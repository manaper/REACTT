import path from "path";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activity/ActivityDashboard";
import ActivityDetails from "../../features/activity/details/ActivityDetails";
import ActivityForm from "../../features/activity/form/ActivityForm";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path:'/',
        element: <App />,
        children: [
            { path: '', element: <HomePage />},
            { path: 'activities', element: <ActivityDashboard />},
            { path: 'activities/:id', element: <ActivityDetails />},
            { path: 'createActivity', element: <ActivityForm key='create'/>},
            { path: 'manage/:id', element: <ActivityForm key='manage' />},
          
        ]
        
    }
]

export const router = createBrowserRouter(routes);
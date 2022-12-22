import path from "path";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activity/ActivityDashboard";
import ActivityForm from "../../features/activity/form/ActivityForm";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path:'/',
        element: <App />,
        children: [
            { path: '', element: <HomePage />},
          
        ]
        
    }
]

export const router = createBrowserRouter(routes);
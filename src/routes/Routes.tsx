import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import AddForm from "../pages/addForm/AddForm";
import Preview from "../pages/preview/Preview";
import ViewData from "../pages/view-data/ViewData";
export const router = createBrowserRouter([
    {
        path : '/',
        element : <App/>,
        children : [
            {
                path : '',
                element : <Home/>
            },
            {
                path : 'add-form',
                element : <AddForm/>
            },
            {
                path : 'preview/:index',
                element : <Preview/>
            },
            {
                path : 'view-data/:index',
                element : <ViewData/>
            },
        ]

    }
])
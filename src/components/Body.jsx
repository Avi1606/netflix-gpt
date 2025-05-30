import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";


const Body = () => {
    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/browse",
            element: <Browse />,
        },
    ]);


    return (
        <div className="relative overflow-x-hidden">
            <RouterProvider router={appRouter} />
        </div>
    );
};
export default Body;

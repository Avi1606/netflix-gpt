import {Provider} from "react-redux";
import appStore from "./App/AppStore.js";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./components/Login.jsx";
import Browse from "./components/Browse.jsx";
import Body from "./components/Body.jsx";

function App() {
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path:'/browse',
            element: <Browse />
        }
    ]);

    return (
        <Provider store={appStore}>
            <Body>
                <RouterProvider router={appRouter} />
            </Body>
        </Provider>
    )
}

export default App

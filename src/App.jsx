import {Provider} from "react-redux";
import appStore from "./App/AppStore.js";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./components/Login.jsx";
import Browse from "./components/Browse.jsx";
import Body from "./components/Body.jsx";
import InterviewRoom from "./components/interview/InterviewRoom.jsx";
import InterviewDashboard from "./components/interview/InterviewDashboard.jsx";

function App() {
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path:'/browse',
            element: <Browse />
        },
        {
            path: '/interview',
            element: <InterviewDashboard />
        },
        {
            path: '/interview/room/:sessionId?',
            element: <InterviewRoom />
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

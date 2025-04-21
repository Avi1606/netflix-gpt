import Body from "./components/Body.jsx";
import Login from "./components/Login.jsx";
import {Outlet} from "react-router-dom";
import Header from "./components/Header.jsx"; // Import the Login component

function App() {
    return (
        <div>
            <Header />
            <Body />
            {/*<Outlet />*/}
        </div>
    )
}

export default App
import Body from "./components/Body.jsx";
import Header from "./components/Header.jsx";
import {Provider} from "react-redux";
import appStore from "./App/AppStore.jsx";

function App() {
    return (
        <Provider store={appStore}>
            <Header />
            <Body />
            {/*<Outlet />*/}
        </Provider>
    )
}

export default App
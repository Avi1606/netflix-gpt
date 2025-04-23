import React, {useEffect} from 'react';
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import Login from "./Login.jsx";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../Utils/Firebase.jsx"
import {useDispatch} from "react-redux";
import {addUser, removeUser} from "../App/UserSlice.jsx";
import Browse from "./Browse.jsx";

const Body = () => {
    const dispatch = useDispatch();

    // Uncomment the Browse route
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path:'/browse',
            element:<Browse/>
        }
    ])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName} = user;
                dispatch(addUser({uid: uid, email: email, displayName: displayName}));
            } else {
                dispatch(removeUser());
            }
        });
    }, []);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
};

export default Body;
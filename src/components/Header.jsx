import {onAuthStateChanged, signOut} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../Utils/firebase.jsx";
import {useEffect} from "react";
import {addUser, removeUser} from "../App/userSlice.jsx";
import {Logo_URL} from "../Utils/Constants.jsx";

const Header = () => {

    const navigate = useNavigate();

    const user = useSelector((store) => store.user);

    const dispatch = useDispatch();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
            })
            .catch((error) => {
                navigate("/error");
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName
                    })
                );
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, []);

    return (
       <div className="absolute w-full px-8 py-2 z-10 bg-gradient-to-b from-black to-transparent">
            <div className="flex justify-between">
                <img
                    className="w-44"
                    src={Logo_URL}
                    alt="logo"
                />
                {user && (
                    <div className="flex justify-end items-center mt-2">
                        <h1 className="text-white font-bold mr-4">
                            Welcome, {user?.displayName}
                        </h1>
                        <button
                            onClick={handleSignOut}
                            className="cursor-pointer text-white p-2 m-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Header;

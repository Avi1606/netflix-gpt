import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../Utils/Firebase.jsx";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../App/UserSlice.jsx";

const Body = ({ children }) => {
    const dispatch = useDispatch();
    const [profileUpdating, setProfileUpdating] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const { uid, email, displayName } = user;

                // Handle the case when displayName is null
                if (!displayName && email && !profileUpdating) {
                    try {
                        setProfileUpdating(true);
                        const defaultName = email.split('@')[0];

                        // Update profile
                        await updateProfile(user, {
                            displayName: defaultName
                        });

                        // Dispatch with updated name
                        dispatch(addUser({
                            uid: uid,
                            email: email,
                            displayName: defaultName
                        }));

                        console.log("Display name updated to:", defaultName);
                    } catch (error) {
                        console.error("Error updating display name:", error);
                        dispatch(addUser({ uid, email, displayName: email.split('@')[0] }));
                    } finally {
                        setProfileUpdating(false);
                    }
                } else {
                    // User has a displayName or we're still updating
                    if (!profileUpdating) {
                        dispatch(addUser({ uid, email, displayName: displayName || email.split('@')[0] }));
                    }
                }
            } else {
                // User is signed out
                dispatch(removeUser());
            }
        });

        return () => unsubscribe();
    }, [dispatch, profileUpdating]);

    return <>{children}</>;
};

export default Body;
import { useEffect, useState, useContext } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { AppContext } from "../context/AppContext"; // adjust path as needed
import { toast } from "react-hot-toast"; // or your preferred toast library

const UserSyncHandler = () => {
    const { isLoaded, isSignedIn, getToken } = useAuth();
    const { user } = useUser();
    const [synced, setSynced] = useState(false);
    const { backendUrl, loadUserCredits } = useContext(AppContext);

    useEffect(() => {
        const saveUser = async () => {
            if (!isLoaded || !isSignedIn || synced) {
                return;
            }

            try {
                const token = await getToken();

                const userData = {
                    clerkId: user.id,
                    email: user.primaryEmailAddress.emailAddress,
                    username: user.username || user.primaryEmailAddress.emailAddress.split('@')[0],
                    firstName: user.firstName,
                    lastName: user.lastName,
                    photoUrl: user.imageUrl || "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yeWd2TXZyNjBqRWk3aTVsdmpCR2ZCcEVpeWEiLCJyaWQiOiJ1c2VyXzJ5d1pnRHVmV2F6bUg5NHdFb0hVM3ZOcFhuTiIsImluaXRpYWxzIjoiSE0ifQ" + user.primaryEmailAddress.emailAddress,
                };

                const respone = await axios.post(
                    backendUrl + "users/create-or-update",
                    userData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if (respone.data.success == true) {
                    console.log("User synced successfully");
                    toast.success("User synced successfully");
                } else {
                    console.error("User sync failed  jjiji", respone.data.message);
                    toast.error("User sync failed. Please try again");
                }
                setSynced(true); // prevent re-posting
                // Load user credits after syncing
                await loadUserCredits();


            } catch (error) {
                console.error("User sync failed", error.message);
                toast.error("User sync failed. Please try");
            }
        };

        saveUser();
    }, [isLoaded, isSignedIn, getToken, user, synced]);


};

export default UserSyncHandler;

// import { useEffect, useState, useContext } from "react";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import { toast } from "react-hot-toast";

// const UserSyncHandler = () => {
//     const { isLoaded, isSignedIn, getToken } = useAuth();
//     const { user } = useUser();
//     const [synced, setSynced] = useState(false);
//     const { backendUrl, loadUserCredits } = useContext(AppContext);

//     useEffect(() => {
//         const saveUser = async () => {
//             if (!isLoaded || !isSignedIn || synced || !user) return;

//             try {
//                 const token = await getToken();

//                 const userData = {
//                     clerkId: user.id,
//                     email: user.primaryEmailAddress?.emailAddress || "",
//                     username: user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || "guest",
//                     firstName: user.firstName || "",
//                     lastName: user.lastName || "",
//                     photoUrl: user.imageUrl || `https://avatar.vercel.sh/${user.id}`,
//                 };

//                 const response = await axios.post(
//                     `${backendUrl}/api/users/create-or-update`,
//                     userData,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );

//                 if (response.data.success === true) {
//                     toast.success("User synced successfully");
//                 } else {
//                     toast.error("User sync failed. Please try again");
//                     console.error("Sync error:", response.data);
//                 }

//                 setSynced(true);
//                 await loadUserCredits();

//             } catch (error) {
//                 console.error("Sync failed", error);
//                 toast.error("User sync failed");
//             }
//         };

//         saveUser();
//     }, [isLoaded, isSignedIn, user, synced, getToken, backendUrl, loadUserCredits]);

//     return null; // 🔁 Return something to avoid React warning
// };

// export default UserSyncHandler;


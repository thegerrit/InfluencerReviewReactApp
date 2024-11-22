// import React, { createContext, useContext, useEffect, useState } from 'react';
// // import { useAuth } from './AuthContext'; // Import the useAuth hook
// import User from '../model/User';
// import { fetchUserDataByUserId } from '../dataApi/fetchUserHandleByUserId';
// import { getAuth } from 'firebase/auth';

// // Create a context for user data
// const UserContext = createContext<User | null>(null);

// // Create a provider component
// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     // const currentUser = useAuth(); // Get the current authenticated user
//     const [userData, setUserData] = useState<User | null>(null);

//     //TODO: fix this so it doesn't make a call to the db multiple times per second
//     // useEffect(() => {
//     //     const currentUser = getAuth().currentUser;
//     //     if (currentUser) {
//     //         // Fetch additional user data when the user is authenticated
//     //         const fetchUserData = async () => {
//     //             // Replace with your data fetching logic
//     //             // const data: User = await fetchUserDataFromDatabase(currentUser.uid);
//     //             const data: User | null = await fetchUserDataByUserId(currentUser.uid);
//     //             setUserData(data);
//     //         };

//     //         fetchUserData();
//     //     } else {
//     //         // Reset user data when no user is authenticated
//     //         setUserData(null);
//     //     }
//     // }, [userData]);

//     console.log("userData: ", userData);

//     return (
//         <UserContext.Provider value={userData}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// // Custom hook to use the UserContext
// export const useUser = () => {
//     return useContext(UserContext);
// }; 
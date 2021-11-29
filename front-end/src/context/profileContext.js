// import React, { createContext, useContext, useState } from "react";
// import { useSelector } from "react-redux";

// const profileContext = createContext();

// const ProfileContextProvider = ({ children }) => {
//   const [open, setOpen] = useState(false);
//   const [targetModal, setTargetModal] = useState(false);
//   const [targetWeight, setTargetWeight] = useState("");

//   const clickHandler = () => {
//     setOpen((prev) => !prev);
//   };

//   return (
//     <profileContext.Provider
//       value={{
//         open,
//         setOpen,
//         clickHandler,
//         targetModal,
//         setTargetModal,
//         targetWeight,
//         setTargetWeight,
//       }}
//     >
//       {children}
//     </profileContext.Provider>
//   );
// };

// export const useProfileContext = () => useContext(profileContext);

// export default ProfileContextProvider;

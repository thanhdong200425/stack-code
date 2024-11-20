"use client";

import {createContext} from "react";

export const UserContext = createContext();

export default function LayoutContext({children, userImage}) {
    return <UserContext.Provider value={userImage}>
        {children}
    </UserContext.Provider>
}
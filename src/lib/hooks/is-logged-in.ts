"use client"

import { useEffect, useState } from "react";

/**
 * Hook to check if user is logged in
 * @returns boolean
 */

const useIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('userInfo') !== null);

    }, []);

    return isLoggedIn;
};

export default useIsLoggedIn;
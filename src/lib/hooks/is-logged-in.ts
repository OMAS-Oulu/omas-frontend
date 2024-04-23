"use client"

import { useEffect, useState } from "react";

const useIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('userInfo') !== null);

    }, []);

    return isLoggedIn;
};

export default useIsLoggedIn;
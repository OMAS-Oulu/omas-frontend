"use client"

import { isJwtExpired } from "@/app/actions";
import { useEffect, useState } from "react";

/**
 * Hook to get user information from local storage.
 * it checks if the JWT token is expired and clears the local storage if it is.
 * @returns Returns an object containing user information.
 */

async function checkJWTExpiry() {
    const expired = await isJwtExpired(localStorage.getItem('token') || '');
    return expired;
}

const useUserInfo = () => {
    const [storage, setStorage] = useState<Record<string, any>>({});

    useEffect(() => {
        (async () => {
            const expired = await checkJWTExpiry();
            if (expired) {
                localStorage.clear();
                setStorage({});
            } else {
                const allStorage = Object.keys(localStorage).reduce((obj, str) => {
                    let item = localStorage.getItem(str);
                    try {
                        // Check if item is JSON
                        item = JSON.parse(item || 'null');
                    } catch (error) {
                        // If not JSON, leave it as is
                    }
                    return { ...obj, [str]: item };
                }, {});
                setStorage(allStorage);
            }
        })();
    }, []);

    return storage;
};

export default useUserInfo;
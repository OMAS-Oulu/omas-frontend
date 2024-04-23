"use client"

import { isJwtExpired } from "@/app/actions";
import { useEffect, useState } from "react";

/**
 * Hook to get user info from local storage
 * @returns Record<string, any>
 */

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
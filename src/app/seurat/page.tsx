'use client';
import React, { useEffect, useState } from 'react';
import useIsLoggedIn from '@/lib/hooks/is-logged-in';
import axios from 'axios';
import { getClubQueryUrl } from '@/lib/APIConstants';
import { ClubResponse, QueryClub } from '@/types/commonTypes';
import Paginator from '../components/Paginator';
import Input from '@/components/ui/Input';
import Club from './Club';
import { useRouter } from 'next/navigation';
import ClubsView from './ClubsView';

const fetchClubs = async (apiUrl: string, setData: (data: QueryClub) => void) => {
	try {
		const res = await axios.get(apiUrl, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem("token")}`,
				'Content-Type': 'application/json'
			}
		});
		setData(res.data);
	} catch (e: any) {
		console.error(e);
	}
}

export default function Seurat() {
	return (
		<ClubsView />
	)
}
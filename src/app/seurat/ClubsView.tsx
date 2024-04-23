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

const ClubsView = () => {
	const [data, setData] = useState<QueryClub>();
	const [pageNumber, setPageNumber] = useState(0);
	const [search, setSearch] = useState("");

    const router = useRouter();
	
	let apiUrl = getClubQueryUrl(search, pageNumber, 10);

	const fetchClubs = async () => {
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

	const handlePageNumberChange = (page: number) => {
		if (!data) return;
		if (page < 0 || page > data.totalPages - 1) return;
		setPageNumber(page);
	}

	useEffect(() => {
		fetchClubs();
	}, [pageNumber, search]);

	useEffect(() => {
		setPageNumber(0);
	}, [search]);

	if (!useIsLoggedIn || !data) return (
		<main className="flex min-h-screen flex-col sm:items-center p-4 gap-2">
			<h1 className='text-4xl'>Seurat</h1>
			<p className='text-md'>Kirjaudu sisään tarkastellaksesi ja liittyäksesi seuraan.</p>
		</main>
	)

	return (
		<main className="flex min-h-screen flex-col items-center p-4 gap-10">
			<h1 className='text-4xl'>Seurat</h1>
			<div className="flex flex-col items-center gap-2">
				<Input
					id="search"
					placeholder="Hae seuraa"
					type="text"
					onChange={(e) => setSearch(e.target.value)}
					required={false}
				/>
				<p className='text-md'>Huomaa, että hakemisessa pitää käyttää oikeaa kirjainkokoa.</p>
				<p className='text-md'>Jos olet seuran pääkäyttäjä, voit vaihtaa seuran salasanaa sen kohdalta.</p>
				<Paginator
					pageNumber={pageNumber}
					totalPages={data.totalPages}
					handlePageNumberChange={handlePageNumberChange}				
				/>
			</div>
			<div className='flex flex-col gap-2 w-full'>
				{data.content && data.content.map((club: ClubResponse, index: number) => (
					<Club
						key={index}
						displayName={club.nameNonId}
						id={club.name}
						creationDate={club.creationDate}
					/>
				))}
			</div>
		</main>
	)
}

export default ClubsView;
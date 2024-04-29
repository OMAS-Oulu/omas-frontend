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
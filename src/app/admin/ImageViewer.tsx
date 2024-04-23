import { Button } from "@/components/ui/Button";
import { getCompetitionsQueryUrl, getFileDownloadUrl } from "@/lib/APIConstants";
import { CompetitionResponse, ImageProof, QueryCompetition } from "@/types/commonTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import Images from "./Images";
import Paginator from "../components/Paginator";
import Competition from "./Competition";
import Input from "@/components/ui/Input";
import { stringToId } from "@/lib/functions";

const ImageViewer = () => {
    const [data, setData] = useState<QueryCompetition>();
	const [pageNumber, setPageNumber] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const apiUrl = getCompetitionsQueryUrl(searchQuery, pageNumber, 5)

    console.log(apiUrl);
    const fetchCompetitions = async () => {
		try {
			const res = await axios.get(apiUrl, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
            console.log(res);
			setData(res.data);
		} catch (e: any) {
			console.error(e);
		}
	}
    
    useEffect(() => {
        fetchCompetitions();
    }, [pageNumber, searchQuery])

    useEffect(() => {
		setPageNumber(0);
	}, [searchQuery])

    if (!data) return <h1>Virhe tietojen haussa.</h1>;

	let competitions = data.content;

    const handlePageNumberChange = (page: number) => {
		if (page < 0 || page > data.totalPages - 1) return;
		setPageNumber(page);
	}

    return (
        <div className="mt-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl">Hae kilpailua:</h1>
                <Input
                    id="search"
                    placeholder="Hae kilpailua"
                    type="text"
                    onChange={(e) => setSearchQuery(stringToId(e.target.value))}
                    required={false}
                />
                { 
                    !(data.totalPages < 2) ?
                        <Paginator
                            pageNumber={pageNumber}
                            totalPages={data.totalPages}
                            handlePageNumberChange={handlePageNumberChange}
                        />
                    : <div></div>
                }
                {
                    (competitions || competitions!.length !== 0) ?
                        competitions && competitions?.map((comp: CompetitionResponse, index: number) => (
                            <Competition key={index} comp={comp} />
                        ))
                    : <h1>Kilpailuja ei löytynyt</h1>
                }
            </div>
        </div>
    )
}

export default ImageViewer;
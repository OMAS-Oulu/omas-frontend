"use client";

import Input from "@/components/ui/Input";
import { getCompetitionsQueryUrl } from "../../lib/APIConstants";
import { CompetitionResponse } from "@/types/commonTypes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import Paginator from "../components/Paginator";

export default function Competitions() {
  const [competitions, setCompetitions] = useState<CompetitionResponse[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPage] = useState(0);

  const router = useRouter();

  async function fetchData() {
    const competitions = await axios.get(
      getCompetitionsQueryUrl(search, page),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setCompetitions(competitions.data.content);
    setTotalPage(competitions.data.totalPages);
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    setPage(0);
    fetchData();
  }, [search]);

  const handlePageNumberChange = (page: number) => {
    if (page < 0 || page > totalPages - 1) return;
    setPage(page);
  };

  return (
    <div className="flex flex-col py-5">
      <Input
        id={"search"}
        placeholder={"Hae"}
        type={"text"}
        onChange={(e) => setSearch(e.target.value)}
        required={false}
      />
      {competitions &&
        competitions.map((competition, index) => (
          <Link
            key={index}
            className="flex cursor-pointer sm:flex-row flex-col items-baseline border my-1 p-2 sm:pl-10 hover:bg-slate-100"
            href={"/kilpailut/" + competition.competitionId}
          >
            <p>{competition.displayName}</p>
            <p className="sm:ml-auto sm:mr-5 text-slate-700">
              {formatDate(competition.startDate) +
                " - " +
                formatDate(competition.endDate)}
            </p>
          </Link>
        ))}
      <Paginator
        pageNumber={page}
        totalPages={totalPages}
        handlePageNumberChange={handlePageNumberChange}
      />
    </div>
  );
}

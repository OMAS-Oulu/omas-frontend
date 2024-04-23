import React from "react";
import Competitions from "./Competitions";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CompetitionResponse } from "@/types/commonTypes";

export default function LisääKilpailu() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-8 sm:p-24">
      <div className="container shadow-lg p-4 sm:p-10 mx-auto">
        <h1 className="text-3xl text-center">
          Aktiiviset ja tulevat kilpailut
        </h1>
        <Competitions />
      </div>
    </main>
  );
}

"use client";

import { Button } from "@/components/ui/Button";
import { addCompetitionURL } from "../../../lib/APIConstants";
import axios from "axios";
import { Form, Formik } from "formik";
import validationSchema from "./add-competition-validation";
import CustomInput from "@/components/ui/CustomInput";
import CustomDropdown from "@/components/ui/CustomDropdown";
import { useRouter } from "next/navigation";
import { PostCompetition } from "@/types/commonTypes";
import { useState } from "react";
import useUserInfo from "@/lib/hooks/get-user.info";
import AdminNavbar from "../AdminNavbar";

export default function AddCompetition() {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { token } = useUserInfo();

  type CompetitionType = "rifle" | "pistol";

  const competitionTypes: Record<string, CompetitionType> = {
    Ilmakivääri: "rifle",
    Ilmapistooli: "pistol",
  };

  const competitionTypeOptions = Object.keys(competitionTypes);

  const initialValues = {
    competitionName: "",
    competitionType: "Ilmakivääri",
    startDate: "",
    endDate: "",
  };

  const handleAddCompetition = async (values: any) => {
    try {
      const competitonInfo: PostCompetition =
        values.startDate || values.endDate
          ? {
              competitionName: values.competitionName,
              competitionType: competitionTypes[values.competitionType],
              startDate: Date.parse(values.startDate),
              endDate: Date.parse(values.endDate),
            }
          : {
              competitionName: values.competitionName,
              competitionType: competitionTypes[values.competitionType],
            };
      const res = await axios({
          method: "post",
          url: addCompetitionURL,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          data: competitonInfo,
        });
      
        if (res.status === 201) {
          console.log(res.data);
          setMessage(`Loit kilpailun nimeltä: ${values.competitionName}`);
        } else {
          console.log(res.data.message);
          setMessage(`Kilpailun ${values.competitionName} luonti epäonnistui`);
        }

    } catch (error: any) {
      if (error.response.data) {
        console.log(error.response.data);
        setMessage(`Kilpailun ${values.competitionName} luonti epäonnistui`);
      }
    }
  }

  return (
    <div className="p-4">
      <AdminNavbar />
      <h1 className="py-2">Tällä sivulla voit luoda uusia kilpailuja.</h1>
      <Formik
        id="addCompetitionForm"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => handleAddCompetition(values)}
        >
        <Form>
          <div className="flex flex-col justify-center my-4 p-4 border-solid border border-slate-300 rounded-lg shadow-md">
            <CustomInput
              label={"Kilpailun nimi"}
              name={"competitionName"}
              placeholder={"Kilpailun nimi"}
              type={"text"}
              />
            <CustomDropdown
              label={"Kilpailun tyyppi"}
              name={"competitionType"}
              placeholder={"Kilpailun tyyppi"}
              options={competitionTypeOptions}
              />
            <span className="flex flex-row gap-5 justify-center">
              <CustomInput
                label={"Alkamispäivämäärä"}
                placeholder={"Alkamispäivämäärä"}
                type={"date"}
                name={"startDate"}
                />
              <CustomInput
                label={"Päättymispäivämäärä"}
                placeholder={"Päättymispäivämäärä"}
                type={"date"}
                name={"endDate"}
                />
            </span>
            <p className="text-xl">{message}</p>
            <Button
              variant={"outline"}
              size={"lg"}
              className="mx-auto text-xl hover:bg-slate-100"
              type="submit"
              >
              Luo kilpailu
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

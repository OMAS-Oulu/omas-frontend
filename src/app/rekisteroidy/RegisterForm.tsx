"use client";

import { Button } from "@/components/ui/Button";
import { addClubURL, joinClubURL, loginURL } from "../../lib/APIConstants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createRef, useState } from "react";
import { Form, Formik } from "formik";
import validationSchema from "./validation";

import CustomInput from "@/components/ui/CustomInput";
import JoinClub from "../kilpailut/liitySeuraan/JoinClub";
import ReCAPTCHA from "react-google-recaptcha";
import { captchaResponse } from "@/types/commonTypes";

export default function RegisterForm() {
  const [message, setMessage] = useState("");
  const reCaptchaRef = createRef<ReCAPTCHA>();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const initialValues = {
    username: "",
    name: "",
    password: "",
    email: "",
  };
  const router = useRouter();

  const url = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = "api/reg";

  const [errorMessage, setErrorMessage] = useState<string>("");

  const postRegister = async (values: any) => {
    console.log(values);
    setErrorMessage("");
    const payload = values;
    try {
      const captchaRes: captchaResponse = await handleReCaptchaSubmit(
        captchaToken
      );

      if (captchaRes.success) {
        const response = await fetch(`${url + endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          console.log(response.status);
          try {
            const response = await axios.post(loginURL, {
              username: values.username,
              password: values.password,
            });

            console.log("login success");
            console.log(response.data.user);

            let token = response.data.token;
            let userInfo = response.data.user;

            localStorage.setItem("token", token);
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            window.dispatchEvent(new Event("localStorageChange"));
            router.push("/");
          } catch (error: any) {
            if (error.response.data) {
              console.log(error.response.data);
            }
          } finally {
            reCaptchaRef?.current?.reset();
          }
        } else {
          setMessage(
            "Rekisteröinti ei onnistunut. Tarkista, että syöttämäsi tiedot ovat oikein."
          );
          setErrorMessage(data.message);
          router.push("/kirjaudu");
        }
      } else {
        setMessage("Muista reCAPTCHA.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onReCAPTCHAChange = async (captchaToken: string | null) => {
    setCaptchaToken(captchaToken);
  };

  const handleReCaptchaSubmit = async (captchaToken: string | null) => {
    const resCaptcha = await axios({
      method: "POST",
      url: "rekisteroidy/api",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        captchaToken: captchaToken,
      },
    });
    return resCaptcha.data.body;
  };

  return (
    <Formik
      id="registerForm"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        postRegister(values);
        setSubmitting(false);
      }}
    >
      <Form>
        <div
          hidden={!errorMessage}
          className="text-center mx-auto mt-2 text-red-500"
        >
          <p>{errorMessage}</p>
        </div>
        <div className="container shadow-lg p-5 mx-auto max-w-lg">
          <div className="text-center pb-0">
            <h1 className="text-3xl my-2 font-bold">Rekisteröidy</h1>
            <p>Syötä vaadittavat tiedot</p>
            <p>{message}</p>
          </div>
          <div className="grid gap-6 p-6">
            <CustomInput
              label="Sähköposti"
              name="email"
              type="email"
              placeholder="Sähköposti"
            />
            <CustomInput
              label="Nimi"
              name="name"
              type="text"
              placeholder="Nimi"
            />
            <CustomInput
              label="Käyttäjätunnus"
              name="username"
              placeholder="Käyttäjätunnus"
              type="text"
            />
            <CustomInput
              label="Salasana"
              name="password"
              type="password"
              placeholder="Salasana"
            />
            <CustomInput
              label="Salasana uudelleen"
              name="passrepeat"
              type="password"
              placeholder="Salasana uudelleen"
            />
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={onReCAPTCHAChange}
            />
            <Button
              variant={"outline"}
              size={"lg"}
              className="mx-auto text-xl hover:bg-slate-100"
              type="submit"
            >
              Rekisteröidy
            </Button>
          </div>
          <div className="text-center grid gap-5 pt-0">
            <Link className="text-sm underline" href="/kirjaudu">
              Onko sinulla jo tili? Kirjaudu
            </Link>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

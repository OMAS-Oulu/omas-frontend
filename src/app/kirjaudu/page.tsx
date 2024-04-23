"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import axios, { AxiosResponse } from "axios";
import { loginURL } from "../../lib/APIConstants";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import Custominput from "@/components/ui/CustomInput";
import validation from "./validation";
import { createRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { captchaResponse } from "@/types/commonTypes";

export default function Login() {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const reCaptchaRef = createRef<ReCAPTCHA>();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const captchaRes: captchaResponse = await handleReCaptchaSubmit(
        captchaToken
      );

      if (captchaRes.success) {
        const response = await axios.post(loginURL, {
          username: values.username,
          password: values.password,
        });

        console.log("login success");
        console.log(response.data.user);

        const token = response.data.token;
        const userInfo = response.data.user;

              localStorage.setItem("token", token);
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
              window.dispatchEvent(new Event("localStorageChange"));
              router.push("/kilpailut");
            } else {
              setMessage("Muista reCAPTCHA.");
              reCaptchaRef?.current?.reset();
            }
        } catch (error) {
          setMessage("Kirjautuminen ei onnistunut. Tarkista, että syöttämäsi tiedot ovat oikein.");
          console.log(error);
        } finally {
          reCaptchaRef?.current?.reset();
        }
    };

  const onReCAPTCHAChange = async (captchaToken: string | null) => {
    setCaptchaToken(captchaToken);
  };

  const handleReCaptchaSubmit = async (captchaToken: string | null) => {
    const resCaptcha = await axios({
      method: "POST",
      url: "kirjaudu/api",
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
    <main className="flex min-h-screen flex-col items-center justify-between my-2 p-5">
      <div className="container shadow-lg p-5 mx-auto max-w-lg">
        <div className="flex flex-col gap-2 text-center pb-0">
          <h1 className="text-3xl my-2 font-bold">Kirjaudu</h1>
          <p>Syötä käyttäjänimesi ja salasanasi</p>
          <p>{message}</p>
        </div>
        <div className="my-5">
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validationSchema={validation}
          >
            <Form className="grid gap-5">
              <Custominput
                label="Käyttäjätunnus"
                name="username"
                type="text"
                placeholder="Käyttäjätunnus"
              />
              <Custominput
                label="Salasana"
                name="password"
                type="password"
                placeholder="Salasana"
              />
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={onReCAPTCHAChange}
              />
              <Button
                variant={"outline"}
                size={"lg"}
                className="mx-auto text-xl hover:bg-slate-100 my-2"
                type="submit"
              >
                Kirjaudu
              </Button>
            </Form>
          </Formik>
        </div>
        <div className="text-center grid gap-5 my-6">
          <Link className="text-sm underline" href="/recovery">
            Unohditko salasanasi?
          </Link>
          <Link className="text-sm underline" href="/rekisteroidy">
            Eikö sinulla ole tiliä? Rekisteröidy
          </Link>
        </div>
      </div>
    </main>
  );
}

"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createRef, useState } from "react";
import { Form, Formik } from "formik";
import validationSchema from "./validation";
import CustomInput from "@/components/ui/CustomInput";
import ReCAPTCHA from "react-google-recaptcha";
import { captchaValidation } from "../actions";
import { registrationURL } from "@/lib/APIConstants";
import { sendLogin } from "@/lib/utils";

export async function sendRegister(values: any) {
  try {
    const response = await fetch(`${registrationURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        name: values.name,
        password: values.password,
        email: values.email,
      }),
    });
    return response;
  } catch (error: any) {
    console.error(error);
    return error;
  }
}

export default function RegisterForm() {
  const [message, setMessage] = useState<string | null>();
  const reCaptchaRef = createRef<ReCAPTCHA>();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const initialValues = {
    username: "",
    name: "",
    password: "",
    email: "",
  };
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>();

  const handleRegister = async (values: any) => {
    try {
      const captchaRes = await captchaValidation(captchaToken);
      const success = captchaRes.body.success;

      if (!success) {
          setMessage("Muista reCAPTCHA.");
          reCaptchaRef?.current?.reset();
          return;
      }

      const response  = await sendRegister(values);

        if (response.status === 200) {
            setMessage("Rekisteröityminen onnistui.")

            const response = await sendLogin(values.username, values.password);
            const body = await response.json();
            if (response.status === 200) {
              const token = body.token;
              const userInfo = body.user;
  
              localStorage.setItem("token", token);
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
              window.dispatchEvent(new Event("localStorageChange"));
              router.push("/");
            }
          } else {
            setErrorMessage(`Rekisteröityminen epäonnistui.`);
          }
    } catch (error) {
      console.error(error);
    } finally {
      reCaptchaRef?.current?.reset();
  }
  };

  const onReCAPTCHAChange = async (captchaToken: string | null) => {
    setCaptchaToken(captchaToken);
  };

  return (
    <Formik
      id="registerForm"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        handleRegister(values);
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
              ref={reCaptchaRef}
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

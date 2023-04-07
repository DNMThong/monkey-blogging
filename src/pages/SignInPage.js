import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { Label } from "components/label";
import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import AuthenticationPage from "./AuthenticationPage";

const schema = yup.object({
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter valid email address"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Your password must be at least 8 characters or greater"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const { userInfo,setUserInfo } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors,isValid },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
      });
    }
    // tslint: disable-next-line: no-var-demand
  }, [errors]);
  const handleSignIn = (values) => {
    if(!isValid) return;
    signInWithEmailAndPassword(auth,values.email,values.password)
      .then((cred) => {
        toast.success("Sign in success")
        setUserInfo(cred)
        navigate("/")
      })
      .catch((error) => {
        toast.error("Wrong password or account")
      })
  };
  useEffect(() => {
    document.title = "Sign In";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            control={control}
            placeholder="Enter your email"
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="suggestions">
          <span>You have not had an account? </span>
          <NavLink to="/sign-up">Register an account</NavLink>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          width="250px"
          style={{
            margin: "0 auto",
          }}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;

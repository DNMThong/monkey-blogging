import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { collection, addDoc, setDoc, doc, serverTimestamp } from "@firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import { NavLink } from "react-router-dom";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import Checkbox from "components/checkbox/Checkbox";
import { Radio } from "components/checkbox";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter valid email address"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Your password must be at least 8 characters or greater"),
});

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  const handleSignUp = async (values) => {
    console.log(values)
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL: "https://images.unsplash.com/photo-1663877174990-b1589bcdd411?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
    });
    await setDoc(doc(db,"users",auth.currentUser.uid),{
      ...values,
      username: slugify(values.fullname,{lower : true}),
      status: userStatus.ACTIVE,
      role: userRole.USER,
      avatar: "https://images.unsplash.com/photo-1663877174990-b1589bcdd411?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      createAt: serverTimestamp()
    })
   
    toast.success("Register successfully!!!");
  };

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
      });
    }
    // tslint: disable-next-line: no-var-demand
  }, [errors]);

  useEffect(() => {
    document.title = "Register";
  }, []);
  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Please enter your fullname"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Please enter your fullname"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="suggestions">
          <span>You already have an account? </span>
          <NavLink to="/sign-in">Login</NavLink>
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
          Sign up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;

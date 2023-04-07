import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import ImageUpload from "components/upload/ImageUpload";
import { auth, db } from "firebase-app/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter valid email address"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Your password must be at least 8 characters or greater")
})

const UserAddNew = () => {
  const { control,handleSubmit,reset,formState : { isValid,isSubmitting } } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      status: userStatus.PENDING,
      role: userRole.USER,
      avatar: "",
      createdAt: new Date()
    },
    resolver: yupResolver(schema)
  });

  const { 
    urlImage,
    progress,
    handleRemoveImage,
    uploadImageStorage,
    setUrlImage,
    setProgress
  } = useFirebaseImage()

  const handleAddNewUser = async (values) => {

    if(!isValid) return;

    try {
      const userNew = await createUserWithEmailAndPassword(auth,values.email,values.password)
      console.log(userNew)
      await setDoc(doc(db,"users",userNew?.user?.uid),{
        ...values,
        username: slugify(values.username || values.fullname,{lower : true,trim: true,replacement: ""}),
        status: Number(values.status),
        role: Number(values.role),
        avatar: urlImage,
        createAt: serverTimestamp()
      })
      toast.success(`Add new user with email ${values.email} successfully!`)
    } catch (error) {
      toast.error("Error!!")
    }finally {
      reset({
        fullname: "",
        username: "",
        email: "",
        password: "",
        status: userStatus.PENDING,
        role: userRole.USER,
        avatar: "",
        createdAt: new Date()
      })
    }

    
  }

  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewUser)}>
        <div className="w-[200px] h-[200px] mx-auto mb-10">
          <ImageUpload className="!rounded-full" name="image" progress={progress} image={urlImage} onChange={(e) => uploadImageStorage(e.target.files[0])} handleRemoveImage={handleRemoveImage}></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio name="status" control={control} value={userStatus.ACTIVE}>
                Active
              </Radio>
              <Radio name="status" control={control} value={userStatus.PENDING}>
                Pending
              </Radio>
              <Radio name="status" control={control} value={userStatus.BAN}>
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio name="role" control={control} value={userRole.ADMIN}>
                Admin
              </Radio>
              <Radio name="role" control={control} value={userRole.MOD}>
                Moderator
              </Radio>
              <Radio name="role" control={control} value={userRole.USER}>
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button kind="primary" className="mx-auto" width="250px" type="submit" isLoading={isSubmitting} disable={isSubmitting}>
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;

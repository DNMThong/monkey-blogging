import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "@firebase/firestore";
import { async } from "@firebase/util";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import Textarea from "components/textarea/Textarea";
import ImageUpload from "components/upload/ImageUpload";
import { auth, db } from "firebase-app/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useFirebaseImage from "hooks/useFirebaseImage";
import { rest } from "lodash";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
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

const UserUpdate = () => {
    const [param] = useSearchParams()
    const { control,handleSubmit,reset,setValue,formState : { isValid,isSubmitting } } = useForm({
    mode: "onChange",
    defaultValues: {
        fullname: "",
        username: "",
        email: "",
        password: "",
        status: userStatus.PENDING,
        role: userRole.USER,
        avatar: "",
        description: "",
        createdAt: new Date()
    },
    resolver: yupResolver(schema)
    });

    const { 
        urlImage,
        nameImage,
        progress,
        handleRemoveImage,
        uploadImageStorage,
        setUrlImage,
        setProgress,
        setNameImage
    } = useFirebaseImage()

    const userId = param.get("id")
    
    useEffect(() => {
        const userDoc = doc(db,"users",userId)

        getDoc(userDoc).then((item) => {
            const cloneUser = { ...item.data() }
            const arrayName = /\%2F(\S+)\?/gm.exec(cloneUser.avatar)
            reset(cloneUser)
            setUrlImage(cloneUser?.avatar)
            setNameImage(arrayName >= 2? arrayName[1] : "")
       })
    },[userId])
    console.log(isSubmitting)
    
    const handleUpdateUser = async (values) => {
        if(!isValid) return;
        const cloneValues = {...values}
        cloneValues.role = Number(values.role)
        const userDoc = doc(db,"users",userId)
        const updateUser = async () => {
            try {
                await updateDoc(userDoc,{
                    ...cloneValues,
                    avatar: urlImage
                })
                toast.success("Update success!")
            } catch (error) {
                toast.error("Error!!!!")
            }
        }
        updateUser()
    }

    const handleRemoveAvatar = async () => {
        const userDoc = doc(db,"users",userId)
        handleRemoveImage()
        await updateDoc(userDoc,{
            avatar: ""
        })
    }

    if(!userId) return null;

    return (
    <div>
        <DashboardHeading
        title="New user"
        desc="Add new user to system"
        ></DashboardHeading>
        <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[200px] h-[200px] mx-auto mb-10">
            <ImageUpload className="!rounded-full" name="image" progress={progress} image={urlImage} onChange={(e) => uploadImageStorage(e.target.files[0])} handleRemoveImage={handleRemoveAvatar}></ImageUpload>
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
        <div className="">
            <Field>
                <Label>Description</Label>
                <Textarea name="description" control={control}></Textarea>
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
            Update
        </Button>
        </form>
    </div>
    );
};

export default UserUpdate;

import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";

const CategoryAddNew = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 2,
      createdAt: Date.now()
    }
  });

  const handleAddNewCategory = async (values) => {
    if(!isValid) return;

    const cloneValues = {...values}
    cloneValues.slug = slugify(values.slug || values.name, { lower: true })
    cloneValues.status = Number(values.status)
    
    const colRef = collection(db,"categories")

    try {
      await addDoc(colRef,{
        ...cloneValues,
        createdAt: serverTimestamp()
      })
      toast.success("Add new category successfully!!!")
    } catch (error) {
      toast.error(error.message)
    }finally {
      reset({
        name: "",
        slug: "",
        status: 2,
        createdAt: Date.now()
      })
    }

  }



  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              type="input"
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              type="input"
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio name="status" control={control} value={categoryStatus.APPROVED}>
                Approved
              </Radio>
              <Radio name="status" control={control} value={categoryStatus.UNAPPROVED}>
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button type="submit" kind="primary" className="mx-auto" width="250px" disable={isSubmitting} isLoading={isSubmitting}>
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;

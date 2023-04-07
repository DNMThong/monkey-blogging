import { doc, getDoc, onSnapshot, updateDoc } from '@firebase/firestore';
import { wait } from '@testing-library/user-event/dist/utils';
import { Button } from 'components/button';
import { Radio } from 'components/checkbox';
import { Field, FieldCheckboxes } from 'components/field';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { db } from 'firebase-app/firebase-config';
import DashboardHeading from 'module/dashboard/DashboardHeading';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import { categoryStatus } from 'utils/constants';

const CategoryUpdate = () => {
    const [params] = useSearchParams();
    const categoryId = params.get("id");
    const navigate = useNavigate()
    
    const { control,handleSubmit,setValue, reset,formState: { isSubmitting,isValid } } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            slug: "",
            status: 2,
            createdAt: Date.now()
        }
    })

    useEffect(() => {
        const getCategory = async () => {
            const colRef = doc(db,"categories",categoryId)
            const categoryDoc = await getDoc(colRef)
            reset({
                ...categoryDoc.data()
            })
        }
        getCategory()
    },[categoryId])

    const handleUpdateCategory = async (values) => {
        if(!isValid) return;

        const colRef = doc(db,"categories",categoryId)
        try {
            await updateDoc(colRef, {
                name: values.name,
                slug: slugify(values.slug || values.name, { lower: true }),
                status: Number(values.status)
            });
            toast.success("Update category success!!!")
            navigate("/manage/category")
        } catch (error) {
            toast.error(error.message)
        }
    }

    if(!categoryId) return null;

    return (
        <div>
            <DashboardHeading title="Update category" desc={`update category id: ${categoryId}`}> </DashboardHeading>
            <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
                    Update category
                </Button>
            </form>

           
        </div>
    );
};

export default CategoryUpdate;
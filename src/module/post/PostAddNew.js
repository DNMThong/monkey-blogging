import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import { postStatus } from "utils/constants";
import ImageUpload from "components/upload/ImageUpload";
import useFirebaseImage from "hooks/useFirebaseImage";
import Toggle from "components/toggle/Toggle";
import { useEffect, useMemo, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "@firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { toast } from "react-toastify";
import { useAuth } from "contexts/auth-context";
import axios from "axios";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";

Quill.register("modules/imageUploader", ImageUploader);

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { userInfo } = useAuth()
  const [isLoading,setIsLoading] = useState(false)
  const [content,setContent] = useState("")


  const { control, watch, setValue,handleSubmit,reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      author: {},
      category: {},
      hot: false,
      image: ""
    },
  });

  const [categories,setCategories] = useState([])
  const [nameCategory,setNameCategory] = useState("")
  const [category,setCategory] = useState([])

  const { 
    urlImage,
    progress,
    handleRemoveImage,
    uploadImageStorage,
    setUrlImage,
    setProgress
  } = useFirebaseImage()

  
  const watchFeaturePost = watch("hot");


  const addPostHandler = async (values) => {
    setIsLoading(true)
    const cloneValues = {...values}
    cloneValues.slug = slugify(values.slug || values.title, { lower: true })
    cloneValues.status = Number(values.status)
    console.log(cloneValues)
    const colRef = collection(db,"posts")
    await addDoc(colRef,{
      ...cloneValues,
      image: urlImage,
      content,
      createdAt: serverTimestamp()
    })
    toast.success("Success")
    setIsLoading(false)
    reset({
      title: "",
      slug: "",
      status: 2,
      author: "",
      categoryId: "",
      hot: false,
      image: ""
    })
    setNameCategory("")
    setUrlImage(null)
    setProgress(0)
    setCategory("")
  }

  useEffect(() => {
    const categoriesRef = collection(db,"categories")
    const q = query(categoriesRef,where("status","==",1))
    
    getDocs(q).then((snapshot) => {
      const result = []
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setCategories(result)
    })
  },[])

  useEffect(() => {
    async function fetchUser() {
      const colRef = doc(db,"users",userInfo?.uid)
      const docUser =  await getDoc(colRef)
      setValue("author",{
        id: docUser.id,
        ...docUser.data()
      })
    }
    fetchUser()
  },[setValue, userInfo?.uid])

  const selectCategory = (item) => {
    setValue("category",{
      ...item
    })
    setNameCategory(item.name)
  }

  const modules = useMemo(() => (
    {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image']
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image",file);
          const response = await axios({
            method: "POST",
            url: "https://api.imgbb.com/1/upload?key=066d74bcbcfe18b19572fdd051302a52",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          console.log(response.data)
          return response.data.data.url;
        }
      }
    }
  ),[])
  
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              type="text"
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              type="text"
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <div className="h-[300px] w-full">
              <ImageUpload name="image" progress={progress} image={urlImage} onChange={(e) => uploadImageStorage(e.target.files[0])} handleRemoveImage={handleRemoveImage}></ImageUpload>
            </div>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select>{nameCategory || "Select category"}</Dropdown.Select>
              <Dropdown.List>
                {
                  categories.length > 0 &&
                  categories.map((item) => <Dropdown.Option key={item.id} onClick={() => selectCategory(item)}>{item.name}</Dropdown.Option>)
                }
              </Dropdown.List>
            </Dropdown>
            <div className="flex flex-wrap gap-4">
              {
                category.length > 0 &&
                category.map(item => <span key={item.id} className="py-2 px-4 rounded-lg bg-green-100 text-green-600 font-semibold">{item.name}</span>)
              }
            </div>
          </Field>
        </div>  
        <Field>
          <Label>Content</Label>
          <div className="entry-content">
            <ReactQuill modules={modules} theme="snow" value={content} onChange={setContent} />
          </div>
        </Field>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
              <Label>Status</Label>
              <FieldCheckboxes>
                <Radio
                  name="status"
                  control={control}
                  value={postStatus.APPROVED}
                >
                  Approved
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  value={postStatus.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  value={postStatus.REJECT}
                >
                  Reject
                </Radio>
              </FieldCheckboxes>
            </Field>
            <Field>
              <Label>Feature post</Label>
              <Toggle onClick={e => setValue("hot",!watchFeaturePost)} on={!!watchFeaturePost}></Toggle>
            </Field>
        </div>
       
        <Button isLoading={isLoading} type="submit" className="mx-auto" width="250px">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;

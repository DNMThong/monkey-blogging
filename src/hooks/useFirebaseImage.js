import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";


const useFirebaseImage = () => {

    const [urlImage,setUrlImage] = useState("")
    const [progress,setProgress] = useState(0)
    const [nameImage,setNameImage] = useState("")

   

    const uploadImageStorage = async (file) => {
        if(!file) return;
        const storage = getStorage();
       
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progressPrecent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progressPrecent)
    
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                  console.log("...")
            }
          }, 
      (error) => {
        console.log(error)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setUrlImage(downloadURL)
          setNameImage(file.name)
        });
      }
      );
    }

    const handleRemoveImage = () => {
      const storage = getStorage();
    
      // Create a reference to the file to delete
      const desertRef = ref(storage, `images/${nameImage}`);
    
      // Delete the file
      deleteObject(desertRef).then(() => {
        console.log("Successfully")
        setProgress(0)
        setNameImage("")
        setUrlImage("")
      }).catch((error) => {
        console.log("Failed")
      });
    }
    return {
        urlImage,
        nameImage,
        setUrlImage,
        progress,
        setProgress,
        handleRemoveImage,
        uploadImageStorage,
        setNameImage
    };
};

export default useFirebaseImage;
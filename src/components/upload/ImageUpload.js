import { LoadingSpinner } from 'components/loading';
import React from 'react';

const ImageUpload = ({ name, className, progress = 0,image,handleRemoveImage = () => {}, ...rest}) => {
    return (
        <label className={`relative w-full h-full bg-[#E7ECF3] cursor-pointer rounded-lg flex flex-col justify-center items-center gap-4 overflow-hidden ${className} group`}>
            <input type="file" className="hidden-input" name={name} {...rest}/>
            {
                progress === 0 && !image && 
                (<>
                    <div className="w-1/4 flex">
                        <img className="w-full h-full object-cover" src="../img-upload.png" alt="img-upload" />
                    </div>
                    <span className="font-bold text-lg">Choose photo</span>
                </>)
            }
            {
                image && 
                <div className="w-full h-full">
                    <img className="w-full h-full object-cover" src={image} alt="img-upload" />
                    <button 
                        type="button" 
                        className="w-12 h-12 rounded-full bg-white flex justify-center items-center absolute bottom-1/2 left-1/2 translate-y-1/2 -translate-x-1/2 invisible opacity-0 group-hover:opacity-100 group-hover:visible"
                        onClick={handleRemoveImage}
                    >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor" 
                        className="w-8 h-8 text-red-500">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" 
                                />
                    </svg>
                    </button>
                </div>
            }

            {
                !image &&
                <div className="absolute w-0 h-1 left-0 bottom-0 bg-green-400 transition-all"
                    style={{
                        width: `${Math.ceil(progress)}%`,
                    }}
                ></div>
            }
            {progress !== 0 && !image && (
                <LoadingSpinner size="50px" color="rgb(74,222,128)"></LoadingSpinner>
            )}
        </label>
    );
};

export default ImageUpload;
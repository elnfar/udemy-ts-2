'use client';


import Input from "@/app/(components)/Inputs/Input";
import ImageUpload from "@/app/(components)/Inputs/ImageUpload";
import { useRouter } from 'next/navigation'
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";


interface CourseProps {
    name?:string,
      imageSrc?:string
      author?:string
      price?:string,
      courseId?:string
      description?:string | null
  }

  interface InitalStateProps {
    name:string,
    imageSrc:string
    author:string
    price:string,
    description:string
}   

const initialState:InitalStateProps = {
    name:'',
    imageSrc:'',
    author:'',
    price: '',
    description:''
}

  
export default function UpdateCourseComponent({name,price,courseId,description,author,imageSrc}:CourseProps) {


    const [state,setState] = useState(initialState)
    const router = useRouter()


    function handleChange(event:ChangeEvent<HTMLInputElement> ) {
		setState({ ...state, [event.target.name]: event.target.value });
	}

    const setCustomValue = (id:any, value:any) => {
        setState((prevValues) => ({
          ...prevValues,
          [id]: value,
        }));
      };

      const onUpdate = (e:FormEvent) => {
        e.preventDefault();
    
        axios.put(`/api/course/${courseId}`,state)
        .then(() => {
          router.refresh();
        })
        .catch((error) => {
          throw new Error(error)
        })
        .finally(() => {
          router.push('/')
        })
      }
    

    

  return (
    <div>

          <div className='w-full flex flex-col justify-center items-center py-4'>
            <div className='p-4'>
                <img  src={imageSrc} alt="Image" className='max-w-[900px]  bg-gray-50 p-4 border-4 border-black' />
                <h1>{name}</h1>
                <p>{price}</p>
                <p>{author}</p>
                <p>{description}</p>
            </div>
        </div>
        <form onSubmit={onUpdate} className='w-[600px] h-[700px] mx-auto py-12'>


        <div>
            <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc',value)}/>
        </div>

        <div  className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
        <Input big placeholder='Course name' id='name' type='text' value={state.name} name='name' onChange={handleChange}/>
        <Input big placeholder='Authors' id='author' type='text' value={state.author} name='author' onChange={handleChange}/>
        <Input big placeholder='Description' id='description' type='text' value={state.description} name='description' onChange={handleChange}/>
        <Input big placeholder='Price' id='price' type='number' value={state.price} name='price' onChange={handleChange}/>
        <div> 
        </div>
        <button type='submit'>Submit</button>
        </div>

        </form>

    </div>
  )
}

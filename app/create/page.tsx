'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import Button from "../(components)/Button"
import Input from "../(components)/Inputs/Input"
import ImageUpload from "../(components)/Inputs/ImageUpload"
import axios from "axios"
import { useRouter } from "next/navigation"
import {CldVideoPlayer} from 'next-cloudinary'
import { toast } from "react-hot-toast"

interface InitialValue {
  name:string,
  imageSrc:string,
  author:string,
  price:number,
  videoSrc:string,
  description:string
}

const initialValue:InitialValue = {
  name:'',
  imageSrc:'',
  videoSrc:'',
  author:'',
  description:'',
  price:0
}

enum PATH {
    SPECS = 0,
    VIDEOS = 1,
}

export default function page() {

  const [state, setState] = useState(initialValue)
  const [loading,setLoading] = useState(false)
  const [path, setPath] = useState(PATH.SPECS);



  function handleChange(event:ChangeEvent<HTMLInputElement>) {
    setState({...state, [event.target.name]: event.target.value})
  }

  const setCustomValue = (id:any, value:any) => {
    setState((prevState) => ({
      ...prevState,
      [id] :value
    }))
  }


  const router = useRouter()

  const onSubmit = (e:FormEvent) => {

    setLoading(true)
    e.preventDefault();

    axios.post('/api/course', state)
    .then(() => {
      toast.success('Course created successfully')
      router.push('/')

    })
    .catch((err) => {
      throw new Error(err)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col h-[900px]">
        <form className="w-[600px] py-12 flex flex-col items-center gap-4" >


          <>
            <div className="w-[500px]">
                <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc',value)}/>
            </div>

            <div className="flex flex-col gap-2 py-4 w-full">
                <Input big placeholder="Course name " id="name" type="text" value={state.name} name="name" onChange={handleChange}/>
                <Input big placeholder='Authors' id='author' type='text' value={state.author} name='author' onChange={handleChange}/>
                <Input big placeholder='Description' id='description' type='text' value={state.description} name='description' onChange={handleChange}/>
                <Input big placeholder='Price' id='price' type='number' value={state.price} name='price' onChange={handleChange}/>
            </div>
          </>

        </form>

        <Button 
        label="Next"
        onClick={onSubmit}
        disabled={loading}
        />
      </div>
    </div>
  )
}

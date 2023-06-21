'use client'

import axios from "axios"
import { SafeUser,safeCourse } from "../types"
import Button from "../(components)/Button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FormEvent } from "react"

interface CourseCardProps {
    data:safeCourse;
    currentUser:SafeUser | null
}

export default function MyCourseClient({data}:CourseCardProps) {

    const router = useRouter();

    const onDelete = (e:FormEvent) => {
        e.preventDefault();
    
        axios.delete(`/api/course/${data.id}`)
        .then(() => {
          router.refresh();
        })
        .catch((error) => {
          throw new Error(error)
        })
      }
    
  return (
    <div className="w-[400px] h-[300px]">
        <div>
            <Image src={data.imageSrc} alt="Image" width={400} height={200} className="
              object-cover 
              group-hover:scale-110 
              transition
              h-[200px]
              w-[400px]
            "/>
        </div>


        <div  className="flex flex-col items-start gap-1">
            <div className="font-light flex items-center gap-8">
                <span>{data.name}</span>
            </div>


            <div className="w-full gap-2 flex">
                <Button type='submit' label="Delete" onClick={onDelete}/>
                <Button type='button' label="View" onClick={() => router.push(`/mycourses/${data.id}`)}/>

            </div>


        </div>

    </div>
  )
}

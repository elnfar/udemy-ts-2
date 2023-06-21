'use client'


import Image from "next/image"
import { SafeUser, safeCourse } from "../types"
import { useRouter } from "next/navigation";

interface CourseComponent {
    data:safeCourse,
    key:string,
    currentUser:SafeUser | null
}

export default function CourseComponent({data,key}:CourseComponent) {

    const router = useRouter();

  return (
    <div className="pt-4" key={key} onClick={() => router.push(`/course/${data.id}`)}>
        <div className="flex flex-col w-[300px] p-2 relative">
            <div className=" cursor-pointer hover:opacity-80">


                <div className="border-[4px] border-yellow-400 relative">
                        <Image width={200} height={200}  src={data.imageSrc} alt="Image"
                        className="object-cover w-[320px] h-[150px]"
                        />
                </div>

                <div className="p-1">
                    <h3 className="text-[16px]">{data.name}</h3>
                    <span className="text-gray-400 block text-[9px] font-normal">{data.author}</span>
                    <span>$ {data.price}</span>
                </div>

            </div>
        </div>
    </div>
  )
}

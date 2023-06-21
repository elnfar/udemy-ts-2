import CourseComponent from "../(components)/CourseComponent";
import getAllCourses from "../actions/getAllCourses"
import myUser from "../actions/getUser"

interface HomeProps {
    searchParams:string
}

export default async function page({searchParams}:HomeProps) {

    const courses = await getAllCourses(searchParams)
    const currentUser = await myUser();

  return (
    <div>

            <div className="p-12 flex gap-2 flex-wrap">
                    {courses.map((item:any) => (
                        <CourseComponent
                        key={item.id}
                        data={item}
                        />
                    ))}
            </div>

    </div>
  )
}

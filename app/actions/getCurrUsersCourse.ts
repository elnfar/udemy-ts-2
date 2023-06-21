import prisma from '../lib/prismadb'
import myUser from './getUser'


export default async function getCurrUsersCourse() {
    const user = await myUser();

    const courses = await prisma.course.findMany({
        where: {
            userId:user?.id
        },
        orderBy: {
            createdAt:'desc'
        }
    });


    const safeCourse = courses.map((course) => ({
        ...course,
        createdAt:course.createdAt.toDateString()
    }))

    return safeCourse

}
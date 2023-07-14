import { NextResponse } from 'next/server'
import prisma from '../../lib/prismadb'
import myUser from '@/app/actions/getUser'

export async function POST (request:Request) {
    const currentUser = await myUser();

    if(!currentUser) {
        return console.log('No permission, no user registered');
    } 

    const body = await request.json();

    const {
        name,
        author,
        imageSrc,
        videoSrc,
        description,
        price
    } = body

    const course = await prisma.course.create({
        data: {
            name,
            author,
            videoSrc,
            imageSrc,
            description,
            price,
            userId:currentUser.id
        }
    })

    return NextResponse.json(course)

}
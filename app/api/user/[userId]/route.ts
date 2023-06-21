
import prisma from '../../../lib/prismadb'
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import myUser from '@/app/actions/getUser'

interface IParams {
    userId?:string
}


export async function PUT( 
    request: Request, 
    {params}:{params:IParams}    
) {
    const {userId} = params
    const json = await request.json()
    const {
        name,
        email,
        password
    } = json
    const currentUser = await myUser()


    if(!currentUser) {
        return NextResponse.error()
    }

    if(!userId || typeof userId !== 'string') {
        throw new Error('Invalid Id')
    }

    const hashedPasswordupdated = await bcrypt.hash(password, 12);

    const updated = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name,
            email,
            hashedPassword:hashedPasswordupdated
        }
    })

    return NextResponse.json(updated)

}
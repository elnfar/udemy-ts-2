import prisma from '../lib/prismadb';
import myUser from './getUser';


export default async function getBasketItems() {
    try {
        const currentUser = await myUser();
        if(!currentUser) {
            return []
        }

        const basket = await prisma.course.findMany({
            where: {
                id: {
                    in:[...(currentUser.basketIds || [] )]
                }
            }
        });

        const safeBaskets = basket.map((basket) => ({
            ...basket,
            createdAt:basket.createdAt.toISOString()
        }))
        return safeBaskets
    }catch(error:any) {
        throw new Error(error)
    }
}
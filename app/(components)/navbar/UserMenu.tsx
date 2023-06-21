import { SafeUser } from "@/app/types"
import { User } from "@/app/constants"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signOut } from "next-auth/react"

interface UserMenuProps {
    currentUser: SafeUser | null
    closeUserMenu: () => void
}

export default function UserMenu({currentUser,closeUserMenu}:UserMenuProps) {
    const router = useRouter()

  return (
    <div className="
    flex flex-col h-[50vh] bg-white shadow-lg right-0 rounded-lg px-4 py-2 gap-6
    ">
        <div className="flex items-center gap-4">

                    <div className="w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center text-white cursor-pointer" onClick={() => router.push('/user')}>
                                <span>{currentUser?.name?.at(0)?.toUpperCase()}</span>
                                <span>{currentUser?.name?.at(1)?.toUpperCase()}</span>
                    </div>

                    <div className="flex flex-col">
                        <span>{currentUser?.name}</span>
                        <span className="text-gray-400">{currentUser?.email}</span>
                    </div>
                
        </div>

        <div className="flex flex-col gap-3 font-light">
            {User.map((item) => (
                <div key={item.name} onClick={closeUserMenu}>
                    <Link href={item.link}>{item.name}</Link>
                </div>
            ))}
        </div>

        <div className="border-black border-[1px] py-2 px-2 mt-auto">
           <button onClick={() => signOut()}>Sign out</button>
        </div>
    </div>
  )
}

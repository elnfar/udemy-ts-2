'use client';

import Link from "next/link";
import Input from "../(components)/Inputs/Input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FormEvent, useState } from "react";


interface InitialStateProps {
    name:string,
    email:string,
    password:string
}

const initialState:InitialStateProps = {
    name:'',
    email:'',
    password:''
}


interface ProfileProps {
    userId?:string | null,
    name?:string | null,
    email?:string | null

}


export default function ProfileComponent({userId,name,email}:ProfileProps) {

    const router = useRouter()
    const [state,setState] = useState(initialState)


    function handleChange(event:any) {
		setState({ ...state, [event.target.name]: event.target.value });
        console.log(event.target.value)
	}


    const onSubmit = (event:FormEvent) => {

        event.preventDefault()

        axios.put(`/api/user/${userId}`,{
          ...state,
          hashedPassword:state.password
        })
        .catch((err:any) => {
            throw new Error(err)
        })
        .finally(() => {
            router.refresh()
        })
        router.push('/')
    }
    
  return (
    <div>
        <h1>{name}</h1>
        <h3>{email}</h3>
        <div>
            <div>
            <form onSubmit={onSubmit} className='text-center'>
                <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
                <Input placeholder='Name' id='name' type='text' name='name' onChange={handleChange} value={state.name}/>
                <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={state.email}/>
                <Input placeholder='Password' id='password' type='password' name='password' onChange={handleChange} value={state.password}/>
                <button type='submit'>Submit</button>
                </div>

                    <div>
                    <div>Do you have an account ? <Link href='/login'>Sign in</Link></div>
                    </div>
                 </form>
            </div>
        </div>
    </div>
  )
}

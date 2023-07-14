'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from '../(components)/Inputs/Input'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '../(components)/Button'
import { toast } from 'react-hot-toast'


interface InitialStateProps {
    email:string,
    password:string
}

const initialState:InitialStateProps = {
    email:'',
    password:''
}

export default function page() {
    const [state,setState] = useState(initialState)
    const router = useRouter();
    const [loading,setLoading] = useState(false)

    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        setState({...state, [event.target.name]: event.target.value})
    }

    function onSubmit(event:FormEvent) {
        event.preventDefault();

        setLoading(true)

        signIn('credentials', {
            ...state,
            redirect:false
        })
        .then((callback) => {
            if(callback?.ok) {
                toast.success("Logged In")
                router.push('/');
                router.refresh()
            }
            
            if(callback?.error) {
                throw new Error('Wrong Credentials')
            }
        }).catch((err) => {
            throw new Error(err)
        }).finally(() => {
            setLoading(false)
        })

     
    }

  return (
    <form onSubmit={onSubmit} className='text-center'>
        <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
        <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={state.email}/>
        <Input placeholder='Password' id='password' type='password' name='password' onChange={handleChange} value={state.password}/>

        <Button disabled={loading} type='submit' label='Submit'/>
        </div>

        <div>
            <div>Haven't got an account ? <Link href='/register'>Sign up</Link></div>
        </div>
    </form>
  )
}

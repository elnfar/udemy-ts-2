'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from '../(components)/Inputs/Input'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


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

    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        setState({...state, [event.target.name]: event.target.value})
    }

    function onSubmit(event:FormEvent) {
        event.preventDefault();

        signIn('credentials', {
            ...state,
            redirect:false
        })
        .then((callback) => {
            if(callback?.ok) {
                router.refresh()
            }
            if(callback?.error) {
                throw new Error('Wrong Credentials')
            }
        })

        router.push('/');
    }

  return (
    <form onSubmit={onSubmit} className='text-center'>
        <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
        <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={state.email}/>
        <Input placeholder='Password' id='password' type='password' name='password' onChange={handleChange} value={state.password}/>

        <button type='submit'>Submit</button>
        </div>

        <div>
            <div>Haven't got an account ? <Link href='/register'>Sign up</Link></div>
        </div>
    </form>
  )
}

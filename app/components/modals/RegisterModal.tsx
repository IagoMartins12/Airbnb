'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { 
    FieldValues, 
    SubmitHandler,
    useForm 
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = ( ) => {
    const registerModal = useRegisterModal( )
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading ] = useState(false)

    const {
        register,
        handleSubmit, 
        formState: {
            errors,
        }
    } = useForm<FieldValues> ({
        defaultValues: {
            name: '',
            email: '', 
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = ( data ) => {
        setIsLoading(true)

        axios.post('/api/register', data)
        .then(( ) =>{
            toast.success('Conta criada com sucesso')
            loginModal.onOpen()
            registerModal.onClose()
        }).catch(( error ) => {
            toast.error("Algo deu errado, tente novamente :( ")
        }).finally(( ) => {
            setIsLoading(false)
        })
    }

    const toggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Seja bem-vindo ao Airbnb'
                subtitle='Crie sua conta!'
            /> 
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            /> 
             <Input
                id='name'
                label='Nome'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
             <Input
                id='password'
                type='password'
                label='Senha'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            /> 
        </div>
    )
    
    const footerContent = ( 
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label='Continue com Google'
                icon={FcGoogle}
                onClick={( ) => { signIn('google')}}
            />
            <Button 
                outline
                label='Continue com GitHub'
                icon={AiFillGithub}
                onClick={( ) => { signIn('github')}}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Ja possui conta?
                    </div>
                    <div 
                    onClick={toggle}
                    className='text-neutral-800 cursor-pointer hover:underline'>
                        Faça o login
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <div>
            <Modal 
                disabled={isLoading}
                isOpen= {registerModal.isOpen}
                title='Se cadastre'
                actionLabel='Continue'
                onClose={registerModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
                footer={footerContent}
            /> 
        </div>
    )
}

export default RegisterModal
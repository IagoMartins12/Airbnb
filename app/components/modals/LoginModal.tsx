'use client';

import { signIn } from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { 
    FieldValues, 
    SubmitHandler,
    useForm 
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const LoginModal = ( ) => {
    const router = useRouter()

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
            email: '', 
            password: ''
        }
    })

    //Quando submeter o form irá chamar esta função
    const onSubmit: SubmitHandler<FieldValues> = ( data ) => {
        setIsLoading(true)

        //Função de login utilizando o signIn do next. Ele irá bater no arquivo [..nextauth] e irá enviar desconstruir o data que iremos receber da api, 
        //logo em seguida irá enviar para a CredentialsProvider que irá utilizar a função authorize la 
        signIn('credentials', {
            ...data,
            redirect: false
        }).then (( callback => {
            setIsLoading(false)

            if (callback?.ok) {
                toast.success('Login feito com sucesso!')
                router.refresh()
                loginModal.onClose()
            }

            if (callback?.error) {
                toast.error("Opss! Ocorreu um erro ao realizar o login, tente novamente.")
            }
            }
        ))
    }

    const toggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Seja bem-vindo de volta'
                subtitle='Faça o login para acessar sua conta!'
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
                onClick={( ) => signIn('github')}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Primeira vez usando Airbnb?
                    </div>
                    <div 
                    onClick= { toggle}
                    className='text-neutral-800 cursor-pointer hover:underline'>
                        Se cadastre
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <div>
            <Modal 
                disabled={isLoading}
                isOpen= {loginModal.isOpen}
                title='Login'
                actionLabel='Continue'
                onClose={loginModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
                footer={footerContent}
            /> 
        </div>
    )
}

export default LoginModal
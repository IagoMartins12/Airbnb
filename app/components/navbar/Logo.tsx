'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Logo = () => {
    const router = useRouter()
    const [logoMobile, setLogoMobile] = useState(false)

    const handleResize = () => {
        if (window.innerWidth > 710 ) {
            setLogoMobile(false)
        } else {
            setLogoMobile(true)
        }
    };

    useEffect(( ) => {
        handleResize()
        window.addEventListener("resize", handleResize);
    }, [])
    
    return (
        !logoMobile ? (
        <Image
            onClick={() => router.push('/')}
            alt='logo'
            className='md:block cursor-pointer'
            height='100'
            width='100'
            src='/images/logo.png'/>
        ) : (
        <Image
            onClick={() => router.push('/')}
            alt='logo'
            className='block cursor-pointer'
            height='60'
            width='60'
            src='/images/logo-mobile.png'/>
        )
    )
}

export default Logo
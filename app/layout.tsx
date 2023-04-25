import './globals.css'
import { Nunito } from "next/font/google"

import ClientOnly from './components/ClientOnly'

import RegisterModal from './components/modals/RegisterModal'
import RentModal from './components/modals/RentModal'
import LoginModal from './components/modals/loginModal'

import Navbar from './components/navbar/Navbar'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'

export const metadata = {
  title: 'Airbnb | Iago Martins',
  description: 'Airbnb Clone',
}

const font = Nunito ({
  subsets: ['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //Capturando o usuario atual
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <RegisterModal/>
          <LoginModal />
          <Navbar currentUser = {currentUser} />
        </ClientOnly>
        {children}
        </body>
    </html>
  )
}

"use client"

import { print } from '@/utils/toast'
import { Footer } from './conponents/Footer'
import { Header } from './conponents/Header'
export default function Home() {

  const notify = () => {
    print('Hello World', 'success')
  }

  return <>
    <div className='flex flex-col min-h-screen'>
      <Header />

      {/* <button onClick={notify}>Click Me!!</button> */}
      <Footer />
    </div>
  </>
}
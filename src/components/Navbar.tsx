import type { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Carattere } from 'next/font/google'
import { useState } from "react";

const carattere = Carattere({ weight: "400", subsets: ['latin'] })
const linkArr = ['dashboard', 'Forum', 'Blog']
export default function NavBar() {
  const [DropdownOpen, setDropdownOpen] = useState(false)

  const { data } = useSession()

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 items-center align-middle flex">
        <div className="flex items-center ml-5">

          <Title />
        </div>
        <div className="p-2 flex flex-row max-w-screen-xl mx-auto justify-between md:justify-start">
          <div className="flex items-center justify-center space-x-3 md:mx-32">
            <Links />
          </div>
        </div>
        <div className="flex items-center mr-5">
          {data ? <><Profile Session={data} isOpen={DropdownOpen} setOpen={setDropdownOpen} /></> : <h1><button onClick={() => signIn()} className="text-white">Sign In</button></h1>}
        </div>
      </nav >
      <Dropdown isOpen={DropdownOpen} setOpen={setDropdownOpen} />
    </>

  )
}

function Dropdown({ isOpen, setOpen }: { isOpen: boolean, setOpen: (isOpen: boolean) => void }) {
  return (
    <div className={`w-full md:w-44 ${isOpen ? 'block' : 'hidden'}`}>
      <ul className="list-none">
        {linkArr.map((v) =>
          <li key={v}>
            <Link
              href={`/${v}`}
              className=""
            >
              {v}
            </Link>
          </li>)}
      </ul>
    </div>
  )
}

function Profile(props: { Session: Session, isOpen: boolean, setOpen: (isOpen: boolean) => void }) {
  return (
    <button className="flex items-center order-3 m-2 rounded-full" role="button" onClick={() => props.setOpen(!props.isOpen)}>
      <Image src={props.Session.user?.image ?? ''} alt="profile image" width={32} height={32} className="rounded-full md:w-12 md:h-12 w-8 h-8" />
      <span className="text-white text-xl hidden md:block m-2">{props.Session.user?.name}</span>
    </button>
  )
}

function Title() {
  return (
    <Link href={"/"} className="flex items-start order-1 space-x-3">
      <span className={`text-4xl font-bold p-2 text-white self-center hidden lg:block ${carattere.className}`}>Tv4 | 4Justice</span>
      <span className={`text-4xl font-bold p-2 text-white self-center block lg:hidden ${carattere.className}`}>Tv4</span>
    </Link>
  )
}

function Links() {

  return (
    <div className="items-center justify-center align-middle md:flex text-xl hidden order-2 space-x-3">
      <ul className="flex flex-row">
        {linkArr.map((v) =>
          <li key={v}>
            <Link
              href={`/${v}`}
              className="text-white m-2"
            >
              {v}
            </Link>
          </li>)}
      </ul>
    </div>
  )
}
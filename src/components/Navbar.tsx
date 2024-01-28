import type { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Carattere } from 'next/font/google'
import { useState } from "react";

const carattere = Carattere({ weight: "400", subsets: ['latin'] })
const linkArr = ['dashboard', 'Forum', 'Blog']
export default function NavBar() {
  const [ProfileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [LinksDropdownOpen, setLinksDropdownOpen] = useState(false)

  const { data } = useSession()

  return (
    <div className="md:flex md:flex-col">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 items-center align-middle flex">
        <div className="flex items-center ml-5">

          <Title />
        </div>
        <div className="p-2 flex flex-row ml-auto justify-between md:justify-start">
          <div className="flex items-center justify-center md:mr-8">
            <Links />
          </div>
        </div>
        <div className="flex items-center mr-5">
          {data ? <><Profile Session={data} isOpen={ProfileDropdownOpen} setOpen={setProfileDropdownOpen} setOtherOpen={setLinksDropdownOpen} /></> : <h1><button onClick={() => signIn()} className="text-white">Sign In</button></h1>}
          <button className="md:hidden block order-4" onClick={() => { setLinksDropdownOpen(!LinksDropdownOpen); setProfileDropdownOpen(false) }}><Hamburger /></button>
        </div>
      </nav >
      <ProfileDropdown isOpen={ProfileDropdownOpen} setOpen={setProfileDropdownOpen} />
      <Dropdown isOpen={LinksDropdownOpen} setOpen={setLinksDropdownOpen} />
    </div>

  )
}

function ProfileDropdown({
  isOpen,
  setOpen
}: {
  isOpen: boolean,
  setOpen: (isOpen: boolean) => void
}) {
  return (
    <div className={`w-full md:w-fit md:absolute md:top-16 md:right-8 md:p-2 md:rounded-xl md:border-solid md:border-2 ${isOpen ? 'block' : 'hidden'}  bg-gray-900`}>
      <div className="flex flex-col text-white p-2">
        <Link href={"/profile"} >Profile</Link>
        <div className="md:border-t-2 text-red-600" onClick={() => signOut()}>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      </div>
    </div >
  )
}


function Dropdown({
  isOpen,
  setOpen
}: {
  isOpen: boolean,
  setOpen: (isOpen: boolean) => void
}) {
  return (
    <div className={`w-full md:w-fit md:absolute md:top-16 md:right-8 md:p-2 md:rounded-xl md:border-solid md:border-2 ${isOpen ? 'block' : 'hidden'}  bg-gray-900`}>
      <ul className="flex flex-col text-white p-2">
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

function Profile(props: {
  Session: Session,
  isOpen: boolean,
  setOpen: (isOpen: boolean) => void,
  setOtherOpen: (isOpen: boolean) => void
}) {
  return (
    <button className="flex items-center order-3 m-2 rounded-full" role="button" onClick={() => { props.setOpen(!props.isOpen); props.setOtherOpen(false) }}>
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

function Hamburger() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-list" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
    </svg>
  )
}
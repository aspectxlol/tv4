import type { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";


export default function NavBar() {
  const { data } = useSession()

  return (
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
        {data ? <Profile Session={data} /> : <h1><button onClick={() => signIn()} className="text-white">Sign In</button></h1>}
      </div>
    </nav >
  )
}

function Profile(props: { Session: Session }) {
  return (
    <button className="flex items-center order-3 m-2 hover:ring-4 hover:ring-gray-600 rounded-full focus:ring-4 focus:ring-gray-600 ring-opacity-100" role="button">
      <Image src={props.Session.user?.image ?? ''} alt="profile image" width={50} height={50} className="rounded-full md:w-16 md:h-16 w-10 h-10" />
      <span className="text-white text-xl hidden md:block m-2">{props.Session.user?.name}</span>
    </button>
  )
}

function Title() {
  return (
    <Link href={"/"} className="flex items-start order-1 space-x-3">
      <span className="text-xl font-semibold p-2 text-white self-center hidden md:block">Tv4</span>
      <span className="text-xl font-semibold p-2 text-white self-center block md:hidden">Tv4</span>
    </Link>
  )
}

function Links() {
  const linkArr = ['dashboard', 'Forum', 'Blog']

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
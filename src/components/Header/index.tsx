import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"

interface HeaderProps {
  searchValue: string
  pokemon: number | string
  onClick: (event: React.MouseEvent<Element, MouseEvent>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Header = ({ onChange, searchValue, onClick, pokemon }: HeaderProps) => {
  const router = useRouter()

  return (
    <header className="text-gray-100 bg-gray-900 shadow w-full sticky top-0">
      <div className="container mx-auto flex p-5 items-center">
        <nav className="flex w-1/5 items-center">
          <Link href="/">
            <a>
              <Image src="/logo.png" alt="Pokemon" width={128} height={48} />
            </a>
          </Link>
        </nav>
        <div className="flex w-3/5 items-center items-center justify-center mb-4 md:mb-0">
          <input
            className="w-full p-2 rounded-lg border border-gray-300 text-black"
            placeholder="Search for your Pokemon"
            onChange={onChange}
            value={searchValue}
          />
        </div>
        <div className="w-1/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          <button
            className="bg-red-500 hover:bg-red-300 disabled:opacity-50 text-white ml-4 py-2 px-3 rounded-lg"
            onClick={onClick}
            disabled={!pokemon}
          >
            Search
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

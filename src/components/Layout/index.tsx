import React from "react"
import Head from "next/head"

import Header from "../Header"

interface LayoutProps {
  title: string
  children: React.ReactNode
  searchValue: string
  pokemon: number | string
  onClick: (event: React.MouseEvent<Element, MouseEvent>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Layout = ({
  title,
  children,
  searchValue,
  onChange,
  onClick,
  pokemon,
}: LayoutProps) => {
  return (
    <div className="bg-gray-800">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        searchValue={searchValue}
        onChange={onChange}
        onClick={onClick}
        pokemon={pokemon}
      />
      <main className="container mx-auto px-5 pt-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default Layout

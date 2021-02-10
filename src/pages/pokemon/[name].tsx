import React from "react"
import Link from "next/link"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

import Layout from "../../components/Layout"

export default function Pokemon({ pokemon }) {
  const [search, setSearch] = React.useState("")
  const router = useRouter()

  const handleSearch = React.useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    router.push(`/pokemon/${pokemon?.name}`)
  }

  return (
    <Layout
      title={pokemon.name}
      searchValue={search}
      onChange={handleSearch}
      onClick={handleClick}
      pokemon={pokemon?.name}
    >
      <h1 className="text-4xl mb-2 text-white text-center capitalize">
        {pokemon.name}
      </h1>
      <div className="flex flex-col items-center justify-around">
        <div className="flex">
          <img
            className="mx-auto w-20 h-20"
            src={pokemon.image}
            alt={pokemon.name}
          />
          <img
            className="mx-auto w-20 h-20"
            src={pokemon?.sprites?.front_shiny}
            alt={`${pokemon.name} Shiny`}
          />
        </div>

        <p className="font-bold mr-2 text-white mb-2">
          Pokedex number: {pokemon.id}
        </p>
        <p className="text-white mb-2">Name: {pokemon.name}</p>
        <p className="text-white mb-2">Height: {pokemon.height}</p>
        <p className="text-white mb-2">Weight: {pokemon.weight}</p>
        <p className="flex text-white mb-2">
          Types:
          {pokemon?.types.map((typeItem, index) => (
            <span
              className="text-sm font-medium bg-green-100 py-1 px-2 rounded text-green-500 align-middle ml-2 mr-1"
              key={`${typeItem.type.name}${index}`}
            >
              {typeItem.type.name}
            </span>
          ))}
        </p>
      </div>

      <p className="mt-10 text-center">
        <Link href="/">
          <a className="text-2xl text-white underline">See all pokemons</a>
        </Link>
      </p>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const param = query.id || query.name
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${param}`)
    const pokemon = await res.json()
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`
    pokemon.image = image

    return {
      props: { pokemon },
    }
  } catch (err) {
    console.log(err)
  }
}

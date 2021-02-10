import React from "react"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"
import useSWR from "swr"

import Layout from "../components/Layout"
import { Pokemon } from "../utils/interfaces"

const API_URL = "https://pokeapi.co/api/v2/pokemon/"

const Home = ({ pokemons }) => {
  const [pokemon, setPokemon] = React.useState((): Pokemon => ({}))
  const [search, setSearch] = React.useState("")
  const { data: response } = useSWR(`${API_URL}${search}`, axios, {
    revalidateOnFocus: false,
  })
  const router = useRouter()

  React.useEffect(() => {
    if (response?.data?.id) {
      setPokemon({ ...response?.data })
    }
  }, [response?.data])

  const handleSearch = React.useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    router.push(`/pokemon/${pokemon?.name}`)
  }

  return (
    <Layout
      title="Pokedex Challenge"
      searchValue={search}
      onChange={handleSearch}
      onClick={handleClick}
      pokemon={pokemon?.name}
    >
      <h1 className="text-4xl text-white mb-8 text-center ">
        Pokemon Challenge
      </h1>
      <ul className="flex flex-wrap -m-4 text-center">
        {pokemons.map((pokemon, index) => (
          <li className="p-4 md:w-1/4 sm:w-1/2 w-full" key={index}>
            <Link href={`/pokemon/${pokemon?.name}`}>
              <a className="border p-4 border-gray my-2 capitalize flex flex-col items-center text-lg bg-gray-100 rounded-md transform transition duration-500 hover:scale-110">
                <img
                  className="w-20 h-20 mr-3"
                  src={pokemon.image}
                  alt={pokemon.name}
                />

                <p>
                  Pokedex number:
                  <span className="mr-2 font-bold"> #{index + 1}</span>
                </p>
                {pokemon.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const res = await fetch(`${API_URL}?limit=800`)
    const { results } = await res.json()
    const pokemons = results.map((result, index) => {
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        index + 1
      }.png`
      return {
        ...result,
        image,
      }
    })
    return {
      props: { pokemons },
    }
  } catch (err) {
    console.log(err)
  }
}

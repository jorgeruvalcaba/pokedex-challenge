import { render, screen } from "@testing-library/react"

import Home from "../../pages/index"
import PokemonDetails from "../../pages/pokemon/[name]"
import { POKEMON_EXAMPLE } from "../../utils/constants"

const pokemonList = [POKEMON_EXAMPLE]

describe("Home", () => {
  it("renders home page without crashing", () => {
    render(<Home pokemons={pokemonList} />)
    expect(
      screen.getByRole("heading", { name: "Pokemon Challenge" })
    ).toBeInTheDocument()
  })

  it("renders pokemon details page without crashing", () => {
    render(<PokemonDetails pokemon={POKEMON_EXAMPLE} />)
    expect(
      screen.getByRole("heading", { name: "bulbasaur" })
    ).toBeInTheDocument()
  })
})

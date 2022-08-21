// Simple Data-fetching = Error boundary
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
// 🐨 you'll also need to get the fetchPokemon function from ../pokemon:
import {PokemonDataView, fetchPokemon, PokemonErrorBoundary} from '../pokemon'

function createResource(promise) {
  let status = 'pending'
  let result = promise.then(
    resolved => {
      status = 'resolved'
      result = resolved
    },
    rejected => {
      status = 'rejected'
      result = rejected
    },
  )
  return {
    read() {
      if (status === 'pending') throw result
      if (status === 'rejected') throw result
      if (status === 'resolved') throw result
      throw new Error('This should be impossible')
    },
  }
}

const pokemonResource = createResource(fetchPokemon('pikachu'))
function PokemonInfo() {
  const pokemon = pokemonResource.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <PokemonErrorBoundary>
          <React.Suspense fallback={<div>Loading ...</div>}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App

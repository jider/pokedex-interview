export const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2";
export const POKEMON_API_POKEMON_URL = `${POKEMON_API_BASE_URL}/pokemon`;
export const POKEMON_API_POKEMON_TYPE_URL = `${POKEMON_API_BASE_URL}/type`;
export const POKEMON_API_DEFAULT_LIMIT = 20
export const POKEMON_API_NO_LIMIT = 100000
export const POKEMON_IMAGE_DEFAULT_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'
export const POKEMON_IMAGE_ARTWORK_URL = `${POKEMON_IMAGE_DEFAULT_URL}/other/official-artwork`
export const POKEMON_IMAGE_DEFAULT_EXTENSION = '.png'

export const QUERY_KEYS = {
  identities: 'pokemon-identities',
  pokedex: 'pokedex',
  pokemon: 'pokemon',
  fav: 'favorites',
}

export const POKEMON_TYPES_MAP = [
  {
    "name": "normal",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/1/`
  },
  {
    "name": "fighting",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/2/`
  },
  {
    "name": "flying",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/3/`
  },
  {
    "name": "poison",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/4/`
  },
  {
    "name": "ground",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/5/`
  },
  {
    "name": "rock",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/6/`
  },
  {
    "name": "bug",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/7/`
  },
  {
    "name": "ghost",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/8/`
  },
  {
    "name": "steel",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/9/`
  },
  {
    "name": "fire",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/10/`
  },
  {
    "name": "water",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/11/`
  },
  {
    "name": "grass",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/12/`
  },
  {
    "name": "electric",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/13/`
  },
  {
    "name": "psychic",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/14/`
  },
  {
    "name": "ice",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/15/`
  },
  {
    "name": "dragon",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/16/`
  },
  {
    "name": "dark",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/17/`
  },
  {
    "name": "fairy",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/18/`
  },
  {
    "name": "stellar",
    "url": `${POKEMON_API_POKEMON_TYPE_URL}/19/`
  }
]

export const ERROR_MESSAGES = {
  details: 'There was an error retrieving the Pokemon details',
  list: 'There was a problem loading the pokemons!',
  pokedex: 'There was an error loading the Pokedex pokemons',
  signIn: 'Email and/or password are not correct!',
  signUp: 'The Email address is already in use!'
}

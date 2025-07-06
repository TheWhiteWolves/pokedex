import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      return cached;
    }

    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const locations: ShallowLocations = await resp.json();
      this.cache.add(url, locations);
      return locations;
    } catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);
    if (cached) {
      return cached;
    }

    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const location: Location = await resp.json();
      this.cache.add(url, location);
      return location;
    } catch (e) {
      throw new Error(
        `Error fetching location '${locationName}': ${(e as Error).message}`,
      );
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    
    const cached = this.cache.get<Pokemon>(url);
    if (cached) {
      return cached;
    }

    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const pokemon: Pokemon = await resp.json();
      this.cache.add(url, pokemon);
      return pokemon;
    } catch (e) {
      throw new Error(
        `Error fetching pokemon '${pokemonName}': ${(e as Error).message}`,
      );
    }
  }
}

export type NamedAPIResource = {
  name: string;
  url: string;
};

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: NamedAPIResource;
    version_details: {
      rate: number;
      version: NamedAPIResource;
    }[];
  }[];
  game_index: number;
  id: number;
  location: NamedAPIResource;
  name: string;
  names: {
    language: NamedAPIResource;
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: NamedAPIResource;
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: NamedAPIResource;
        min_level: number;
      }[];
      max_chance: number;
      version: NamedAPIResource;
    }[];
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
  }[];
  forms: NamedAPIResource[];
  game_indices: {
    game_index: number;
    version: NamedAPIResource;
  }[];
  held_items: {
    item: NamedAPIResource;
    version_details: {
      version: NamedAPIResource;
      rarity: number;
    };
  }[];
  location_area_encounters: string;
  moves: {
    move: NamedAPIResource;
    version_group_details: {
      move_learn_method: NamedAPIResource;
      version_group: NamedAPIResource;
      level_learned_at: number;
      order: number;
    }[];
  }[];
  past_types: {
    generation: NamedAPIResource;
    types: {
      slot: number;
      type: NamedAPIResource;
    }
  }[];
  past_abilities: {
    generation: NamedAPIResource;
    abilities: {
      is_hidden: boolean;
      slot: number;
      ability: NamedAPIResource;
    };
  };
  sprites: {
    front_default: string;
    front_shiny: string;
    front_female?: string;
    front_shiny_female?: string;
    back_default: string;
    back_shiny: string;
    back_female?: string;
    back_shiny_female?: string;
  };
  cries: {
    latest: string;
    legacy: string;
  };
  species: NamedAPIResource;
  stats: {
    stat: NamedAPIResource;
    effort: number;
    base_stat: number;
  }[];
  types: {
    slot: number;
    type: NamedAPIResource;
  }[];
};
export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tag?: string;
  type: 'criatura' | 'classe' | 'reino' | 'magia' | 'arma';
}

export interface BestiaryCreature {
  id: string;
  name: string;
  level: 'comum' | 'incomum' | 'raro' | 'épico' | 'lendário';
  imageUrl: string;
  description: string;
  weaknesses: string[];
  tactics: string[];
  xp: number;
}

export interface Treasure {
  id: string;
  name: string;
  rarity: 'comum' | 'incomum' | 'raro' | 'épico' | 'lendário';
  imageUrl: string;
  description: string;
  power: string;
  origin: string;
}

export interface Region {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  description: string;
  inhabitants: string[];
}

export interface Deity {
  id: string;
  name: string;
  domain: string;
  imageUrl: string;
  description: string;
  alignment: string;
}

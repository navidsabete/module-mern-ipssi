export enum StyleMusical {
  ROCK = "ROCK",
  POP = "POP",
  ELECTRO = "ELECTRO",
  HIPHOP = "HIPHOP",
}

export interface Chanson {
  titre: string;
  artiste: string;
  duree: number; // en secondes
  style: StyleMusical;
}


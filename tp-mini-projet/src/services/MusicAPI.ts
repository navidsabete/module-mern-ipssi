import type { Chanson } from "../models/Types";
import { StyleMusical } from "../models/Types";

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const fakeCatalogue: ReadonlyArray<Chanson> = [
  { titre: "One More Time", artiste: "Daft Punk", duree: 320, style: StyleMusical.ELECTRO },
  { titre: "Harder, Better, Faster, Stronger", artiste: "Daft Punk", duree: 224, style: StyleMusical.ELECTRO },
  { titre: "Lose Yourself", artiste: "Eminem", duree: 326, style: StyleMusical.HIPHOP },
  { titre: "Bohemian Rhapsody", artiste: "Queen", duree: 354, style: StyleMusical.ROCK },
  { titre: "Blinding Lights", artiste: "The Weeknd", duree: 200, style: StyleMusical.POP },
];

export async function rechercherTitres(requete: string): Promise<Chanson[]> {
  const normalized = requete.trim();
  if (normalized.length === 0) {
    return Promise.reject(new Error("Recherche vide interdite"));
  }

  console.log("Recherche en cours sur le serveur...");
  await sleep(2000);

  const q = normalized.toLowerCase();
  const matches = fakeCatalogue.filter(
    (c) => c.artiste.toLowerCase().includes(q) || c.titre.toLowerCase().includes(q),
  );

  if (matches.length >= 2) return matches.slice(0, 3);

  const fallback: Chanson[] = [
    { titre: `Résultat pour "${normalized}" #1`, artiste: "Artiste Inconnu", duree: 215, style: StyleMusical.POP },
    { titre: `Résultat pour "${normalized}" #2`, artiste: "Artiste Inconnu", duree: 189, style: StyleMusical.ROCK },
  ];
  return [...matches, ...fallback].slice(0, 3);
}


import type { Chanson } from "./Types";
import { StyleMusical } from "./Types";

export class Playlist {
  public nom: string;
  #titres: Chanson[];

  public constructor(nom: string) {
    this.nom = nom;
    this.#titres = [];
  }

  public ajouter(chanson: Chanson): void {
    this.#titres.push(chanson);
  }

  public retirer(index: number): void {
    if (index < 0 || index >= this.#titres.length) return;
    this.#titres.splice(index, 1);
  }

  public obtenirDureeTotale(): number {
    return this.#titres.reduce((acc, c) => acc + c.duree, 0);
  }

  public obtenirTitres(): ReadonlyArray<Chanson> {
    return this.#titres.slice();
  }

  // Bonus: JukeBox
  public jouerAleatoire(): void {
    if (this.#titres.length === 0) {
      console.log("Aucun titre dans la playlist.");
      return;
    }
    const index = Math.floor(Math.random() * this.#titres.length);
    const chanson = this.#titres[index];
    console.log(
      `Lecture aléatoire: "${chanson.titre}" - ${chanson.artiste} (${chanson.style})`,
    );
  }

  // Bonus: Filtre
  public filtrerParStyle(style: StyleMusical): Chanson[] {
    return this.#titres.filter((c) => c.style === style);
  }
}


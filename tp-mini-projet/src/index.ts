import { Playlist } from "./models/Playlist";
import { StyleMusical } from "./models/Types";
import { rechercherTitres, returnFakeCatalogue } from "./services/MusicAPI";

async function main(): Promise<void> {
  const playlist = new Playlist("Mes Favoris 2025");

  try {
    const titres = await rechercherTitres("Daft Punk");
    console.log(titres); // pour vérifier que la recherche fonctionne
    titres.forEach((c) => playlist.ajouter(c));
    console.log("Playlist mise à jour !");
    const titresVide = await rechercherTitres("");
    console.log(titresVide);
  } catch (e) {
    console.error("Erreur lors de la recherche:", e);
  }

  console.log("Durée totale (secondes):", playlist.obtenirDureeTotale());

  const playlistBonus = new Playlist("Mes Bonus");
  const fakeCatalogue = returnFakeCatalogue();
  fakeCatalogue.forEach((c) => playlistBonus.ajouter(c));
  playlistBonus.jouerAleatoire();
  console.log(playlistBonus.filtrerParStyle(StyleMusical.ROCK));

}

void main();


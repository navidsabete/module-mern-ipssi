import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  is_dispo: boolean;
  category: string;
  price: number;
  qte_stock: number;
}

const productsData: Product[] = [
  // Football
  {
    id: 1,
    name: "Ballon de Football",
    description: "Ballon taille 5, parfait pour les entraînements",
    is_dispo: true,
    category: "Football",
    price: 5,
    qte_stock: 10,
  },
  {
    id: 2,
    name: "Chaussures",
    description: "Chaussures pour matchs et entraînements",
    is_dispo: true,
    category: "Football",
    price: 2,
    qte_stock: 15,
  },
  {
    id: 3,
    name: "Maillot Arbitre",
    description: "Maillot officiel pour l'arbitre",
    is_dispo: false,
    category: "Football",
    price: 3,
    qte_stock: 0,
  },

  // Natation
  {
    id: 4,
    name: "Bonnet de Natation",
    description: "Bonnet en silicone confortable",
    is_dispo: true,
    category: "Natation",
    price: 1,
    qte_stock: 20,
  },
  {
    id: 5,
    name: "Ballon Water-Polo",
    description: "Ballon officiel pour water-polo",
    is_dispo: true,
    category: "Natation",
    price: 6,
    qte_stock: 5,
  },
  {
    id: 6,
    name: "Lunettes de Natation",
    description: "Lunettes ajustables pour entraînements",
    is_dispo: false,
    category: "Natation",
    price: 3,
    qte_stock: 0,
  },
];


function Location() {

  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const categories = ["All", "Football", "Natation"];

  const filteredProducts =
    categoryFilter === "All"
      ? productsData
      : productsData.filter((p) => p.category === categoryFilter);


  return (
    <div className="page">
      <div className="hero">
        <h2>Catalogue Produits</h2>
        <p>Liste des produits par catégorie (Football, Natation...)</p>

        {/* Filtre par catégorie */}
      <div className="filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn-filter ${
              categoryFilter === cat ? "active" : ""
            }`}
            onClick={() => setCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

        {/* Listing produits */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              <strong>Catégorie:</strong> {product.category}
            </p>
            <p>
              <strong>Prix:</strong> {product.price} €/jour
            </p>
            <p>
              <strong>Stock:</strong> {product.qte_stock}{" "}
              {product.is_dispo ? "Disponible" : "Indisponible"}
            </p>
            <button
              className="btn btn-primary"
              disabled={!product.is_dispo}
            >
              {product.is_dispo ? "Ajouter au panier" : "Indisponible"}
            </button>
          </div>
        ))}
      </div>
      
      </div>
    </div>
  );
}

export default Location;

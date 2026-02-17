import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";


const Home = () => <h2>Page d'accueil</h2>; 
const Library = () => <h2>Ma Bibliothèque</h2>;
const Compteur = () => {

  const [count, setCount] = useState(0);
  const increment = () => { 
    setCount(count+1);
  };
  const decrement = () => { 
    setCount(count-1);
  };
return(
<div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}> 
 <h2>Mon Compteur Interactif</h2>
 <p style={{ fontSize: '40px', fontWeight: 'bold', color: count<0?'red':'black' }}> 
          {count} 
        </p> 
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={decrement} style={{ padding: '10px 20px', backgroundColor: 'lightyellow' }}> 
            - Diminuer 
          </button> 
          <button onClick={increment} style={{ padding: '10px 20px', backgroundColor: 'lightblue' }}> 
            + Augmenter 
          </button> 
        </div>
</div>
);
 }

 const ErrorNotFound = () => {
  return(
    <div>
      <h2>Erreur 404 : Page introuvable</h2><Link to="/">⬅ Retour à l'accueil</Link>
    </div>
  );
 }

function App() { 
  const [countClick, setCountClick] = useState(0);
    return (
        <div> 
          <nav style={{ padding: '20px', background: '#eee' }}>
            <Link to="/" onClick={() => setCountClick(countClick + 1)}>Accueil</Link> | <Link to="/library" onClick={() => setCountClick(countClick + 1)}>Livres</Link> | <Link to="/compteur" onClick={() => setCountClick(countClick + 1)}>Compteur</Link> | <span>Compteur clic : {countClick}</span>
            </nav> 
            <main style={{ padding: '20px' }}> 
              <Routes> 
                <Route path="/" element={<Home />} /> 
                <Route path="/library" element={<Library />} />
                <Route path="/compteur" element={<Compteur />} />
                <Route path="*" element={<ErrorNotFound />} /> 
              </Routes> 
            </main>
        </div>
    ); 
} 


export default App;
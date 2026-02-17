import { useState, useEffect } from "react";
import { Routes, Route, Link} from "react-router-dom";
import BookCard from "./components/BookCard";
import TaskList from "./components/TaskList";

  const myBooks = [ 
  { id: 1, title: "Mon Livre 1", author: "Mon Auteur 1" },
  { id: 2, title: "Mon Livre 2", author: "Mon Auteur 2" }, 
  { id: 3, title: "Mon Livre 3", author: "Mon Auteur 3" } ];

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h2>Page d'accueil</h2>
      <TaskList />
    </div>
  );
} 
function Library() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}> 
      <h2>Ma Bibliothèque</h2>
      <div className="book-list">
        {myBooks.map((book) => (
          <BookCard
          key={book.id} title={book.title} author={book.author}  
          />
          ))}
      </div>
    </div>
  );
} 
function Compteur() {

  const [count, setCount] = useState(() => {
    const savedValue = localStorage.getItem("compteurCount");
    return savedValue !== null ? Number(savedValue) : 0;
  });
  const increment = () => { 
    setCount(count+1);
  };
  const decrement = () => { 
    setCount(count-1);
  };
  useEffect(() => {
    localStorage.setItem("compteurCount", count.toString());
  }, [count]);
return(
<div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}> 
 <h2>Mon Compteur Interactif</h2>
 <p style={{ fontSize: '40px', fontWeight: 'bold', color: count<0?'red':'black' }}> 
          {count} 
        </p> 
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={decrement} style={{ padding: '10px 20px' }}> 
            - Diminuer 
          </button> 
          <button onClick={increment} style={{ padding: '10px 20px'}}> 
            + Augmenter 
          </button> 
        </div>
</div>
);
 }

 const ErrorNotFound = () => {
  return(
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}> 
      <h2>Erreur 404 : Page introuvable</h2><Link to="/">⬅ Retour à l'accueil</Link>
    </div>
  );
 }

function App() { 
  const [countClick, setCountClick] = useState(0);
    return (
        <div> 
          <nav style={{ background: '#eee' }}>
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
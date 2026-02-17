// TODO : Définissez l'interface pour les Props
interface BookProps {
    title: string; author: string; 
} 

// TODO : Créez le composant qui reçoit ces props 
const BookCard = (book: BookProps) => { 
    return ( 
    <div style={{ padding: '10px', margin: '10px' }}>
        <h3>{book.title}</h3> 
        <p>Par : {book.author}</p> 
    </div> 
); 
}; 
    
export default BookCard;
import { useState, useEffect } from 'react';

// Componente PostsList
function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función obtener los posts desde API
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error('Error al cargar las publicaciones');
        }
        
        const data = await response.json();
        // Se limita a las primeras 10 publicaciones
        setPosts(data.slice(0, 10));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // El array vacío para llamarlo solo una vez!

  // Renderizado condicional según estado
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Cargando publicaciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">¡Oops! Algo no anda bien</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="row">
      {posts.map((post) => (
        <div key={post.id} className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-primary">
                {post.id}. {post.title}
              </h5>
              <p className="card-text text-muted">{post.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente App 
export default function App() {
  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">
          Listado de Publicaciones
        </h1>
        <p className="lead text-muted">
          10 Publicaciones obtenidas 
        </p>
      </header>
      
      <main>
        <PostsList />
      </main>
      
      <footer className="text-center mt-5 text-muted">
        <h6> espero haber hecho lo correcto 🤓☝</h6>
      </footer>
    </div>
  );
}

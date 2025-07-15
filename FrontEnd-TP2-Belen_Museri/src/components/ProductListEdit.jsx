import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductListEdit = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        const json = await res.json();
        if (json.data) {
          setProducts(json.data);
        } else {
          setErrorMessage("No se pudieron obtener los productos");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Error al cargar los productos");
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-products/${id}`);
  };

  return (
    <div className="container height-100vh">
      <h2>Editar Producto</h2>
      {errorMessage && <p className="mensaje-error">{errorMessage}</p>}

      <div className="products-container">
        {products.map(product => (
          <div className="card" key={product._id}>
            <h4>{product.name}</h4>
            <button
              className="primary-button"
              onClick={() => handleEdit(product._id)}
            >
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListEdit;

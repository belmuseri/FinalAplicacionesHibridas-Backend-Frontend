import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    img: "",
    description: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Obtener datos del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        const json = await res.json();
        if (json.data) {
          setFormData(json.data);
        } else {
          setErrorMessage("Producto no encontrado");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Error al cargar el producto");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user || !user._id) {
        setErrorMessage("El usuario no está logueado o el ID no fue encontrado");
        return;
      }

      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (json.message === 'Producto actualizado correctamente') {
        navigate('/products', { state: { message: "Producto actualizado con éxito" } });
      } else {
        setErrorMessage("Error al actualizar el producto");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error del servidor");
    }
  };

  return (
    <div className="container">
      <h2>Editar Producto</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Precio</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <label htmlFor="img">Nombre de la Imagen</label>
        <input
          type="text"
          id="img"
          name="img"
          value={formData.img}
          onChange={handleChange}
        />

        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button className='primary-button' type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProduct;

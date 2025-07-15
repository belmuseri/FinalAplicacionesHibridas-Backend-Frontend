import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (json.message === 'ok') {
        setMessage("Usuario actualizado con éxito");
      } else {
        setMessage("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error del servidor");
    }
  };

  return (
    <div className="container height-100vh">
      <h2>Editar Perfil</h2>
      {/* <p>{message && <p>{message}</p>}</p> */}
      {message && <p className="mje-exito">{message}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />

        <label htmlFor="password">Contraseña</label>
        <input id="password" name="password" type="password" placeholder="*******" value={formData.password} onChange={handleChange} />

        <button className="primary-button" type="submit">Guardar Cambios</button>
      </form>
      
    </div>
  );
};

export default EditProfile;

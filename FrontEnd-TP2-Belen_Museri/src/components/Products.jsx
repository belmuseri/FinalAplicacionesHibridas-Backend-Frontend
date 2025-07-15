import { useEffect, useState } from "react"
import { Link , useLocation} from "react-router-dom";

const Products = (  ) => {

    const [ lista, setLista] = useState([]);
    const location = useLocation()
    const successMessage = location.state?.message;

    useEffect( ()  =>  {

        const getProduct = async () =>{
            const endPoint = 'http://localhost:3000/products';
            
            const response = await fetch(endPoint);
            const json = await response.json();
            setLista( json.data )
            console.log(json)
        }

        getProduct();

    }, [])

    return ( 
        <div className="container">
            {successMessage && <p className="mensaje-success">{successMessage}</p>}

            <h2>Productos</h2>

            <div className="products-container">
                {
                    lista.map( product => (
                        <div className="card" key={product._id}>
                            {/* <img src={images[product.img]} alt={product.name} /> */}
                            <img src={`src/assets/img/${product.img}`} alt={product.name} />

                            <h3>{ product.name }</h3>
                            <Link className="primary-button" to={`/products/${product._id}`}> Ver Detalle </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
    }
    export default Products
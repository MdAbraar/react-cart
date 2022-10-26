import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { CartContext } from "../CartContext";

const SingleProduct = () => {
  const { cart, setCart } = useContext(CartContext);

  const [isAdding, setIsAdding] = useState(false);

  const [product, setProduct] = useState({});

  const params = useParams();

  const history = useHistory();

  const addToCart = (event, product) => {
    event.preventDefault();
    let _cart = { ...cart };
    if (!_cart.items) {
      _cart.items = {};
    }
    if (_cart.items[product._id]) {
      _cart.items[product._id] += 1;
    } else {
      _cart.items[product._id] = 1;
    }

    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;

    setCart(_cart);
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  useEffect(() => {
    fetch(`https://ecom-rest-apis.herokuapp.com/api/products/${params._id}`)
      .then((res) => {
        return res.json();
      })
      .then((product) => {
        setProduct(product);
      });
  }, [params._id]);

  return (
    <div className="container mx-auto mt-12">
      <button
        className="mb-12 font-bold"
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </button>
      <div className="flex">
        <img className="w-2/5" src={product.image} alt="" />
        <div className="ml-16">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="text-md">{product.size}</div>
          <div className="font-bold mt-2">AED {product.price}</div>
          <button
            disabled={isAdding}
            onClick={(e) => {
              addToCart(e, product);
            }}
            className={`${
              isAdding ? "bg-green-500" : "bg-yellow-500"
            } py-1 px-4 rounded-full font-bold`}
          >
            {isAdding ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

import { useContext, useEffect, useState } from "react";

import { CartContext } from "../CartContext";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const { cart, setCart } = useContext(CartContext);

  const getQuantity = (productId) => {
    return cart.items[productId];
  };

  const increment = (productId) => {
    const existingQuantity = cart.items[productId];
    const _cart = { ...cart };
    _cart.items[productId] += existingQuantity;
    _cart.totalItems++;
    setCart(_cart);
  };

  useEffect(() => {
    if (!cart.items) {
      return;
    }
    fetch(`https://ecom-rest-apis.herokuapp.com/api/products/cart-items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) }),
    })
      .then((res) => {
        return res.json();
      })
      .then((products) => {
        setProducts(products);
      });
  }, [cart]);

  return (
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart Items</h1>
      <ul>
        {products.map((product) => {
          return (
            <li className="mb-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="h-16" src={product.image} alt="" />
                  <span className="font-bold ml-4 w-48">{product.name}</span>
                </div>
                <div>
                  <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none">
                    -
                  </button>
                  <b className="px-4">{getQuantity(product._id)}</b>
                  <button
                    onClick={() => {
                      increment(product._id);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                  >
                    +
                  </button>
                </div>
                <span> AED {product.price}</span>
                <button className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="my-6" />
      <div className="text-right">
        <b> Grand Total:</b> AED 1000
      </div>
      <div className="text-right mt-6">
        <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Cart;

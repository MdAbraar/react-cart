import { Link } from "react-router-dom";

const Product = (props) => {
  const { product } = props;

  const addToCart = (event, product) => {
    event.preventDefault();
  };

  return (
    <>
      <Link to={`/products/${product._id}`}>
        <div>
          <img src={product.image} alt="pizza" />
          <div className="text-center">
            <h2 className="text-lg font-bold py-2">{product.name}</h2>
            <span className="bg-grey-200 py-1 rounded-full text-sm py-4">
              {product.size}
            </span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span>AED {product.price}</span>
            <button
              onClick={(e) => {
                addToCart(e, product);
              }}
              className="bg-yellow-500 py-1 px-4 rounded-full font-bold"
            >
              ADD
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;

import React, { Component } from "react";
import Loader from "./Loader";

class SingleProduct extends Component {
  state = { product: undefined, loading: true };

  fetchData = async () => {
    this.setState({ loading: true });
    try {
      const resp = await fetch(
        `https://fakestoreapi.com/products/${
          window.location.pathname.split("/").slice(-1)[0]
        }`
      );
      const json = await resp.json();
      if (json) {
        this.setState({ product: json });
        this.setState({ loading: false });
      } else {
        this.setState({ product: [] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { product, loading } = this.state;

    if (loading) {
      return <Loader />;
    }

    if (product === undefined) {
      return <h2 className="section-title">nothing to display yet!</h2>;
    }

    return (
      <div className="single-product">
        <div className="image-section">
          <img src={product.image} alt={product.title} className="main-img" />
        </div>
        <div className="single-product-details">
          <h2 className="single-product-brand">{product.category}</h2>
          <br />
          <p className="single-product-name">{product.title}</p>
          <br />
          <>
            <span className="product-label">PRICE:</span>
            <br />
            <span className="single-product-price">${product.price}</span>
          </>
          <>
            <button
              className="add-to-cart"
              onClick={() => {
                this.props.handleCart(product);
              }}
            >
              add to cart
            </button>
          </>
          <div className="description">{product.description}</div>
        </div>
      </div>
    );
  }
}

export default SingleProduct;

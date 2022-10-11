import React, { Component } from "react";
import Loader from "./Loader";
import { ReactComponent as CartIcon } from "../vector/cart-logo.svg";

class Products extends Component {
  state = { products: [], loading: true };

  fetchData = async () => {
    this.setState({ loading: true });
    try {
      const resp = await fetch(
        `https://fakestoreapi.com/products/category/${this.props.categoryName}`
      );
      const json = await resp.json();
      if (json) {
        this.setState({ products: json });
        this.setState({ loading: false });
      } else {
        this.setState({ products: [] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.categoryName !== this.props.categoryName) {
      return this.fetchData();
    }
  }

  render() {
    const { products, loading } = this.state;
    const { categoryName } = this.props;

    const productRoute = (route) => {
      window.location.replace(route);
    };

    if (loading) {
      return <Loader />;
    }

    if (!products.length) {
      return <h2 className="section-title">nothing to display yet!</h2>;
    }

    return (
      <div className="section-center">
        <h2 className="category-name">{categoryName}</h2>
        <div className="product-items">
          {products.map((product) => {
            const { id, image, price, title, category } = product;
            return (
              <section key={id} className="product-grid">
                <div className="product-container">
                  <section
                    className="product-section"
                    onClick={() => {
                      let myString = category;
                      myString = myString.replace(/\s+/g, "-");
                      productRoute(`/${myString}/${id}`);
                    }}
                  >
                    <div className="image-container">
                      <img className="photo" alt={title} src={image} />
                    </div>
                  </section>
                  <CartIcon
                    className="cart-icon"
                    onClick={() => this.props.handleCart(product)}
                  />
                  <section
                    className="product-section"
                    onClick={() => {
                      let myString = category;
                      myString = myString.replace(/\s+/g, "-");
                      productRoute(`/${myString}/${id}`);
                    }}
                  >
                    <div className="product-details">
                      <p className="product-name">{title}</p>
                      <div className="price">
                        <b>${price}</b>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Products;

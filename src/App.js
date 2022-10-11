import React, { Component } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./component/Navigation";
import Products from "./component/Products";
import SingleProduct from "./component/SingleProduct";
import Cart from "./component/Cart";
import Loader from "./component/Loader";
import About from "./component/About";
import ErrorPage from "./ErrorPage";
import ErrorBoundary from "./ErrorBoundary";

class App extends Component {
  state = { category: [], cartItems: [], loading: true };

  fetchData = async () => {
    this.setState({ loading: true });
    try {
      const resp = await fetch("https://fakestoreapi.com/products/categories");
      const json = await resp.json();
      if (json) {
        this.setState({ category: json });
        this.setState({ loading: false });
      } else {
        this.setState({ category: [] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.fetchData();

    if (localStorage.cart) {
      this.setState({ cartItems: JSON.parse(localStorage.cart) || [] });
    }

    window.addEventListener("beforeunload", this.handleLocalStorage);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleLocalStorage);
  }

  handleLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(this.state.cartItems));
    localStorage.setItem("symbol", JSON.stringify(this.state.symbol));
  };

  render() {
    const { category, cartItems, loading } = this.state;

    const clearCart = () => {
      console.log(this.state.cartItems);
      this.setState({ cartItems: [] });
    };

    const handleCart = (product) => {
      let sameItem = cartItems.findIndex((p) => p.id === product.id) !== -1;

      sameItem
        ? incrementQuantity(product.id)
        : this.setState((prevState) => ({
            cartItems: prevState.cartItems.concat({
              ...product,
              quantity: 1,
            }),
          }));
    };

    const incrementQuantity = (id) => {
      this.setState((prevState) => {
        let updatedCartItems = prevState.cartItems.map((product) => {
          if (product.id === id) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }
          return product;
        });
        return { cartItems: updatedCartItems };
      });
    };

    const decrementQuantity = (id) => {
      this.setState((prevState) => {
        let updatedCartItems = prevState.cartItems
          .map((product) => {
            if (product.id === id) {
              return {
                ...product,
                quantity: product.quantity - 1,
              };
            }
            return product;
          })
          .filter((product) => product.quantity !== 0);
        return { cartItems: updatedCartItems };
      });
    };

    if (loading) {
      return <Loader />;
    }

    if (!category.length) {
      return <h2 className="section-title">nothing to display yet!</h2>;
    }

    return (
      <>
        <Router>
          <ErrorBoundary>
            <Navigation
              category={category}
              cartItems={cartItems}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              clearCart={clearCart}
            />
            <Routes>
              {category.map((categoryName) => {
                let myString = categoryName;
                myString = myString.replace(/\s+/g, "-");
                return (
                  <Route
                    path={myString}
                    key={categoryName}
                    element={
                      <Products
                        categoryName={categoryName}
                        handleCart={handleCart}
                      />
                    }
                  />
                );
              })}
              {category.map((categoryName) => {
                let myString = categoryName;
                myString = myString.replace(/\s+/g, "-");
                let route = window.location.pathname.split("/").slice(-1)[0];
                return (
                  <Route
                    path={`/${myString}/${route}`}
                    key={categoryName}
                    element={<SingleProduct handleCart={handleCart} />}
                  />
                );
              })}
              <Route
                path="/cart"
                element={
                  <Cart
                    cartItems={cartItems}
                    incrementQuantity={incrementQuantity}
                    decrementQuantity={decrementQuantity}
                    clearCart={clearCart}
                  />
                }
              />
              <Route index element={<About />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </ErrorBoundary>
        </Router>
      </>
    );
  }
}

export default App;

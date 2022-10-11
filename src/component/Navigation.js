import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as NavCart } from "../vector/nav-cart.svg";
import MiniCart from "./MiniCart";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: false,
      currencyToggle: false,
      cartOverlay: false,
      isTop: true,
    };

    this.currencyRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    document.addEventListener("mousedown", this.closeOutsideComponent);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("mousedown", this.closeOutsideComponent);
  }

  handleScroll = () => {
    const isTop = window.scrollY < 100;
    if (isTop !== this.state.isTop) {
      this.setState({ isTop });
    }
  };

  closeOutsideComponent = (e) => {
    if (this.currencyRef && !this.currencyRef.current.contains(e.target)) {
      if (this.state.currencyToggle === true) {
        this.setState({
          backdrop: false,
          currencyToggle: false,
          cartOverlay: false,
        });
      }
    }
  };

  onBackdropClick = () => {
    document.body.style.overflow = "scroll";
    this.setState({
      backdrop: false,
      currencyToggle: false,
      cartOverlay: false,
    });
  };

  render() {
    const { backdrop, currencyToggle, cartOverlay, isTop } = this.state;
    const { category, cartItems } = this.props;

    const onCartToggle = () => {
      if (!backdrop || (backdrop && cartOverlay)) {
        if (document.body.style.overflow !== "hidden") {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "scroll";
        }
        this.setState({ backdrop: !backdrop, cartOverlay: !cartOverlay });
      }
      if (backdrop && currencyToggle) {
        document.body.style.overflow = "hidden";
        this.setState({
          backdrop: true,
          currencyToggle: false,
          cartOverlay: true,
        });
      }
    };

    const quantityReducer = (accumulator, value) => {
      accumulator = accumulator + value.quantity;
      return accumulator;
    };

    let totalQuantity = cartItems.reduce(quantityReducer, 0);

    if (window.location.pathname === "/") {
      return false;
    }

    return (
      <nav className="navbar">
        <div className="nav-center">
          <ul className="categories">
            <li onClick={() => this.onBackdropClick()}>
              {category.map((categoryName) => {
                let myString = categoryName;
                myString = myString.replace(/\s+/g, "-");
                return (
                  <NavLink to={`/${myString}`} key={categoryName}>
                    {categoryName}
                  </NavLink>
                );
              })}
            </li>
            <li onClick={() => this.onBackdropClick()}>
              <Link to="/">About</Link>
            </li>
          </ul>
          <div className="right">
            <>
              <button className="currency" ref={this.currencyRef}>
                <span>USD</span>
              </button>
            </>
            <div className="dropdown">
              <button onClick={onCartToggle} className="nav-cart">
                {cartItems.length > 0 && (
                  <span className="cart-quantity">{totalQuantity}</span>
                )}
                <NavCart className="nav-cart-icon" />
              </button>
              <div className="cart-dropdown">
                {cartOverlay && (
                  <MiniCart
                    cartItems={cartItems}
                    incrementQuantity={this.props.incrementQuantity}
                    decrementQuantity={this.props.decrementQuantity}
                    clearCart={this.props.clearCart}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {backdrop && (
          <div
            className={`${
              cartOverlay ? `${isTop ? "backdrop" : "newBackdrop"} frame` : ""
            }`}
            onClick={() => this.onBackdropClick()}
          />
        )}
      </nav>
    );
  }
}

export default Navigation;

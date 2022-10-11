import React, { Component } from "react";
import Loader from "./Loader";

class MiniCart extends Component {
  render() {
    const { cartItems } = this.props;

    const cartRoute = () => {
      window.location.replace("/cart");
    };

    const quantityReducer = (accumulator, value) => {
      accumulator = accumulator + value.quantity;
      return accumulator;
    };

    const amountReducer = (accumulator, value) => {
      accumulator = accumulator + value.price * value.quantity;
      return accumulator;
    };

    let totalQuantity = cartItems.reduce(quantityReducer, 0);
    let totalAmount = cartItems.reduce(amountReducer, 0);

    return !cartItems ? (
      <Loader />
    ) : (
      <div className="cart-overlay">
        {!totalQuantity ? (
          <h2 className="empty-cart">Your bag is currently empty!</h2>
        ) : (
          <>
            <b>Cart Summary,</b>{" "}
            {`${totalQuantity} item${totalQuantity > 1 ? "s" : ""}`}{" "}
          </>
        )}
        <div className="overlay-list">
          {totalQuantity &&
            cartItems.map((item) => {
              return (
                <section key={item.id} className="overlay-grid">
                  <div className="overlay-details-container">
                    <div className="overlay-details">
                      {item.title}
                      <br /> {item.category}
                    </div>
                    <b className="overlay-price">${item.price}</b>
                    <div className="overlay-attributes">{item.description}</div>
                  </div>
                  <div className="overlay-view-container">
                    <div className="overlay-btns">
                      <button
                        className="overlay-btn"
                        onClick={() => this.props.incrementQuantity(item.id)}
                      >
                        +
                      </button>
                      <div className="overlay-quantity">{item.quantity}</div>
                      <button
                        className="overlay-btn"
                        onClick={() => this.props.decrementQuantity(item.id)}
                      >
                        -
                      </button>
                    </div>
                    <div className="overlay-image-container">
                      <img
                        className="overlay-image"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                  </div>
                </section>
              );
            })}
        </div>
        <div className="overlay-total">
          <b>total:</b>
          <b>${totalAmount}</b>
        </div>
        <div className="total-btns">
          <span onClick={() => cartRoute()} className="total-btn view-bag">
            view cart{" "}
          </span>
          <button
            className="total-btn check-out"
            onClick={() => this.props.clearCart()}
          >
            place order
          </button>
        </div>
      </div>
    );
  }
}

export default MiniCart;

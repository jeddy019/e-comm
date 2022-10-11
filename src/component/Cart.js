import React, { Component } from "react";
import Loader from "./Loader";

class Cart extends Component {
  render() {
    const { cartItems } = this.props;

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

    const getTax = () => {
      const tax = (totalAmount / 100) * 21;
      return tax.toFixed(2);
    };

    return !cartItems ? (
      <Loader />
    ) : (
      <div className="cart">
        <h1 className="cart-tag">cart</h1>
        {cartItems.length === 0 ? (
          <h2>Cart Is Empty</h2>
        ) : (
          <div>
            <hr width="auto" color="#E5E5E5" size="1" />
            <section className="cart-details">
              {cartItems.map((item, index) => {
                return (
                  <div key={item.id}>
                    <div className="cart-item">
                      <section>
                        <h2 className="item-brand">{item.title}</h2>
                        <span className="item-price">$${item.price}</span>
                        <div className="cart-attributes">
                          {item.description}
                        </div>
                      </section>
                      <div className="item-images">
                        <div className="activity">
                          <span
                            onClick={() =>
                              this.props.incrementQuantity(item.id)
                            }
                            className="activity-btn"
                          >
                            +
                          </span>
                          <span className="quantity">{item.quantity}</span>
                          <span
                            className="activity-btn"
                            onClick={() =>
                              this.props.decrementQuantity(item.id)
                            }
                          >
                            -
                          </span>
                        </div>
                        <section>
                          <div className="cart-image-container">
                            <img
                              className="cart-image"
                              src={item.image}
                              alt={item.title}
                            />
                          </div>
                        </section>
                      </div>
                    </div>
                    <hr width="auto" color="#E5E5E5" size="1" />
                  </div>
                );
              })}
            </section>
            <div className="cart-result">
              <>
                <div className="cart-tax">Tax 21%: </div>
                <p>${getTax()}</p>
                <div className="result-quantity">Quantity: </div>
                <p>{totalQuantity}</p>
                <div className="cart-total">Total: </div>
                <p>${totalAmount}</p>
              </>
              <button
                className="order-btn"
                onClick={() => this.props.clearCart()}
              >
                Order
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;

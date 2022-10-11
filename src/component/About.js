import React, { Component } from "react";

class About extends Component {
  render() {
    const productRoute = (route) => {
      window.location.replace(route);
    };

    return (
      <section className="section about-section">
        <h1 className="section-title">about this app</h1>
        <p>
          Hi, thanks for checking out this App. My name is Jedidiah Akinboyowa
          and I am a Javascript Developer with a keen interest in ReactJS. This
          is the Frontend of a simplified version of an e-commerce Web
          Application.
        </p>
        <br />
        <p>
          You can add products to cart (by clicking on the cart icon that shows
          up on hover), route to different categories, view single products (by
          clicking on the product) and I think you'll like the styling in
          general! This App also has other cool features such as a modal that
          pops up when the mini cart is opened, a nice loader, local storage
          support so your products remain intact on the cart even after you
          refresh or close the page.
        </p>
        <br />
        <p>
          I completed this Web Application using HTLMS, CSS3, Javascript,
          ReactJS (strictly class components), and a RESTful API at fakestoreapi
          for my data (no response hardcoding, all data was fetched from this
          endpoint). The only external library I used in building this App is
          the React-Router-Dom. No mobile view was implemented (yeah I know,
          sorry) and I advise you view on Chrome. No backend of any kind was
          implented so your order won't actually be placed, it just logs to the
          browser console!
        </p>
        <br />
        <p>
          Thanks again for checking out this App and I hope you like it! If you
          are looking to get ahold of me, you can send me an email at{" "}
          <a href="mailto:jeddy019@gmail.com" target="_blank" rel="noreferrer">
            jeddy019@gmail.com
          </a>
          {"."} You can also find me on my Github page at{" "}
          <a
            href="https://github.com/jeddy019"
            target="_blank"
            rel="noreferrer"
          >
            github.com/jeddy019
          </a>
          {"."}
        </p>
        <button
          onClick={() => productRoute("/electronics")}
          className="btn-primary"
        >
          proceed!
        </button>
      </section>
    );
  }
}

export default About;

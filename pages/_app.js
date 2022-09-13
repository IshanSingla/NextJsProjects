import '../styles/globals.css'
import { useState } from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

function MyApp({ Component, pageProps }) {

  const [cart, setCart] = useState([])
  const [cartQty, setCartQty] = useState(0)

  const addToCart = (slug, qty, product) => {
    let newCart = cart

    const searchIndex = cart.findIndex((item) => item.slug==slug);

    if (searchIndex > -1) {
      cart[searchIndex].qty = cart[searchIndex].qty + qty
      setCart(cart)
    } else {
        newCart.push({slug: slug, qty: qty, price: product.price, name: product.name, image: product.image, category: product.category, currency: product.currency })
        setCart(newCart)
    }

    // calculating cart item count
    cartQty = cartQty + qty
    setCartQty(cartQty)
  }

  return <>
    <NavBar cartQty={cartQty} />
    <Component cart={cart} addToCart={addToCart} {...pageProps} />
    <Footer/>
  </>
}

export default MyApp
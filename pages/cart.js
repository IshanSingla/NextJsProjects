import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { createOrder, updateOrder} from './api/api';
import { useRouter } from 'next/router'
import { currencyFormat } from 'simple-currency-format';

function Cart({cart, removeFromCart}) {
    const [subtotal, setSubtotal] = useState(0)
    const router = useRouter()

    useEffect(() => {
        let myTotal = 0;
        cart.map(item => {
        myTotal = myTotal + (item.qty * item.price)
        })
        setSubtotal(myTotal)
    })

    function createUpdateOrderAndCheckout() {
        if (localStorage.getItem("orderId")) {
            // Existing Order found in local storage, update the order
            updateOrder(
                {
                    revision: localStorage.getItem("orderRevisionId"),
                    orderId: localStorage.getItem("orderId"),
                    status: "Created",
                    currency: process.env.NEXT_PUBLIC_STORE_CURRENCY,
                    amount: subtotal + 100,
                    products: JSON.stringify(cart)
                }
            ).then((orderResponse)=> {
                // If condition to check order updated successfully
                if (orderResponse) {
                    router.push({
                        pathname: '/checkout'
                    })
                }
            })
        } else {
            // Since no orderId in local storage, create new order
            let random = Math.random()*100000000
            let orderId = "WSC-" +  Math.trunc(random+ Date.now())
            orderId = "11Sep-" + orderId;
            createOrder(
                {
                    orderId: orderId,
                    status: "Created",
                    currency: process.env.NEXT_PUBLIC_STORE_CURRENCY,
                    amount: subtotal + 100,
                    products: JSON.stringify(cart)
                }
            ).then((orderResponse)=> {
                // If condition to check make sure order created successfully
                if (orderResponse) {
                    localStorage.setItem("orderId", orderId);
                    localStorage.setItem("orderRevisionId", orderResponse.id);
                    router.push({
                        pathname: '/checkout'
                    })
                }
            })
        }
    }

    return (
        <>
            <div className="container mx-auto mt-6 " >
                <div className="flex">
                    <div className="w-3/4 bg-white px-10 py-6">
                        <div className="flex justify-between border-b pb-8">
                            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Shopping Cart</h1>
                                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                            </div>
                        </div>
                        {cart.length?
                            <div className="flex mt-6 mb-5">
                                <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5">Product</h3>
                                <h3 className="font-semibold text-center text-gray-900 text-xs uppercase w-1/5 text-center">Quantity</h3>
                                <h3 className="font-semibold text-center text-gray-900 text-xs uppercase w-1/5 text-center">Remove</h3>
                                <h3 className="font-semibold text-center text-gray-900 text-xs uppercase w-1/5 text-center">Subtotal</h3>
                            </div>
                        :
                            <Link href='/products'>
                                <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
                                    Oh! your cart is empty, let&apos;s start shopping!
                                </a>
                            </Link>
                        }

                        {
                            cart.map((item, index) => {
                                return <div key={index}  className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                    <Link href={`/product/${item.slug}`}>
                                        <div className="flex w-2/5 cursor-pointer">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img className="h-24" src={item.image} alt="{item.name}"/>
                                            </div>
                                            <div className="flex flex-col ml-4 flex-grow">
                                                <span className="mt-1 flex justify-between text-base font-medium text-gray-900">{item.name}</span>
                                                <span className="text-indigo-600 text-sm mt-4">{item.category}</span>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="flex justify-center w-1/5">
                                        {item.qty}
                                    </div>
                                    <span className="text-center w-1/5 font-semibold text-sm cursor-default">
                                        <button onClick={() => { removeFromCart(item) }} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</button>
                                    </span>
                                    <span className="text-center w-1/5 font-semibold text-sm">
                                        { currencyFormat(item.qty * item.price, process.env.NEXT_PUBLIC_STORE_LOCALE, item.currency, 2) }
                                    </span>
                                </div>
                            })
                        }

                        {
                            cart.length?
                                <Link href='/products'>
                                    <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
                                        <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                                        Continue Shopping
                                    </a>
                                </Link>
                            :``
                        }
                    </div>

                    <div id="summary" className="w-1/4 px-8 py-10">
                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">Subtotal</span>
                            <span className="font-semibold text-sm">
                                { currencyFormat(subtotal, process.env.NEXT_PUBLIC_STORE_LOCALE, process.env.NEXT_PUBLIC_STORE_CURRENCY, 2) }
                            </span>
                        </div>
                        <div>
                            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                            <select className="block p-2 text-gray-600 w-full text-sm">
                                <option>
                                    {/* TODO: Hardcoded the Stardard shipping charges to 100 (any CurrencyUOM) */}
                                    Standard shipping - { currencyFormat(100, process.env.NEXT_PUBLIC_STORE_LOCALE, process.env.NEXT_PUBLIC_STORE_CURRENCY, 2) }
                                </option>
                            </select>
                        </div>
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total</span>
                                <span>
                                    {/* TODO:  Hardcoded the Stardard shipping charges to 100 (any CurrencyUOM) */}
                                    { currencyFormat(subtotal + 100, process.env.NEXT_PUBLIC_STORE_LOCALE, process.env.NEXT_PUBLIC_STORE_CURRENCY, 2) }
                                </span>
                            </div>
                            <button disabled={cart.length === 0} onClick={createUpdateOrderAndCheckout} className="disabled:bg-indigo-3 00 bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    #summary {
                        background-color: #f6f6f6;
                    }
                `}
            </style>
        </>
    );
}

export default Cart;
import React from 'react'
import { useRouter } from 'next/router'
import { getProduct } from '../api/api';
import { currencyFormat } from 'simple-currency-format';

const Slug = ({ product, addToCart }) => {
    const router = useRouter()
    const { slug } = router.query
    return (
        <div>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.image} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Wasatch Ski Company</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 mt-2">{product.name}</h1>
                            <div className="flex mb-4">
                                <h3 className="tracking-widest text-indigo-600 font-medium">{product.category}</h3>
                            </div>
                            <p className="leading-relaxed">{product.description}</p>
                            
                            <div className="flex  mt-5">
                                <span className="mt-1 title-font font-medium text-2xl text-gray-900">
                                    { currencyFormat(product.price, 'en-IN', product.currency, 2) }
                                </span>
                                <div className='flex mx-4'>
                                    <button onClick={() => { addToCart(slug, 1, product) }} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-2 mx-3 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>
                                    <button onClick={() => { router.push('/cart') }} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-2 mx-2 focus:outline-none hover:bg-indigo-600 rounded">Checkout</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            product: await getProduct(context.query.slug)
        }
    }
}


export default Slug
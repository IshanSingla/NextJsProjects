import React from "react";
import Link from "next/link";
import { getProducts } from "./api/api";

function Products(props) {
  return (
    <div className="container mx-auto px-4">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto">
          <div className="flex flex-wrap w-full mb-10">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Product List
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>
          <div className="flex flex-wrap -m-4">
            {props.products.map((item) => {
              return (
                <div key={item.slug} className="xl:w-1/4 md:w-1/2 p-4">
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <img
                      className="h-80 rounded w-full object-cover object-center mb-6"
                      src={item.image}
                      alt={item.name}
                    />
                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                      {item.category}
                    </h3>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                      {item.name}{" "}
                    </h2>
                    <span className="hidden bg-red-800 bg-gray-800" />
                    <p className="leading-relaxed text-base">
                      {item.description}
                    </p>
                    <Link href={`/product/${item.slug}`}>
                      <button className="my-2 text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      products: await getProducts(),
    },
  };
}

export default Products;

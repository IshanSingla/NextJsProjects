import Link from 'next/link'

export default function Home() {
  return (
    <div className='container mx-auto px-4'>
      <img className='object-none object-center w-[100vw] h-[55vh]' src='/skis.jpg' alt='Wasatch Ski Company'/>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10">
          <div className="flex flex-col text-center w-full">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Let&apos;s make winter adventures!</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Wasatch Ski Company</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">A pair of skis are the ultimate transportation to freedom. Skiing is a dance, and the mountain always leads. You can’t buy happiness, but you can buy a ski pass.</p>
          </div>
          <Link href="/products">
            <button className="flex mx-auto mt-5 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Shop Now</button>
          </Link>
        </div>
      </section>
    </div>
    
  )
}
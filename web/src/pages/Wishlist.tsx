import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Wishlist() {
  const [wishlist] = useState(products.slice(0, 6));

  return (
    <div className="min-h-screen bg-[#F6F8FA] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-[#0F172A] font-[Outfit] mb-6">
          My Wishlist
          <span className="ml-2 text-base font-normal text-gray-500">
            ({wishlist.length} items)
          </span>
        </h1>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <svg width="80" height="80" fill="none" viewBox="0 0 24 24" stroke="#00A2A5" strokeWidth="1.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
            <p className="text-gray-500 text-lg font-[Inter]">Your wishlist is empty</p>
            <a href="/" className="h-11 px-6 rounded-lg bg-[#00A2A5] text-white font-semibold flex items-center">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {wishlist.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

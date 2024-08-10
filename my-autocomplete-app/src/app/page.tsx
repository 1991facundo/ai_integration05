"use client";

import MagicCardSearchInput from '../componentes/MagicCardSearchInput';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Magic: The Gathering Card Search
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Busca cualquier carta de Magic: The Gathering escribiendo su nombre. 
          Las sugerencias aparecerán a medida que escribes.
        </p>
        <div className="w-full">
          <MagicCardSearchInput />
        </div>
      </div>
      
    </main>
  );
}

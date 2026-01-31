"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_COUNTRIES } from "@/lib/queries";
import "./globals.css"; // Force global css import

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  const filteredCountries = data?.countries.filter((country: any) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-20 text-center font-bold text-blue-600">Syncing Data...</div>;

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      
      {/* Search Section with FORCED Margin */}
      <div className="max-w-7xl mx-auto" style={{ marginBottom: '80px' }}>
        <h1 className="text-4xl font-black text-slate-900 mb-2">Nexus Engine.</h1>
        <p className="text-slate-500 mb-8">Global Market distribution analytics.</p>
        
        <input
          type="text"
          placeholder="Search country..."
          className="w-full max-w-md p-4 rounded-xl border border-slate-200 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCountries?.slice(0, 24).map((country: any) => (
          <div 
            key={country.code} 
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
          >
            <img 
              src={`https://flagcdn.com/w160/${country.code.toLowerCase()}.png`} 
              alt={country.name}
              className="w-12 h-8 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold text-slate-800">{country.name}</h2>
            <p className="text-sm text-slate-400 font-bold uppercase mt-1">Capital: {country.capital || "N/A"}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
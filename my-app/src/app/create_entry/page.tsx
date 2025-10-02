'use client';

import { useState,useEffect } from 'react';
import LoadingAnimation from '@/app/_component/Misc';
import SearchBar from '../_component/SearchBar';
import { ConfirmationModal } from '@/app/_component/Misc';

export default function CompanySearch() {
  const [isLoading,setIsLoading] = useState(false)
  const [openModal,setOpenModal]  = useState(false)
  const [searchQuery,setSearchQuery] = useState('')
  const [apiCount,setApiCount] = useState(0)

  const confirmationMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenModal(true)
    setSearchQuery(e.currentTarget.company.value + ' ' + e.currentTarget.country.value)
  }

  useEffect(()=> {
    const fetchAPI = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/usage')
        if (!response.ok) throw new Error('Failed to fetch')
        const result: number = await response.json()
        setApiCount(result)
      } catch (err) {
        console.log(err)
      } 
    }; fetchAPI();
  }, [])
  const handleSearch = () => {
        setIsLoading(true)
        const backendURL = new URL('http://127.0.0.1:5000/api/new_entry')
        backendURL.searchParams.set('search_params',searchQuery)

        const fetchGoogleAPI = async () => {
        try { console.log(searchQuery)
            await fetch(backendURL.toString());
        } catch (error) {
          console.error('Backend call failed:', error);
          alert('Search failed. Please try again.');
          } finally {window.location.href = `/analysis/${encodeURIComponent(searchQuery)}`};

  }; fetchGoogleAPI()}
  if (isLoading == true) {
    return <LoadingAnimation/>
  }
  return (
    
    <div className='min-h-screen bg-white'>
    <SearchBar/>
    {openModal && <ConfirmationModal 
    confirmSearch={handleSearch}
    openModal={setOpenModal}
    companyQuery={searchQuery}
    />}
      <div className="max-w-2xl mx-auto p-6">
        
      <h1 className="text-3xl font-bold text-center mb-8 text-black">Search New Company in Google</h1>
      
      <form onSubmit={confirmationMessage} className="mb-8">
        <div className="flex gap-2">
          <input
            name='company'
            type="text"
            placeholder="Enter company name (e.g., Apple, Tesla, Google)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <input name="country" list='country' className="w-full text-black rounded focus:outline-none ml-5 
          border border-gray-400 px-4 py-3 focus:ring-2 focus:ring-blue-500"/>
            <datalist id='country'>
            <option>Indonesia</option>
            <option>Hongkong</option>
            <option>China</option>
            <option>India</option>
            </datalist>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>
      <div className='text-2xl text-black'>
        <div className='flex justify-center font-semibold'>API Usage Count: {apiCount}/100</div>
        <div className='flex justify-center font-medium mt-2 text-xl text-gray-600'>Reset Daily</div>
      </div>
      
    </div>
    </div>
    
  );
}
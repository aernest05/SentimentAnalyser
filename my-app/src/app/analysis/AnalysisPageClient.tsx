'use client';

import AnalysisCard from '@/app/_component/AnalyseCard';
import {Article} from '@/app/_component/types';
import SearchBar from '@/app/_component/SearchBar';
import { useState} from 'react';

export function AnalysisCardPage ({ sentimentData }: { sentimentData: Article[] }){
    const [currentPage, setCurrentPage] = useState(1);

  const postPerPage = 6
  const totalPages = Math.ceil(sentimentData.length/postPerPage+1)
  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  console.log(firstPostIndex)
  console.log(lastPostIndex)
  const currentCard = sentimentData.slice(firstPostIndex,lastPostIndex)

    return (
    <div className="flex flex-col bg-white min-h-screen justify-between items-center">
        <SearchBar/>
      {/* Analysis Cards */}
      <div className="flex-1 w-full max-w-6xl mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-6 w-full max-w-6xl">
        {currentCard.map((article: Article, index: number) => (
            <AnalysisCard key={index} article={article} />
        ))}
    </div>
      </div>

      {/* Simple Pagination */}
      <div className="flex items-center justify-between w-full max-w-md mt-8 p-4 bg-[#222221] rounded-lg">
        <button
          onClick={() => setCurrentPage(prev => prev-1)}
          disabled={currentPage === 1}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600"
        >
          ← Previous
        </button>
        
        <span className="text-white font-medium">
          {currentPage} / {totalPages-1}
        </span>
        
        <button
          onClick={() => setCurrentPage(prev => prev+1)}
          disabled={currentPage >= totalPages-1}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
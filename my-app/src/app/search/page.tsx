'use client';

import Link from "next/link";
import SearchBar from "../_component/SearchBar";
import { useSearchParams } from "next/navigation";
import LoadingAnimation,{CreateNewCard} from '@/app/_component/Misc'
import { useSearchData } from "../hooks/useSearchData";

// Mock data in your component


export default function SearchHistoryPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get('search_query');
    const {searchDatas, isLoading} = useSearchData(query)

  if (isLoading) {
      return (
        <LoadingAnimation/>
      );
    }
 
  if (!searchDatas || searchDatas.length === 0){
    return (
    <div className="min-w-screen min-h-screen bg-white">
      <SearchBar />
      <div className="ml-80 p-6 w-4xl">
        <h1 className="text-xl font-bold mb-4 text-black">Search History</h1>
        <div className="p-8 text-center bg-gray-50 rounded border border-gray-200">
          <p className="text-gray-500 text-lg">No search history found</p>
          <p className="text-gray-400 text-sm mt-2">
            Try performing a search to see your history here
          </p>
        </div>
      </div>
    </div>
  );
  }
  return (
    <div className="min-w-screen min-h-screen bg-white">
        <SearchBar/>
        <div className="ml-80 p-6 w-4xl">
        <h1 className="text-xl font-bold mb-4 text-black">Recent Search</h1>
            {searchDatas.map((log, i) => (
            <Link key={i} href={`/analysis/${encodeURIComponent(log.company_query)}`}>
            <div className="p-3 border rounded bg-gray-50 mb-4 hover:bg-gray-200">
                <div className="font-medium text-black">{log.company_query}</div>
                <div className="text-xs text-black mt-1">
                {new Date(log.created_at).toLocaleString()}
                </div>
            </div>
            </Link>
            ))}
            <CreateNewCard/>
        </div>
    </div>
  );
}
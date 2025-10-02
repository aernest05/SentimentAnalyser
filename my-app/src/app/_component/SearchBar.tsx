'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation'
import { useSearchData } from '../hooks/useSearchData';


export default function SearchBar() {
    const router = useRouter();
    const { searchDatas} = useSearchData();
    
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query:string = e.currentTarget.query.value

        if (query.trim()) {
        router.push(`/search?search_query=${encodeURIComponent(query)}`);
        }
    }
    return (
         <div className="bg-white w-full sticky top-0">
         <div className="flex min-h-13 justify-center border-gray-700 border-b relative">
            <Link href="/">
             <button className='absolute left-0 mt-3 ml-3 bg-blue-200 hover:bg-blue-400 cursor-pointer rounded-full w-8 h-8 p-1.5 items-center'>
                <img src='https://img.icons8.com/?size=100&id=2797&format=png&color=000000'></img>
             </button>
            </Link>
            
          <form className="flex justify-center shadow-2xl w-150 border-gray-200 border-2 rounded-full m-2 mr-1 items-center" onSubmit={handleSearch}>
            <input autoComplete="off"
            name="query" className="w-full text-black rounded focus:outline-none ml-5" 
            placeholder="Search for Company" />
            <button className="bg-blue-200 hover:bg-blue-400 rounded-full w-7 h-7 p-1.5 mr-2 items-center">
                <img src='https://img.icons8.com/?size=100&id=132&format=png&color=000000'></img>
                    </button>
                </form>
            <Link href='/search' className='flex justify-center border-blue-100 w-25 text-gray-800 
            border-1 rounded-full m-2 items-center hover:bg-blue-400'>History</Link>
            </div>
                <div className="shadow-lg flex-row">
                        <ul className="flex ms-9 space-x-9 w-max min-h-10 items-center ">
                            {searchDatas.map((searchData,index) => (
                                <Link key={index} href={`/analysis/${encodeURIComponent(searchData.company_query)}`}>
                                <li className="text-black hover:text-blue-400">{searchData.company_query}</li>
                                </Link>
                                
                            ))}
                        </ul>
                </div>
            </div>
            
    )
}

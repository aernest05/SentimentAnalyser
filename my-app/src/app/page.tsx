'use client';

import { useRouter } from "next/navigation";
import { CreateNewCard } from "./_component/Misc";


export default function Index(){
  const router = useRouter()
  const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const query:string = e.currentTarget.query.value

        const url = new URL(`http://localhost:3000/search`);
        url.searchParams.set('search_query', encodeURIComponent(query));

        if (query.trim()) {
            router.push(url.toString());
        }
    }
  return (
    <div className="bg-white min-h-screen flex justify-center">
      <div className="m-20">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Company Sentiment Analysis</h1>
        <form className="flex border-blue-100 w-150 h-15 border-1 rounded-full m-2 mr-1 items-center" onSubmit={handleSearch} >
            <span className="w-7 ml-4">
              <img src='https://img.icons8.com/?size=100&id=132&format=png&color=000000'></img>
            </span>
            <input autoComplete="off"
            name="query" className="w-full text-black rounded focus:outline-none ml-2 h-full" 
            placeholder="Search for Company" />
                </form>
        <div className="m-10">
          <CreateNewCard/>
        </div>
        
      </div>
      
      
    </div>
    
  )
}
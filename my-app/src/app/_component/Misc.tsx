import Link from "next/link";
import { ConfirmationModalProps } from "./types";

export default function LoadingAnimation() {

  return (
      <div className="flex flex-col bg-white min-h-screen justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <div className="text-xl mt-4">Analyzing news sentiment...</div>
      </div>
    );
}

export function CreateNewCard(){
  return(
    <Link href={'/create_entry'}>
    <div className="p-3 border rounded bg-gray-50 mb-4 hover:bg-gray-200">
        <span className="font-medium text-black">Create New Entry</span>
    </div>
    </Link>
  )
}

export function ConfirmationModal({companyQuery,openModal,confirmSearch}: ConfirmationModalProps) {
  return (
  <div className="bg-gray-200 rounded-2xl border w-md absolute ml-auto mr-auto left-0 right-0 mt-12 
  drop-shadow-2xl ">
      <div className="flex text-black justify-center mt-4 text-2xl font-semibold">
        <h1>Confirm search query?</h1>
      </div>
      <div className="flex text-black text-xl justify-center mt-4">
        <h1>{companyQuery}</h1>
      </div>
      <div className="flex text-black text-xl justify-center mt-4">
      </div>
      
      <div className="flex justify-around mt-5 mb-2 text-xl">
        <button className="bg-red-400 border-2 w-20 p-2 justify-center flex rounded-2xl hover:bg-red-600" 
        onClick={()=>{openModal(false);}}>No</button>
        <button className="bg-blue-400 border-2 w-20 p-2 justify-center flex rounded-2xl hover:bg-blue-600"
        onClick={confirmSearch}>Yes</button>
      </div>
  </div>
  )
}
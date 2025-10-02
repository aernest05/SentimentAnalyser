export default function Loading() {

  return (
      <div className="flex flex-col bg-white min-h-screen justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <div className="text-xl mt-4">Analyzing news sentiment...</div>
      </div>
    );
}
export default function Home() {
  return (
    <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-black
    h-screen flex items-center justify-center p-5">
      <div className="bg-white w-full shadow-lg p-5 rounded-2xl max-w-screen-sm flex flex-col 
      ">
        <div className="group flex flex-col">
          <input className="bg-gray-100 w-full rounded-full" placeholder="write your email"/>
          <span className="group-focus-within:block hidden"> Make sure its valid</span>
          <button>submit</button>
        </div>
      </div>
  </main>
  );
}

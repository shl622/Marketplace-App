export default function Home() {
  return (
    <main className="bg-gray-300 h-screen flex items-center justify-center p-5">
    <div className="bg-white w-full shadow-lg p-5 rounded-2xl">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold -mb-1">
            In transit
          </span>
          <span className="text-4xl font-semibold">Coolblue</span>
        </div>
        <div className="size-12 rounded-full bg-orange-400 "/>
      </div>
      <div className="my-2 flex items-center gap-2">
        <span className="bg-green-400 text-white uppercase px-2 py-2.5 text-xs font-medium rounded-full">
          Today
        </span>
        <span>9:30-10:30</span>
      </div>
      <div className="relative">
        <div className="bg-gray-200 absolute w-full h-2 rounded-full"/>
        <div className="bg-green-400 absolute w-2/3 h-2 rounded-full"/>
      </div>
      <div className="flex justify-between items-center mt-5 text-gray-500">
        <span>Expected</span>
        <span>Sorting center</span>
        <span>In transit</span>
        <span className="text-gray-400">Delivered</span>
      </div>
    </div>
  </main>
  );
}

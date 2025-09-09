import searchUrl from '../../public/assets/images/icon-search.svg';

export default function App() {
    return (
        <div className="text-center mt-12">
            <h1 className="font-bricolage text-5xl font-extrabold mb-10 leading-15 w-75 mx-auto sm:w-full">How's the sky looking today?</h1>
            <form className="flex flex-col gap-3 sm:flex-row sm:space-y-0 md:w-xl md:mx-auto">
                <div className='relative sm:w-full'>
                    <input type="text" placeholder="Search for a place..." className="bg-[#25253F] w-full rounded-lg py-3 px-14" />
                    <img src={searchUrl} alt="search icon" className="absolute top-3 left-5" />
                </div>
                <button className="w-full bg-[#4657D9] rounded-lg py-3 sm:w-1/6">Search</button>
            </form>
        </div>
    )
}
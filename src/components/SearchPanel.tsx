import searchUrl from '../../public/assets/images/icon-search.svg';

export default function App() {
    return (
        <div className="font-dmsans text-center mt-12">
            <h1 className="font-bricolage text-5xl font-extrabold mb-10 leading-15">How's the sky looking today?</h1>
            <form>
                <div className='relative'>
                    <input type="text" placeholder="Search for a place..." className="bg-neutral-600 w-full rounded-lg py-3 px-14" />
                    <img src={searchUrl} alt="search icon" className="absolute top-3 left-5" />
                </div>
                <button className="w-full bg-blue-500 rounded-lg py-3 my-3">Search</button>
            </form>
        </div>
    )
}
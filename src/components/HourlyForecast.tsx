export default function HourlyForecast() {
    return (
        <div className="my-8 bg-[#25253F]">
            <div className="rounded-xl p-4 flex items-center justify-between">
                <h1 className="">Hourly forecast</h1>
                <div className="flex items-center gap-3 bg-[#3C3A5D] px-3 py-1 rounded">
                    <p>Tuesday</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" fill="none" viewBox="0 0 13 8">
                        <path fill="#fff" d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z"/>
                    </svg>
                </div>
            </div>
            <div className="flex justify-between bg-[#3C3A5D] rounded py-2">
                <div className="">
                    <img src="" alt="" />
                    <h1>3PM</h1>
                </div>
                <p>68°</p>
            </div>
        </div>
    )
}
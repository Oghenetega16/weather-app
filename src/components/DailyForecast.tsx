export default function DailyForecast() {

    const dailyForecast = [
        {
            day: "tue",
            image: "/assets/images/icon-rain.webp",
            max: "68°",
            min: "57°"
        },
        {
            day: "wed",
            image: "/assets/images/icon-drizzle.webp",
            max: "70°",
            min: "59°"
        },
        {
            day: "thur",
            image: "/assets/images/icon-sunny.webp",
            max: "75°",
            min: "57°"
        },
        {
            day: "fri",
            image: "/assets/images/icon-overcast.webp",
            max: "77°",
            min: "55°"
        },
        {
            day: "sat",
            image: "/assets/images/icon-storm.webp",
            max: "70°",
            min: "59°"
        },
        {
            day: "sun",
            image: "/assets/images/icon-snow.webp",
            max: "77°",
            min: "61°"
        },
        {
            day: "mon",
            image: "/assets/images/icon-fog.webp",
            max: "75°",
            min: "59°"
        },
    ]

    return (
        <div>
            <h1>Daily forecast</h1>
            <div className="grid grid-cols-3 gap-3">
                {dailyForecast.map((forecast, index) => (
                    <div key={index} className="text-center rounded-lg bg-[#25253F] p-2">
                        <h2 className="capitalize">{forecast.day}</h2>
                        <img src={forecast.image} alt="" />
                        <div className="flex justify-between">
                            <p>{forecast.max}</p>
                            <p>{forecast.min}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
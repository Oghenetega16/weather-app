import type { OpenMeteoResponse } from "../hooks/useOpenMeteo";

type Props = {
    forecast?: OpenMeteoResponse | null;
    loading?: boolean;
};

export default function DailyForecast({ forecast }: Props) {
    const fallbackDaily = [
        { day: "tue", image: "/assets/images/icon-rain.webp", max: "68°", min: "57°" },
        { day: "wed", image: "/assets/images/icon-drizzle.webp", max: "70°", min: "59°" },
        { day: "thur", image: "/assets/images/icon-sunny.webp", max: "75°", min: "57°" },
        { day: "fri", image: "/assets/images/icon-partly-cloudy.webp", max: "77°", min: "55°" },
        { day: "sat", image: "/assets/images/icon-storm.webp", max: "70°", min: "59°" },
        { day: "sun", image: "/assets/images/icon-snow.webp", max: "77°", min: "61°" },
        { day: "mon", image: "/assets/images/icon-fog.webp", max: "75°", min: "59°" },
    ];

    let dailyToRender = fallbackDaily;

    if (forecast && forecast.daily && forecast.daily.time) {
        const daily = forecast.daily;
        dailyToRender = daily.time.map((t, i) => {
        const date = new Date(t);
        const day = date.toLocaleDateString(undefined, { weekday: "short" }).toLowerCase();
        const max = daily.temperature_2m_max && daily.temperature_2m_max[i] != null ? `${Math.round(daily.temperature_2m_max[i])}°` : fallbackDaily[i % fallbackDaily.length].max;
        const min = daily.temperature_2m_min && daily.temperature_2m_min[i] != null ? `${Math.round(daily.temperature_2m_min[i])}°` : fallbackDaily[i % fallbackDaily.length].min;
        const precip = daily.precipitation_sum && daily.precipitation_sum[i] != null ? daily.precipitation_sum[i] : 0;

        let image = "/assets/images/icon-partly-cloudy.webp";
        if (precip > 5) image = "/assets/images/icon-rain.webp";
        else if ((daily.temperature_2m_max && daily.temperature_2m_max[i] != null && Math.round(daily.temperature_2m_max[i]) >= 25)) image = "/assets/images/icon-sunny.webp";
        else if (precip > 0) image = "/assets/images/icon-drizzle.webp";

        return { day, image, max, min };
        });
    }

    return (
        <div className="sm:mt-8 lg:mt-12 xl:mt-7">
            <h1 className="mb-4">Daily forecast</h1>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-7">
                {dailyToRender.map((forecastItem, index) => (
                <div key={index} className="text-center rounded-lg border border-neutral-600 bg-[#25253F] p-2">
                    <h2 className="capitalize">{forecastItem.day}</h2>
                    <img src={forecastItem.image} alt="" className="" />
                    <div className="flex justify-between text-sm sm:text-xs">
                        <p>{forecastItem.max}</p>
                        <p>{forecastItem.min}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

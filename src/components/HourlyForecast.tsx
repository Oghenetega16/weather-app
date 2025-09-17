import { useState } from "react";
import type { OpenMeteoResponse } from "../hooks/useOpenMeteo";

type Props = {
    forecast?: OpenMeteoResponse | null;
    loading?: boolean;
};

export default function HourlyForecast({ forecast }: Props) {
    const [dropDownToggle, setDropDownToggle] = useState(false);
    const [selectDay, setSelectDay] = useState("Tuesday");

    const handleDropDownToggle = () => {
        setDropDownToggle(!dropDownToggle);
    };

    const handleSelectDay = (day: string) => {
        setSelectDay(day);
    };

    const fallbackResults = [
        { image: "/assets/images/icon-overcast.webp", time: "3PM", degree: "68°" },
        { image: "/assets/images/icon-partly-cloudy.webp", time: "4PM", degree: "68°" },
        { image: "/assets/images/icon-sunny.webp", time: "5PM", degree: "68°" },
        { image: "/assets/images/icon-overcast.webp", time: "6PM", degree: "66°" },
        { image: "/assets/images/icon-snow.webp", time: "7PM", degree: "66°" },
        { image: "/assets/images/icon-fog.webp", time: "8PM", degree: "64°" },
        { image: "/assets/images/icon-snow.webp", time: "9PM", degree: "63°" },
        { image: "/assets/images/icon-overcast.webp", time: "10PM", degree: "63°" },
    ];

    let hourlyToRender = fallbackResults;

    if (forecast && forecast.hourly && forecast.hourly.time) {
        const times = forecast.hourly.time;
        const temps = forecast.hourly.temperature_2m ?? [];
        // find first index >= now
        const now = new Date();
        const idx = times.findIndex((t) => new Date(t) >= now);
        const start = idx === -1 ? 0 : idx;
        const slice = times.slice(start, start + 8);
        hourlyToRender = slice.map((tStr, i) => {
        const globalIndex = start + i;
        const date = new Date(tStr);
        const hourLabel = date.toLocaleTimeString(undefined, { hour: "numeric", hour12: true });
        const temp = temps[globalIndex] != null ? `${Math.round(temps[globalIndex])}°` : fallbackResults[i].degree;
        let image = "/assets/images/icon-partly-cloudy.webp";
        if (temps[globalIndex] != null && temps[globalIndex] >= 25) image = "/assets/images/icon-sunny.webp";
        return { image, time: hourLabel, degree: temp };
        });
    }

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="relative my-8 bg-[#25253F] p-4 rounded-xl lg:w-xs lg:my-0">
            <div className="rounded-xl flex items-center justify-between cursor-pointer">
                <h1 className="">Hourly forecast</h1>
                <div className="flex items-center gap-3 bg-[#3C3A5D] px-3 py-1 rounded" onClick={handleDropDownToggle}>
                    <p>{selectDay}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" fill="none" viewBox="0 0 13 8">
                        <path fill="#fff" d="M6.309 7.484 1.105 2.316c-.175-.14-.175-.421 0-.597l.704-.668a.405.405 0 0 1 .597 0l4.219 4.148 4.184-4.148c.175-.176.457-.176.597 0l.703.668c.176.176.176.457 0 .597L6.906 7.484a.405.405 0 0 1-.597 0Z" />
                    </svg>
                </div>
            </div>

            <div className="space-y-3 mt-4">
                {hourlyToRender.map((result, index) => (
                <div key={index} className="flex items-center justify-between bg-[#3C3A5D] border border-neutral-600 rounded px-2 py-1">
                    <div className="flex items-center gap-2">
                        <img src={result.image} alt="" className="w-10" />
                        <h1>{result.time}</h1>
                    </div>
                    <p className="text-sm">{result.degree}</p>
                </div>
                ))}
            </div>

            {dropDownToggle && (
                <div className="absolute top-14 right-4 w-45 space-y-2 rounded-lg bg-[#25253F] px-2 py-2 text-sm border border-neutral-600">
                    {days.map((day, index) => (
                        <div key={index} className={`${selectDay === day ? "bg-[#2F2F49]" : "bg-transparent"} p-1 rounded cursor-pointer`} onClick={() => handleSelectDay(day)}>
                        <p>{day}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

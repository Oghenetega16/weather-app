import Header from "./components/Header";
import SearchPanel from "./components/SearchPanel";
import WeatherReport from "./components/WeatherReport";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import useOpenMeteo from "./hooks/useOpenMeteo";
import ErrorState from "./components/ErrorState";
import NoResultFound from "./components/NoResultFound";

export default function App() {
    const {
        coords,
        data,
        loading,
        geoLoading,
        error,
        searchLocation,
        setCoordinates,
    } = useOpenMeteo({ latitude: null, longitude: null, name: null });

    return (
        <main className="bg-[#02012B] p-4 min-h-screen sm:p-8 font-dmsans lg:py-10 lg:px-16">
            <div className="mx-auto lg:max-w-4xl xl:max-w-5xl">
                <Header />
                <SearchPanel
                    onSearch={(q) => void searchLocation(q)}
                    geolocation={() => {
                        if ("geolocation" in navigator) {
                        navigator.geolocation.getCurrentPosition(
                            (pos) => setCoordinates(pos.coords.latitude, pos.coords.longitude, null),
                            () => setCoordinates(6.5244, 3.3792, "Lagos, Nigeria")
                        );
                        } else {
                        setCoordinates(6.5244, 3.3792, "Lagos, Nigeria");
                        }
                    }}
                    locationName={coords.name ?? null}
                    searching={geoLoading}
                />
                <div className="lg:flex lg:gap-6 lg:justify-center lg:mt-12">
                    <div className="">
                        <WeatherReport forecast={data} loading={loading} error={error} locationName={coords.name ?? null} />
                        <DailyForecast forecast={data} loading={loading} />
                    </div>
                    <div>
                        <HourlyForecast forecast={data} loading={loading} />
                    </div>
                </div>
            </div>
        </main>
    );
}

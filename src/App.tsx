import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import WeatherReport from './components/WeatherReport';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';

export default function App() {
    return (
        <main className="bg-[#02012B] p-4 min-h-screen sm:p-8 font-dmsans lg:w-max-5xl">
            <Header />
            <SearchPanel />
            <div className="lg:flex justify-between gap-4">
                <div className="lg:w-1/2">
                    <WeatherReport />
                    <DailyForecast />
                </div>
                <HourlyForecast />
            </div>
        </main>
    )
}
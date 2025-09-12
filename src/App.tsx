import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import WeatherReport from './components/WeatherReport';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';

export default function App() {
    return (
        <main className="bg-[#02012B] p-4 min-h-screen sm:p-8 font-dmsans lg:py-10 lg:px-15">
            <div className="mx-auto lg:w-4xl xl:w-5xl">
                <Header />
                <SearchPanel />
                <div className="lg:flex lg:gap-4 lg:justify-center lg:mt-12">
                    <div className="lg:w-3xl">
                        <WeatherReport />
                        <DailyForecast />
                    </div>
                    <HourlyForecast />
                </div>
            </div>
        </main>
    )
}
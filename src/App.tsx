import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import WeatherReport from './components/WeatherReport';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';

export default function App() {
    return (
        <main className="bg-[#02012B] p-4 min-h-screen sm:p-8 font-dmsans">
            <Header />
            <SearchPanel />
            <div>
                <div>
                    <WeatherReport />
                    <DailyForecast />
                </div>
                <HourlyForecast />
            </div>
        </main>
    )
}
import { useEffect, useState } from "react";
import sunIcon from "/assets/images/icon-sunny.webp";

export default function WeatherReport() {
    const [deviceType, setDeviceType] = useState('mobile');

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1024) {
                setDeviceType('desktop');
            } else {
                setDeviceType('mobile')
            }
        }
        handleResize()
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])
    
    const reports = [
        {
            heading: "feels like",
            value: "64°"
        },
        {
            heading: "humidity",
            value: "46%"
        }, 
        {
            heading: "wind",
            value: "9 mph"
        },
        {
            heading: "precipitation",
            value: "0 in"
        }
    ]

    return (
        <div className="sm:flex sm:items-center sm:gap-5 md:justify-center lg:flex-col lg:items-start lg:gap-6">
            <div className="relative mt-7 lg:mt-0 sm:w-4/5 md:w-3/5 lg:w-full">
                {deviceType === 'mobile' ? 
                    <div className={`w-full h-80 bg-[url('./assets/images/bg-today-small.svg')] bg-no-repeat bg-contain rounded-lg`}></div> :  
                    <div className={`w-full h-60 bg-[url('./assets/images/bg-today-large.svg')] bg-no-repeat bg-cover rounded-2xl`}></div> }
                <div className="w-full px-10 space-y-4 absolute -top-12 translate-y-1/2 flex flex-col text-center sm:w-fit lg:w-full lg:flex-row lg:justify-between lg:items-center lg:top-0 lg:px-5 lg:text-left">
                    <div>
                        <h1 className="font-semibold tracking-wide text-2xl mb-1">Berlin, Germany</h1>
                        <span className="text-neutral-300">Tuesday, Sept 8, 2025</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <img src={sunIcon} alt="sun" className="w-30" />
                        <i className="text-8xl font-bold">68°</i>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 my-5 sm:mt-12 lg:w-full lg:grid-cols-4 lg:gap-4 lg:my-0">
                {reports.map((report, index) => (
                    <div key={index} className="bg-[#25253F] rounded-xl border border-neutral-600 p-5 sm:text-center sm:h-30 lg:text-left lg:w-full lg:h-fit lg:py-4"> 
                        <p className="capitalize text-neutral-300 mb-3 sm:text-xs lg:text-base">{report.heading}</p>
                        <h1 className="text-3xl font-light sm:text-2xl lg:text-2xl xl:text-3xl">{report.value}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}
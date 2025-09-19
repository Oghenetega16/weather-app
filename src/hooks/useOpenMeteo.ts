import { useEffect, useRef, useState } from "react";

/* --- Types for Open-Meteo (partial — only the fields we use) --- */
export type OpenMeteoHourly = {
    time: string[];
    temperature_2m?: number[];
    relative_humidity_2m?: number[];
    windspeed_10m?: number[];
    precipitation?: number[];
};

export type OpenMeteoDaily = {
    time: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_sum?: number[];
};

export type OpenMeteoResponse = {
    latitude: number;
    longitude: number;
    generationtime_ms?: number;
    timezone?: string;
    hourly?: OpenMeteoHourly;
    daily?: OpenMeteoDaily;
    // `current_weather` and other fields may exist, but are optional for our use
    current_weather?: {
        temperature: number;
        windspeed: number;
        time: string;
    };
};

type Coords = {
    latitude: number | null;
    longitude: number | null;
    name?: string | null;
};

export default function useOpenMeteo(initial: Coords = { latitude: null, longitude: null, name: null }) {
    const [coords, setCoords] = useState<Coords>(initial);
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [geoLoading, setGeoLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    async function searchLocation(query: string) {
        if (!query || !query.trim()) return null;
        setGeoLoading(true);
        setError(null);
        try {
            const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Geocoding failed (${res.status})`);
            const json = await res.json();

            if (json?.results?.length > 0) {
                const { latitude, longitude, name, country, admin1 } = json.results[0];
                const pretty = `${name}${admin1 ? ", " + admin1 : ""}${country ? ", " + country : ""}`;
                setCoords({ latitude, longitude, name: pretty });
                setGeoLoading(false);
                return { latitude, longitude, name: pretty };
            } else {
                setGeoLoading(false);
                throw new Error("Location not found");
            }
        } catch (err: any) {
            setGeoLoading(false);
            setError(err instanceof Error ? err : new Error(String(err)));
            return null;
        }
    }

    function setCoordinates(latitude: number, longitude: number, name: string | null = null) {
        setCoords({ latitude, longitude, name });
    }

    // try to get browser geolocation once if coords are empty
    useEffect(() => {
        if (coords.latitude != null && coords.longitude != null) return;
        if (!("geolocation" in navigator)) return;
        const geoOpts: PositionOptions = { timeout: 8000 };
        navigator.geolocation.getCurrentPosition(
            (pos) => setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude, name: null }),
            () => {
                // silent fail — UI can provide default fallback if desired
            },
                geoOpts
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (coords.latitude == null || coords.longitude == null) return;

        const hourlyVars = ["temperature_2m", "relative_humidity_2m", "windspeed_10m", "precipitation"];
        const dailyVars = ["temperature_2m_max", "temperature_2m_min", "precipitation_sum"];

        // keep default timezone to Africa/Lagos per your UI; change to "auto" if preferred
        const tz = "Africa/Lagos";
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(
        String(coords.latitude)
        )}&longitude=${encodeURIComponent(String(coords.longitude))}&hourly=${encodeURIComponent(
        hourlyVars.join(",")
        )}&daily=${encodeURIComponent(dailyVars.join(","))}&forecast_days=7&timezone=${encodeURIComponent(tz)}`;

        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        setError(null);

        fetch(url, { signal: controller.signal })
        .then(async (res) => {
            if (!res.ok) {
            const txt = await res.text().catch(() => "");
            throw new Error(`Open-Meteo error ${res.status}: ${txt}`);
            }
            const json: OpenMeteoResponse = await res.json();
            setData(json);
            setLoading(false);
        })
        .catch((err: any) => {
            if (err?.name === "AbortError") return;
            setError(err instanceof Error ? err : new Error(String(err)));
            setLoading(false);
        });

        return () => controller.abort();
    }, [coords.latitude, coords.longitude, coords.name]);

    return {
        coords,
        data,
        loading,
        geoLoading,
        error,
        searchLocation,
        setCoordinates,
    } as const;
}

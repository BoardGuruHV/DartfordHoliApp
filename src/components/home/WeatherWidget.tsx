"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";

interface WeatherData {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  precipitation: number;
}

const WEATHER_DESCRIPTIONS: Record<number, { label: string; icon: string }> = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mainly clear", icon: "🌤️" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Foggy", icon: "🌫️" },
  48: { label: "Icy fog", icon: "🌫️" },
  51: { label: "Light drizzle", icon: "🌦️" },
  53: { label: "Drizzle", icon: "🌦️" },
  55: { label: "Heavy drizzle", icon: "🌧️" },
  61: { label: "Light rain", icon: "🌧️" },
  63: { label: "Rain", icon: "🌧️" },
  65: { label: "Heavy rain", icon: "🌧️" },
  80: { label: "Light showers", icon: "🌦️" },
  81: { label: "Showers", icon: "🌧️" },
  82: { label: "Heavy showers", icon: "⛈️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
};

function getWeatherInfo(code: number) {
  return WEATHER_DESCRIPTIONS[code] || { label: "Unknown", icon: "🌡️" };
}

// Dartford coordinates
const LAT = 51.4462;
const LON = 0.2148;

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code,wind_speed_10m,precipitation&timezone=Europe%2FLondon`
        );
        if (!res.ok) throw new Error("Weather fetch failed");
        const data = await res.json();
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code,
          windSpeed: Math.round(data.current.wind_speed_10m),
          precipitation: data.current.precipitation,
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 15 minutes
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (error || (!loading && !weather)) return null;

  if (loading) {
    return (
      <div className="px-4">
        <Card className="animate-pulse">
          <div className="h-12 bg-white/5 rounded-lg" />
        </Card>
      </div>
    );
  }

  const info = getWeatherInfo(weather!.weatherCode);
  const isRainy = weather!.precipitation > 0;

  return (
    <div className="px-4">
      <Card className={isRainy ? "border-blue-500/30" : "border-yellow-500/20"}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{info.icon}</span>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{weather!.temperature}°C</span>
                <span className="text-sm text-white/60">{info.label}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/60 mt-0.5">
                <span>💨 {weather!.windSpeed} km/h</span>
                {isRainy && <span>🌧️ {weather!.precipitation} mm</span>}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-white/60 block">Dartford</span>
            <span className="text-xs text-white/60">Live weather</span>
          </div>
        </div>
        {isRainy && (
          <p className="text-xs text-blue-300/70 mt-2 pt-2 border-t border-white/5">
            ☂️ Rain expected — bring a waterproof layer or poncho!
          </p>
        )}
      </Card>
    </div>
  );
}

import type  { Coordinates, WeatherData, ForecastData, GeocodingResponse  } from "./types";
import { API_CONFIG } from "./config";

class WeatherAPI {
    private createUrl( 
        endpoint: string,   //api path like /weather or /forecast
        params: Record<string, string | number>) {  //params be the set of query paramaeter like q: "london", unit: "metric" lat, lon etc

            const searchParams  = new URLSearchParams({
                appid: API_CONFIG.API_KEY, // add your api key
                ...params,   // add a extra paramas
            });
            return `${endpoint}?${searchParams.toString()}`;  //builds the final url
    }

    private async fetchData<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        return response.json();
    }

    async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> { //
const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
    lat: lat.toString(),
    lon: lon.toString(),
    units: API_CONFIG.DEFAULT_PARAMS.units,  
});
return this.fetchData<WeatherData>(url);     
    }

     async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
    lat: lat.toString(),
    lon: lon.toString(),
    units: API_CONFIG.DEFAULT_PARAMS.units,
});
return this.fetchData<ForecastData>(url);
    }

 async reverseGeocode({ lat, lon }: Coordinates): Promise<GeocodingResponse[]> {
const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
    lat: lat.toString(),
    lon: lon.toString(),
limit: 1, 
});
return this.fetchData<GeocodingResponse[]>(url);
    }



 async searchLocations(query: string ): Promise<GeocodingResponse[]> {
const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
    q: query,
    limit: 5,
});
return this.fetchData<GeocodingResponse[]>(url);
    }
}

export const weatherAPI = new WeatherAPI();
import axios from "axios";

export const countriesAPI = axios.create({
    baseURL: "https://restcountries.com/v3.1/all"
})

export const weatherAPI = axios.create({
    baseURL: "https://openweathermap.org/api"
})
import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { APP_NAME, STORAGE_KEYS } from "./app";

const APIURL = "https://assistance-sharing-app-16deacfd1740.herokuapp.com";

const getToken = () => {
  if (typeof window !== "undefined") {
    try {
      const store = JSON.parse(
        window["localStorage"][`${APP_NAME}-${STORAGE_KEYS.auth}`],
      );

      const apiToken = store && store.token;

      return apiToken ? `Bearer ${apiToken}` : "";
    } catch (error) {
      console.log({error})
      return "";
    }
  }
};

const getApiConfig = (url?: string, contentType = "application/json") => {
  return {
    baseURL: url,
    headers: {
      "Content-Type": contentType,
      Authorization: getToken(),
      Accept: "*/*",
      // 'Access-Control-Allow-Origin': '*',
      // ngrokSkipBrowserWarning: "true"
    },
    timeout: 10000,
  }
}

const axiosInstance = axios.create(getApiConfig(APIURL));

const axiosInstanceWithMultiPart = axios.create(getApiConfig(APIURL, "multipart/form-data"));

const interceptRequestFor = (instance: AxiosInstance) => {

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        toast.error("Session expired. Please sync account.");
      }
      return Promise.reject(error);
    },
  );
}

interceptRequestFor(axiosInstance)
interceptRequestFor(axiosInstanceWithMultiPart)


export { axiosInstance, axiosInstanceWithMultiPart };

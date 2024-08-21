import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { socket } from "../services/Auth";

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3333",
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }
  private initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const socketId = socket.id;
        if (socketId && config.headers) {
          config.headers["socket-id"] = socketId;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
        }
        return Promise.reject(error);
      }
    );
  }

  public get<T>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public post<T>(
    url: string,
    data: any,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public put<T>(
    url: string,
    data: any,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public delete<T>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}

export default new ApiService();

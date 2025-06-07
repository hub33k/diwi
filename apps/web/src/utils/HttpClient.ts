import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { env } from '~/env';

export type TAxiosErrorInterceptor = (error: AxiosError) => AxiosError;

export interface IHttpClientOptions {
  url: string;
  accessToken?: string;
  useRequestConfig?: (
    requestConfig: InternalAxiosRequestConfig,
  ) => Promise<InternalAxiosRequestConfig>;
  onErrorInterceptor?: TAxiosErrorInterceptor;
}

export interface IHttpClient {
  get: <TReturnType>(
    url: string,
    config?: { params?: Record<string, unknown> },
  ) => Promise<TReturnType>;
  post: <TRequestDataType, TReturnType = void>(
    url: string,
    requestData: TRequestDataType,
    config?: AxiosRequestConfig,
  ) => Promise<TReturnType>;
  patch: <TRequestDataType, TReturnType = void>(
    url: string,
    requestData: TRequestDataType,
    config?: AxiosRequestConfig,
  ) => Promise<TReturnType>;
  put: <TRequestDataType, TReturnType = void>(
    url: string,
    requestData: TRequestDataType,
    config?: AxiosRequestConfig,
  ) => Promise<TReturnType>;
  delete<TReturnType>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TReturnType>;
}

export class HttpClient implements IHttpClient {
  private static instance: HttpClient;
  private readonly client: AxiosInstance;
  private readonly options: IHttpClientOptions;

  constructor(options: IHttpClientOptions) {
    this.options = options;
    this.client = axios.create({
      baseURL: this.options.url,
      headers: this.getHeaders(),
    });

    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // const session = await getSession();
        // if (session?.tokens?.accessToken) {
        //   config.headers.Authorization = `Bearer ${session.tokens.accessToken}`;
        // }

        return this.options.useRequestConfig
          ? this.options.useRequestConfig(config)
          : config;
      },
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        return this.options.onErrorInterceptor
          ? Promise.reject(this.options.onErrorInterceptor(error))
          : Promise.reject(error);
      },
    );
  }

  public static getInstance(options: IHttpClientOptions): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(options);
    }
    return HttpClient.instance;
  }

  public async get<TReturnType>(
    url: string,
    { params }: { params?: Record<string, unknown> } = {},
  ): Promise<TReturnType> {
    const { data } = await this.client.get<TReturnType>(url, { params });
    return data;
  }

  public async post<TRequestDataType, TReturnType = void>(
    url: string,
    requestData: TRequestDataType,
    config?: AxiosRequestConfig,
  ): Promise<TReturnType> {
    const { data } = await this.client.post<
      TRequestDataType,
      AxiosResponse<TReturnType>
    >(url, requestData, config);
    return data;
  }

  public async put<TRequestDataType, TReturnType = void>(
    url: string,
    requestData: TRequestDataType,
    config?: AxiosRequestConfig,
  ): Promise<TReturnType> {
    const { data } = await this.client.put<
      TRequestDataType,
      AxiosRequestConfig
    >(url, requestData, config);

    return data;
  }

  public async patch<TRequestDataType, TReturnType = void>(
    url: string,
    requestData: TRequestDataType,
    config?: AxiosRequestConfig,
  ): Promise<TReturnType> {
    const { data } = await this.client.patch<
      TRequestDataType,
      AxiosResponse<TReturnType>
    >(url, requestData, config);
    return data;
  }

  public async delete<TRequestDataType, TReturnType = void>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TReturnType> {
    const { data } = await this.client.delete<
      TRequestDataType,
      AxiosResponse<TReturnType>
    >(url, config);

    return data;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(this.options.accessToken
        ? { Authorization: `Bearer ${this.options.accessToken}` }
        : {}),
    };
  }
}

export const createHttpClient = () => {
  return HttpClient.getInstance({ url: env.API_URL });
};

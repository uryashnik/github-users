import { useState, useMemo, useCallback, FunctionComponent } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface Config<D> extends AxiosRequestConfig<D> {
    url: string;
}

type ResultData<Q, R> = {
    isLoading: boolean;
    response: R | null;
    errorMsg: Error | null;
    load: (data: Q) => void;
};

const initialParams: AxiosRequestConfig = {
    method: "post",
    responseType: "json",
};

export function useRequest<QueryParams, Response>(
    userSettings: Config<QueryParams>,
    isClearpreviousResponseData = false
): ResultData<QueryParams, Response> {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<Response | null>(null);
    const [errorMsg, setErrorMsg] = useState<Error | null>(null);

    const params = useMemo(
        () => ({ ...initialParams, ...userSettings }),
        [userSettings]
    );

    const load = useCallback(
        async (data: QueryParams) => {
            try {
                setIsLoading(true);
                setErrorMsg(null);
                if (isClearpreviousResponseData) {
                    setResponse(null);
                }
                console.log(params);
                let response: AxiosResponse<Response, QueryParams>;
                if (params.method === "post") {
                    response = await axios.post<Response>(
                        params.url,
                        JSON.stringify({
                            ...params.data,
                            ...data,
                        })
                    );
                } else {
                    const query: string[] = [];
                    for (let key in data) {
                        query.push(`${key}=${data[key]}`);
                    }
                    response = await axios.get<Response>(
                        params.url + (query.length ? `?${query.join("&")}` : "")
                    );
                }

                setResponse(response.data);
                console.log(params);
            } catch (e) {
                if (e instanceof Error) {
                    setErrorMsg(e);
                    console.log(e);
                }
            } finally {
                setIsLoading(false);
            }
        },
        [params]
    );

    return { isLoading, response, errorMsg, load };
}
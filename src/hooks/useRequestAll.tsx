import { useCallback, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

type State<R> = { isLoading: boolean; data: R[] | null; error: null | Error };
type Data = {
    nick: string;
};

interface Config<D> extends AxiosRequestConfig<D> {
    url: string;
}

export function useRequestAll<R>(
    config: Config<Data>
): [boolean, R[] | null, Error | null, (datas: Data[]) => void] {
    const [state, setState] = useState<State<R>>({
        isLoading: false,
        data: null,
        error: null,
    });

    const loadAll = useCallback(async (datas: Data[]) => {
        setState((prev) => ({ ...prev, isLoading: true }));
        try {
            const promises = datas.map((data) =>
                axios.get<R>(config.url.replace("nickname", data.nick))
            );
            const responses = await Promise.all(promises);
            setState({
                isLoading: false,
                data: responses.map((resp) => resp.data),
                error: null,
            });
        } catch (e) {
            if (e instanceof Error) {
                setState({
                    isLoading: false,
                    data: null,
                    error: e,
                });
            }
            console.warn(e);
        }
    }, []);

    return [state.isLoading, state.data, state.error, loadAll];
}

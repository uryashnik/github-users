import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useRequest } from "../../../hooks/useRequest";
import { Users } from "./main";
import debounce from "lodash.debounce";

export type Data = {
    q: string;
};

interface IProps {
    onSuccess: (collection: Users) => void;
}

const Form = ({ onSuccess }: IProps) => {
    const [query, setQuery] = useState("");
    const {
        isLoading,
        response: collection,
        errorMsg,
        load,
    } = useRequest<Data, Users>({
        url: "https://api.github.com/search/users",
        method: "get",
    });

    const sendQuery = useCallback(
        debounce((query) => load({ q: query }), 300),
        []
    );

    useEffect(() => {
        if (query) {
            sendQuery(query);
        }
    }, [query]);

    useEffect(() => {
        if (collection) {
            onSuccess(collection);
        }
    }, [collection]);

    return (
        <div>
            <input
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setQuery(e.target.value)
                }
            />
        </div>
    );
};

export default Form;

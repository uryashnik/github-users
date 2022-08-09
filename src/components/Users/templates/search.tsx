import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useRequest } from "../../../hooks/useRequest";
import { UserDetails } from "./main";
import debounce from "lodash.debounce";
import Preview from "./preview";
import { useRequestAll } from "../../../hooks/useRequestAll";
import css from "../scss/search.module.scss";

export interface User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    score: string;
}

export type ResponseUsers = {
    total_count: number;
    incomplete_results: boolean;
    items: User[];
};

export type Data = {
    q: string;
};

interface IProps {
    list: UserDetails[];
    onSuccess: (collection: UserDetails[]) => void;
}

const Form = ({ onSuccess, list }: IProps) => {
    const [query, setQuery] = useState("");
    const [isLoadingUsers, users, errorUser, load] = useRequest<
        Data,
        ResponseUsers
    >(
        {
            url: "https://api.github.com/search/users",
            method: "get",
        },
        false
    );
    const [isLoadingExtendedInfo, extendedInfo, errorExtendedInfo, loadAll] =
        useRequestAll<UserDetails>({
            url: "https://api.github.com/users/nickname",
        });

    const sendQuery = useCallback(
        debounce((query) => {
            load({ q: query });
            onSuccess([]);
        }, 300),
        [onSuccess]
    );

    const fetchExtendedInfo = () => {
        const queryParams = users?.items.map((user) => ({
            nick: user.login,
        }));
        if (queryParams?.length) {
            loadAll(queryParams);
        }
    };

    useEffect(() => {
        if (query) {
            sendQuery(query);
        }
    }, [query]);

    useEffect(() => {
        if (users) {
            fetchExtendedInfo();
        }
    }, [users]);

    useEffect(() => {
        if (extendedInfo) {
            onSuccess(extendedInfo);
        }
    }, [extendedInfo]);

    return (
        <div>
            <input
                className={css.input}
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setQuery(e.target.value)
                }
            />
            {isLoadingUsers || isLoadingExtendedInfo ? (
                "Loading..."
            ) : errorUser ? (
                <div>
                    <div>{errorUser.message}</div>
                    <button onClick={() => load({ q: query })}>
                        Повторить
                    </button>
                </div>
            ) : errorExtendedInfo ? (
                <div>
                    <div>{errorExtendedInfo.message}</div>
                    <button onClick={() => fetchExtendedInfo()}>
                        Повторить
                    </button>
                </div>
            ) : list ? (
                list.map((user) => (
                    <Preview
                        key={user.id}
                        avatar={user.avatar_url}
                        login={user.login}
                        repositories={user.public_repos || 0}
                    />
                ))
            ) : null}
        </div>
    );
};

export default Form;

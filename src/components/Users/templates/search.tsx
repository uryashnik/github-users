import { useState, useEffect, useCallback, ChangeEvent, useMemo } from "react";
import { useRequest } from "../../../hooks/useRequest";
import { Users, User, Repository } from "./main";
import debounce from "lodash.debounce";
import Preview from "./preview";
import { useRequestAll } from "../../../hooks/useRequestAll";

export type ResponseUsers = {
    total_count: number;
    incomplete_results: boolean;
    items: User[];
};

export type Data = {
    q?: string;
};

interface IProps {
    onSuccess: (collection: Users) => void;
}

function parser(response: ResponseUsers): Users {
    const result: Users = {};
    response.items.forEach((user) => (result[user.login] = user));
    return result;
}

const Form = ({ onSuccess }: IProps) => {
    const [data, setData] = useState<Users>({});
    const [query, setQuery] = useState("");
    const [isLoadingUsers, responseUser, errorMsg, load] = useRequest<
        Data,
        ResponseUsers
    >(
        {
            url: "https://api.github.com/search/users",
            method: "get",
        },
        false
    );
    const [isLoadingRepos, repos, errorRepos, loadAll] = useRequestAll<
        Repository[]
    >({
        url: "https://api.github.com/users/nickname/repos",
    });
    const users = useMemo(() => {
        const result: Users = {};
        responseUser?.items.forEach((user) => (result[user.login] = user));
        return result ? result : null;
    }, [responseUser]);

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
        if (users) {
            const data = Object.keys(users).map((key) => ({ nick: key }));
            loadAll(data);
        }
    }, [users]);

    useEffect(() => {
        if (repos) {
            console.log("effect repos prepeare");

            const result: Users = { ...users };
            repos.forEach((items) => {
                const login = items[0].owner.login;
                if (login && result[login]) {
                    result[login].repos = items;
                }
            });
            console.log("prepeare repos: ", result);

            setData(result);
            onSuccess(result);
        }
    }, [repos]);

    return (
        <>
            <input
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setQuery(e.target.value)
                }
            />
            {data
                ? Object.values(data).map((user) => (
                      <Preview
                          key={user.id}
                          avatar={user.avatar_url}
                          login={user.login}
                          repositories={user.repos?.length || 0}
                      />
                  ))
                : null}
        </>
    );
};

export default Form;

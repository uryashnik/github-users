import { useState, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import css from "../scss/main.module.scss";
import { Outlet } from "react-router-dom";
import Search from "./search";
import Details from "./details";

export type UserDetails = {
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
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: string;
    bio: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
};

const Users = () => {
    const [users, setUsers] = useState<UserDetails[]>([]);
    const handleUser = useCallback(
        (users: UserDetails[]) => setUsers(users),
        []
    );

    return (
        <div>
            <h1 className={css.title}>GitHub Searcher</h1>
            <Routes>
                <Route
                    path="/"
                    element={<Search onSuccess={handleUser} list={users} />}
                />
                <Route path=":login" element={<Details list={users} />} />
            </Routes>
            <Outlet />
        </div>
    );
};

export default Users;

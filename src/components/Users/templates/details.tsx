import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserDetails } from "./main";
import css from "../scss/details.module.scss";
import { useRequest } from "../../../hooks/useRequest";

interface IProps {
    list: UserDetails[];
}

type Repository = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
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
    };
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url: null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: {
        key: string;
        name: string;
        spdx_id: string;
        url: string;
        node_id: string;
    };
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: [];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
};

const Details = ({ list }: IProps) => {
    const { login } = useParams();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [isLoading, repos, error, load] = useRequest<null, Repository[]>({
        url: `https://api.github.com/users/${login}/repos`,
        method: "get",
    });
    const current = list.find((user) => user.login === login);

    useEffect(() => {
        if (current) {
            load(null);
        } else {
            navigate("/users");
        }
    }, [current]);

    const filtered = query
        ? repos?.filter((repo) =>
              repo.name?.toLowerCase().includes(query.toLowerCase())
          )
        : repos;

    return (
        <div className={css.root}>
            <div>
                {current ? (
                    <>
                        <div className={css.info}>
                            <img
                                className={css.avatar}
                                src={current.avatar_url}
                                alt="user avatar"
                            />
                            <div>
                                <div>{current.login}</div>
                                <div>{current.email}</div>
                                <div>{current.location}</div>
                                <div>
                                    {new Date(
                                        current.created_at
                                    ).toLocaleDateString()}
                                </div>
                                <div>{current.followers} Followers</div>
                                <div>Following {current.following}</div>
                            </div>
                        </div>
                        {current.bio && (
                            <div className={css.bio}>{current.bio}</div>
                        )}
                        {isLoading ? (
                            "Loading Repositories ..."
                        ) : error ? (
                            error.message
                        ) : (
                            <>
                                <input
                                    className={css.input}
                                    type="text"
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => setQuery(e.target.value)}
                                />
                                {filtered?.length ? (
                                    <table>
                                        <tbody>
                                            {filtered.map((repo) => (
                                                <tr
                                                    className={css.repository}
                                                    key={repo.id}
                                                >
                                                    <td className={css.name}>
                                                        {repo.name}
                                                    </td>
                                                    <td className={css.stats}>
                                                        <div
                                                            className={css.item}
                                                        >
                                                            {repo.forks_count}
                                                            &nbsp;Forks
                                                        </div>
                                                        <div
                                                            className={css.item}
                                                        >
                                                            {
                                                                repo.stargazers_count
                                                            }
                                                            &nbsp;Stars
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    " No results"
                                )}
                            </>
                        )}
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Details;

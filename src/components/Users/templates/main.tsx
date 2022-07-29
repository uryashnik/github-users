import {
    useState,
    useEffect,
    useCallback,
    SyntheticEvent,
    ChangeEvent,
} from "react";
import { useParams } from "react-router-dom";
import css from "../scss/index.module.scss";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from "./form";

export type User = {
    id: number;
    email: string;
    first_name: string;
};

export type Users = {
    total_count: User[];
    incomplete_results: boolean;
    items: User[];
};

const Users = () => {
    const { nickname } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);

    // useEffect(() => {
    //     if (nickname && !collection) navigate("/users");
    // }, []);

    return (
        <div className={css.root}>
            Users
            <Form
                onSuccess={(collection: Users) => setUsers(collection.items)}
            />
            <Outlet />
        </div>
    );
};

export default Users;

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserDetails } from "./main";

interface IProps {
    list: UserDetails[];
}

const Details = ({ list }: IProps) => {
    const { login } = useParams();
    const navigate = useNavigate();
    const current = list.find((user) => user.login === login);

    useEffect(() => {
        if (!current) {
            navigate("/users");
        }
    }, [current]);

    return (
        <div>
            <div>User Details</div>
            <div>{current ? <div></div> : null}</div>
        </div>
    );
};

export default Details;

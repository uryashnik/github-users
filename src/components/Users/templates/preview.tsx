import css from "../scss/preview.module.scss";
import { useNavigate } from "react-router-dom";

interface IProps {
    avatar: string;
    login: string;
    repositories: number;
}

const Preview = ({ avatar, login, repositories }: IProps) => {
    const navigate = useNavigate();

    return (
        <div className={css.root} onClick={() => navigate(`/users/${login}`)}>
            <img className={css.image} src={avatar} alt="avatar" />
            <span>Пользователь: {login}</span>
        </div>
    );
};

export default Preview;

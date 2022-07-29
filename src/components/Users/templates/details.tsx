import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface IProps {
    [index: string]: string;
}
const Details = ({}: IProps) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/users");
    }, []);
    return <div>User Details</div>;
};

export default Details;

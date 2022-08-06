import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRequestAll } from "../../../hooks/useRequestAll";

interface IProps {
    [index: string]: string;
}

const Details = ({}: IProps) => {
    // const { isLoading, response, error, loadAll } = useRequestAll({
    //     url: "https://api.github.com/users/nickname/repos",
    // });
    // useEffect(() => {
    //     console.log("useEffect");
    //     loadAll([
    //         { nick: "urys" },
    //         { nick: "urysarabia" },
    //         { nick: "uryswk" },
    //         { nick: "uryashnik" },
    //     ]);
    // }, []);
    return <div>User Details</div>;
};

export default Details;

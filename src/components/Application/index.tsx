import Users from "../Users";
import Details from "../Users/templates/details";
import css from "./scss/index.module.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

interface Props {
    [index: string]: any;
}
const Application = ({}: Props) => {
    useEffect(() => {
        console.log("useEffect in application");
    }, []);
    return (
        <Router>
            <main className={css.root}>
                <Routes>
                    <Route path="/users/*" element={<Users />}></Route>
                    <Route path="*" element={<p>404 page not found</p>} />
                </Routes>
            </main>
        </Router>
    );
};

Application.propTypes = {};

export default Application;

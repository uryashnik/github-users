import Users from "../Users";
import Details from "../Users/templates/details";
import css from "./scss/index.module.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

interface Props {
    [index: string]: any;
}
const Application = ({}: Props) => {
    return (
        <Router>
            <main className={css.root}>
                <Routes>
                    <Route path="/users" element={<Users />}>
                        <Route path=":nickname" element={<Details />} />
                    </Route>
                    <Route path="*" element={<p>404 page not found</p>} />
                </Routes>
            </main>
        </Router>
    );
};

Application.propTypes = {};

export default Application;

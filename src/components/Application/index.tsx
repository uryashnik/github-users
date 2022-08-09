import Users from "../Users";
import css from "./scss/index.module.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../Main";

const Application = () => (
    <Router>
        <main className={css.root}>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/users/*" element={<Users />}></Route>
                <Route path="*" element={<p>404 page not found</p>} />
            </Routes>
        </main>
    </Router>
);

export default Application;

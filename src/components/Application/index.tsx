import Dashboard from "../Dashboard";
import css from "./scss/index.module.scss";

interface Props {
    [index: string]: any;
}
const Application = () => {
    return (
        <div className={css.root}>
            <Dashboard />
        </div>
    );
};

Application.propTypes = {};

export default Application;

import { Outlet } from "react-router";
import { Header } from "./Header/Header";
 

const DefaultLayout: React.FC = () => {
    return (
        <main className="page">
            <Header />
            <div className="page__content">
                <Outlet />
            </div>
        </main>
    );
}

export { DefaultLayout };
import { Outlet } from "react-router";
 

const HeaderlessLayout: React.FC = () => {
    return (
        <main className="page">
            <div className="page__content">
                <Outlet />
            </div>
        </main>
    );
}

export { HeaderlessLayout };
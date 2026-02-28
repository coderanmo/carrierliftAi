import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

export default function PublicLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

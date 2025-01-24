import { Routes, Route } from 'react-router-dom';

import DashgboardPage from '../pages/dashboard'
import UsersPage from '../pages/users';
import { MainLayout } from '../layouts/MainLayout';

export function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path="/" element={<DashgboardPage />} />
                <Route path="/users" element={<UsersPage />} />
            </Route>
        </Routes>
    )
}


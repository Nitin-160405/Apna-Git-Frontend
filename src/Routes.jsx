import { useEffect } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';


//Pages List

import Dashboard from './components/dashboard/Dashboard';
import CreateRepo from './components/repo/CreateRepo';
import Profile from './components/user/Profile';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';


//Auth Context
import { getStoredUserId, useAuth } from './auth';

const ProjectRoutes = ()=>{
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(()=>{
    const userIdFromStorage = getStoredUserId();
    const isAuthenticated = Boolean(userIdFromStorage);

    if (!isAuthenticated) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    }

    if(isAuthenticated && currentUser !== userIdFromStorage){
        setCurrentUser(userIdFromStorage);
    }
    if(!isAuthenticated && currentUser){
        setCurrentUser(null);
    }
    if(!isAuthenticated && !["/auth", "/signup"].includes(pathname))
    {
        navigate("/auth", { replace: true });

    }
    }, [currentUser, navigate, pathname, setCurrentUser]);

    let element = useRoutes([
        {
            path:'/',
            element:<Dashboard/>
        },
        {
            path:'/auth',
            element:<Login/>
        },
                {
            path:'/signup',
            element:<Signup/>
        },
                {
            path:'/profile',
            element:<Profile/>
        },
                        {
            path:'/create',
            element:<CreateRepo/>
        }
    ]);
    return element;
}

export default ProjectRoutes;

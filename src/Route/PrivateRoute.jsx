import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const navigate = useNavigate()
    if (loading) {
        return <div>Loading...</div>
    }
    if(user){
        return children
    }
   else{
    navigate('/login')
   }
};

export default PrivateRoute;
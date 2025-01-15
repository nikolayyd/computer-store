import { useEffect, useState } from 'react';
import '../styles/Profile.css'
import userService from '../services/UserService';
function Profile() {

    const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(null);


    const updateUser = async () => {
        const userData = await userService.getUser();
        setUser(userData);
    }
    useEffect(() => {
        updateUser();
    }, []);

    return (
        <div className='profile-container'>
            <h1>My Profile</h1>
            {user && <div className='profile-info'>
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>}
        </div>
    );
}

export default Profile;
import React, { useState, useEffect } from 'react';
import { auth } from '../utils/FirebaseConfig';
// import { fetchUserDataByUserId, updateUserDataByUserId } from '../dataApi/fetchUserHandleByUserId';
import { fetchUserDataByUserId } from '../dataApi/fetchUserHandleByUserId';

const UserProfileDetails: React.FC = () => {
    const user = auth.currentUser;
    const [displayName, setDisplayName] = useState('');
    const [contactEmail, setContactEmail] = useState('');

    useEffect(() => {
        if (user?.uid) {
            fetchUserDataByUserId(user.uid)
                .then((userData) => {
                    if (userData) {
                        setDisplayName(userData.userHandle || '');
                        setContactEmail(userData.email || '');
                    }
                });
        }
    }, [user?.uid]);

    return (
        <div className="card" style={{ backgroundColor: 'var(--bs-body-bg)', color: 'var(--bs-body-color)' }}>
            <div className="card-body">
                <h5 className="card-title">User Profile</h5>
                <p className="card-text">
                    <strong>Display Name: </strong> 
                    
                    {displayName}
                </p>
                <p className="card-text">
                    <strong>Optional Contact Email: </strong>
                   
                    {contactEmail}
                </p>
                <p className="card-text"><strong>UID:</strong> {user?.uid}</p> 
                <p>To update or delete your profile, please use the <a href="/ContactUs">Contact Us Page.</a></p>   
            </div>
        </div>
    );
};

export default UserProfileDetails;

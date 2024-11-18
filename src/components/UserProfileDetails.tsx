import React, { useState } from 'react';
import { auth } from '../utils/FirebaseConfig';
import User from '../model/User';
import createOrUpdateUser from '../dataApi/UpdateUserDetails';

const UserProfileDetails: React.FC = () => {
    const user = auth.currentUser;
    const userId = new URLSearchParams(window.location.search).get('userId');
    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [responseMessage, setResponseMessage] = useState('');
    const [responseStatus, setResponseStatus] = useState('');
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        const response = await createOrUpdateUser({
            uid: user?.uid,
            userHandle: displayName,
            email: user?.email || ''
        } as User);
        const [status, message] = response || ["", ""];
        if (status === "0") {
            setIsEditing(false);
            setResponseMessage(message);
            setResponseStatus(status);
        } else {
            setResponseMessage(message);
            setResponseStatus(status);
        }
    };

    return (
        <div className="card" style={{ backgroundColor: 'var(--bs-body-bg)', color: 'var(--bs-body-color)' }}>
            <div className="card-body">
                <h5 className="card-title">User Profile</h5>
                <p className="card-text">
                    <strong>Display Name:</strong> 
                    {isEditing ? (
                        <input 
                            type="text" 
                            value={displayName} 
                            onChange={(e) => setDisplayName(e.target.value)} 
                        />
                    ) : (
                        user?.displayName
                    )}
                </p>
                <p className="card-text">
                    <strong>Email:</strong> 
                    {user?.email}
                </p>
                <p className="card-text"><strong>UID:</strong> {user?.uid}</p>
                {user?.uid === userId && (
                    isEditing ? (
                        <span>
                            <button className="btn btn-primary" onClick={handleSaveClick}>Save</button>
                            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                        </span>
                    ) : (
                        <button className="btn btn-primary" onClick={handleEditClick}>Edit</button>
                    )
                )}
                
                {responseStatus === "0" && <p className="text-center mt-3 text-success">{responseMessage}</p>}
                {responseStatus === "1" && <p className="text-center mt-3 text-danger">{responseMessage}</p>}

            </div>
        </div>
    );
};

export default UserProfileDetails;

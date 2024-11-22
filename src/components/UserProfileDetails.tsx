import React, { useState, useEffect } from 'react';
import { auth } from '../utils/FirebaseConfig';
// import User from '../model/User';
import { fetchUserDataByUserId, updateUserDataByUserId } from '../dataApi/fetchUserHandleByUserId';

const UserProfileDetails: React.FC = () => {
    const user = auth.currentUser;
    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [responseStatus, setResponseStatus] = useState('');

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

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        // const response = await createOrUpdateUser({
        //     uid: user?.uid,
        //     userHandle: displayName,
        //     email: user?.email || ''
        // } as User);
        // const [status, message] = response || ["", ""];
        // if (status === "0") {
        //     setIsEditing(false);
        //     setResponseMessage(message);
        //     setResponseStatus(status);
        // } else {
        //     setResponseMessage(message);
        //     setResponseStatus(status);
        // }
        if (user?.uid) {
            const response = await updateUserDataByUserId(user.uid, displayName, contactEmail);
            const [status, message] = response || ["", ""];
            if (status === "0") {
                setIsEditing(false);
                setResponseMessage(message);
                setResponseStatus(status);
            } else {
                setResponseMessage(message);
                setResponseStatus(status);
            }
        }
    };

    return (
        <div className="card" style={{ backgroundColor: 'var(--bs-body-bg)', color: 'var(--bs-body-color)' }}>
            <div className="card-body">
                <h5 className="card-title">User Profile</h5>
                <p className="card-text">
                    <strong>Display Name: </strong> 
                    {isEditing ? (
                        <input 
                            type="text" 
                            value={displayName} 
                            onChange={(e) => setDisplayName(e.target.value)} 
                        />
                    ) : (
                        displayName
                    )}
                </p>
                <p className="card-text">
                    <strong>Optional Contact Email: </strong>
                    {isEditing ? (
                        <input 
                            type="text" 
                            value={contactEmail} 
                            onChange={(e) => setContactEmail(e.target.value)} 
                        />
                    ) : (
                        contactEmail
                    )}
                </p>
                <p className="card-text"><strong>UID:</strong> {user?.uid}</p>
                {isEditing ? (
                    <span>
                        <button className="btn btn-primary" onClick={handleSaveClick}>Save</button>
                        <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                    </span>
                ) : (
                    <button className="btn btn-primary" onClick={handleEditClick}>Edit</button>
                )}
                
                {responseStatus === "0" && <p className="text-center mt-3 text-success">{responseMessage}</p>}
                {responseStatus === "1" && <p className="text-center mt-3 text-danger">{responseMessage}</p>}
            </div>
        </div>
    );
};

export default UserProfileDetails;

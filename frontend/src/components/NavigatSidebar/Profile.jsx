import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useSocketContext } from '../../context/SocketContext'; // Import the SocketContext

const Profile = ({ onClose }) => {
    const { authUser } = useAuthContext();
    const { onlineUsers } = useSocketContext(); // Get online users from SocketContext
    const profilePic = authUser?.profilePic || 'defaultProfilePic.png';
    const fullName = authUser?.fullName || 'Name';
    const userName = authUser?.username || 'Username';
    const gender = authUser?.gender || 'Gender';
    const isOnline = authUser && onlineUsers.includes(authUser._id); // Determine if the authenticated user is online

    return (
        <div className="relative flex flex-col items-center p-4 bg-[#647080] rounded-lg max-w-sm mx-auto border-2 border-gray-700 shadow-lg">
            {/* Profile Content */}
            <div className="relative">
                <img src={profilePic} alt="Profile" className="w-24 h-24 border-[3px] border-gray-700 rounded-full mb-1" />
                {isOnline && <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-gray-700 rounded-full"></span>}
            </div>
            {/* https://gbqphmwq-3000.inc1.devtunnels.ms/ */}
            <p className={`text-lg font-semibold ${isOnline ? 'text-green-500' : 'text-red-500'}`}>{isOnline ? 'Online' : 'Offline'}</p>
            <h2 className="text-2xl font-bold text-white mb-4">@{userName}</h2>
            <div className="text-start w-full px-2">
                <p className="text-lg font-bold text-white break-words"><span className="text-gray-100">FullName:</span> {fullName}</p>
                <p className="text-lg font-bold text-white break-words">Gender: {gender}</p>
            </div>
        </div>
    );
};

export default Profile;

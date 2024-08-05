import { useSocketContext } from '../../context/SocketContext'; // Import the SocketContext

const profileR = ({ selectedConversation }) => {
    const { onlineUsers } = useSocketContext(); // Get online users from SocketContext
    const profilePic = selectedConversation?.profilePic || 'defaultProfilePic.png';
    const fullName = selectedConversation?.fullName || 'Name';
    const userName = selectedConversation?.username || 'Username';
    const gender = selectedConversation?.gender || 'Gender';
    const isOnline = selectedConversation && onlineUsers.includes(selectedConversation._id); // Determine if the selected conversation user is online

    return (
        <div className="relative flex flex-col items-center p-4 bg-[#647080] rounded-lg max-w-sm mx-auto border-2 border-gray-700 shadow-lg">
            {/* Profile Content */}
            <div className="relative">
                <img src={profilePic} alt="Profile" className="w-24 h-24 border-[3px] border-gray-700 rounded-full mb-" />
                {isOnline && <span className="absolute  top-0 right-0 w-4 h-4 bg-green-500 border-2 border-gray-700 rounded-full"></span>}
            </div>
            <p className={`text-[18px] font-semibold ${isOnline ? 'text-green-500' : 'text-red-500'}`}>{isOnline ? 'Online' : 'Offline'}</p>
            <h2 className="text-2xl font-bold text-white mb-4">@{userName}</h2>
            <p className="text-lg font-bold text-white"><span className="text-gray-100">FullName:</span> {fullName}</p>
            <p className="text-lg font-bold text-white">Gender: {gender}</p>
        </div>
    );
};

export default profileR;
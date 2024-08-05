import React, { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useSocketContext } from '../../context/SocketContext'; // Import the SocketContext
import LogoutButton from './LogoutButton';
import Profile from "./Profile";
import { IoClose } from 'react-icons/io5'; // Import the close icon
import FullscreenButton from './FullscreenButton'; // Import the FullscreenButton component
import { IoIosHome, IoIosInformationCircle, IoIosSettings, IoMdMoon } from "react-icons/io"; // Import Home, About, Settings, and Dark Mode icons
import { MdPersonAddAlt1 } from "react-icons/md"; // Import Add Account icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const NavSidebar = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const { authUser } = useAuthContext();
    const { onlineUsers } = useSocketContext(); // Get online users from SocketContext
    const profilePic = authUser?.profilePic || 'defaultProfilePic.png';
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);
    const [isProfileHovered, setIsProfileHovered] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); // State to track if settings box is open
    const [selectedButton, setSelectedButton] = useState(''); // State to track the selected button
    const sidebarRef = useRef(null); // Ref for the sidebar

    const isOnline = authUser && onlineUsers.includes(authUser._id); // Determine if the authenticated user is online

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSelectedButton(''); // Unselect button when clicking outside
                setIsSettingsOpen(false); // Close settings box when clicking outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleProfileClick = () => {
        setIsProfileModalOpen(true);
    };

    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    const handleSettingsClick = () => {
        setIsSettingsOpen(!isSettingsOpen); // Toggle the settings box visibility
        setSelectedButton('settings'); // Set selected button to settings
    };

    const handleAddAccount = () => {
        // Add logic for adding an account here
        console.log('Add Account button clicked');
    };

    const handleFullscreen = () => {
        // Add logic for fullscreen mode here
        console.log('Fullscreen button clicked');
    };

    const handleDarkModeToggle = () => {
        // Add logic for dark mode toggle here
        console.log('Dark Mode button clicked');
    };

    const handleHomeClick = () => {
        setSelectedButton('home'); // Set selected button to home
        navigate('/'); // Navigate to the home page
    };

    const handleAboutClick = () => {
        setSelectedButton('about'); // Set selected button to about
        navigate('/about'); // Navigate to the about page
    };

    return (
        <div ref={sidebarRef} className="flex flex-col h-full bg-[#6470800c] items-center relative  border-r border-gray-400">
            {/* Fullscreen Button */}
            <div 
                className="relative m-4 z-10"
                onMouseEnter={() => setHoveredButton('fullscreen')}
                onMouseLeave={() => setHoveredButton(null)}
            >
                <FullscreenButton onClick={handleFullscreen} />
                {hoveredButton === 'fullscreen' && (
                    <div className="absolute left-full transform -translate-y-1/2 ml-2 p-2 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg">
                        Fullscreen
                    </div>
                )}
            </div>
            
            <hr className="w-3/4 border-t-1 border-gray-300 my-2" />
            
            {/* Home Button */}
            <div className="flex flex-col items-center gap-6 mt-3">
                <a 
                    href="#"
                    className={`relative z-10 rounded-full ${selectedButton === 'home' ? 'bg-[#1F2937]' : ''}`}
                    onMouseEnter={() => setHoveredButton('home')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={handleHomeClick}
                >
                    <IoIosHome className="text-white text-3xl cursor-pointer" />
                    {hoveredButton === 'home' && (
                        <div className="absolute left-full transform -translate-y-1/2 ml-2 p-2 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg">
                            Home
                        </div>
                    )}
                </a>
                <div 
                    className={`relative z-10 rounded-full ${selectedButton === 'about' ? 'bg-[#1F2937]' : ''}`} 
                    onMouseEnter={() => setHoveredButton('about')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={handleAboutClick}
                >
                    <IoIosInformationCircle className="text-3xl text-white cursor-pointer" />
                    {hoveredButton === 'about' && (
                        <div className="absolute left-full transform -translate-y-1/2 ml-2 p-2 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg">
                            About
                        </div>
                    )}
                </div>
                <div 
                    className={`relative z-10 rounded-full ${selectedButton === 'settings' ? 'bg-[#1F2937]' : ''}`}
                    onMouseEnter={() => setHoveredButton('settings')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={handleSettingsClick} // Toggle settings box visibility on click
                >
                    <IoIosSettings className="text-3xl text-white cursor-pointer" />
                    {hoveredButton === 'settings' && (
                        <div className="absolute left-full transform -translate-y-1/2 ml-2 p-2 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg">
                            Settings
                        </div>
                    )}
                </div>
            </div>

            {/* Settings Box */}
            {isSettingsOpen && (
                <div className="absolute left-full transform translate-y-1/2 ml-4 p-4 bg-gray-700 text-white text-sm font-semibold rounded shadow-lg z-50 transition-transform duration-300 ease-in-out">
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex items-center gap-2">
                            <FullscreenButton className="text-white text-2xl cursor-pointer" onClick={handleFullscreen} />
                            <span>FullScreen</span>
                        </div>
                        <hr className="w-full border-t border-gray-500" />
                        <div className="flex items-center gap-2">
                            <IoMdMoon className="text-white text-2xl cursor-pointer" onClick={handleDarkModeToggle} />
                            <span>Dark/Light</span>
                        </div>
                        <hr className="w-full border-t border-gray-500" />
                        <div className="flex items-center gap-2">
                            <LogoutButton className="text-white text-2xl cursor-pointer" onClick={handleAddAccount} />
                            <span>logout</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom section */}
            <div className="mt-auto flex flex-col items-center gap-2">
                <div
                    className="relative cursor-pointer"
                    onMouseEnter={() => setIsProfileHovered(true)}
                    onMouseLeave={() => setIsProfileHovered(false)}
                    onClick={handleProfileClick}
                >
                    <div className="relative">
                        <img src={profilePic} alt="User" className="w-10 h-10 rounded-full border-[1px] border-gray-700" />
                        {isOnline && (
                            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-700 rounded-full transform translate-x-1/2 -translate-y-1/2"></span>
                        )}
                    </div>
                    
                    {isProfileHovered && (
                        <div className="absolute right-0 transform translate-x-full bottom-full mb-1 w-40 p-2 bg-gray-700 text-white text-sm font-semibold rounded-full shadow-lg z-50">
                            This is your profile.
                        </div>
                    )}
                </div>
                <div
                    onMouseEnter={() => setIsLogoutHovered(true)}
                    onMouseLeave={() => setIsLogoutHovered(false)}
                    className="relative m-4"
                >
                    <LogoutButton className='cursor-pointer mt-2' />
                    {isLogoutHovered && (
                        <div className="absolute right-0 transform translate-x-full bottom-full mb-1 w-40 p-2 bg-gray-700 text-white text-sm font-semibold rounded-full shadow-lg z-50">
                            Click here to log out of your account.
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Modal */}
            {isProfileModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-3xl bg-[#01090f82] z-50" onClick={handleCloseProfileModal}>
                    <div className="relative bg-[#647080] p-4 rounded-lg shadow-sm max-w-sm" onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-2 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-300 z-10 cursor-pointer"
                            onClick={handleCloseProfileModal}
                        >
                            <IoClose className="text-gray-700 text-xl cursor-pointer" />
                        </button>
                        <Profile />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavSidebar;

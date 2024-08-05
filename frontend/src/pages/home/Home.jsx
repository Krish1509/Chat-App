import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/UserSidebar/Sidebar";
import NavSidebar from "../../components/NavigatSidebar/NavSidebar";

const Home = () => {
	return (
		<div className='flex h-screen rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<NavSidebar />
			<Sidebar />
			<MessageContainer />
		</div>
	);
};

export default Home;

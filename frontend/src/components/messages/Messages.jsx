import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from '../../zustand/useConversation';

const Messages = ({ inputRef }) => { // Receive the inputRef as a prop
    const { selectedConversation } = useConversation();
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    const handlePlaceholderClick = () => {
        inputRef.current?.focus(); // Focus the input field
    };

    return (
        <div className='px-4 flex-1 overflow-auto '>
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRef} >
                    <Message message={message} />
                </div>
            ))}

            {!loading && messages.length === 0 && (
                <p
                    className='text-center flex justify-center items-center text-[#f0f0f0] mt-5' // Add cursor-pointer class
                    onClick={handlePlaceholderClick} // Add click handler
                >
                    Send a message to start the conversation with
                    <span className="font-semibold ml-1"> {selectedConversation.fullName}</span>
                </p>
            )}
        </div>
    );
};

export default Messages;

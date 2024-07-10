import {useEffect, useRef, useState} from "react";
import './Chatbot.css'
import {BsEraser} from "react-icons/bs";
import {IoArrowDown, IoArrowUp} from "react-icons/io5";
import {createCompletion, DefaultChatMessages} from "./ChatbotApi.js";
import {LoadingMessage} from "./components/LoadingMessage.jsx";
import {ChatMessage} from "./components/ChatMessage.jsx";

export const Chatbot = () => {

    const [loading, setLoading] = useState(false);
    const [textareaValue, setTextareaValue] = useState('')
    const [messages, setMessages] = useState(DefaultChatMessages);
    const chatboxRef = useRef(null);

    const sendMessage = async (event) => {
        event.preventDefault();

        const updatedMessages = [...messages,
            {content: textareaValue, role: 'user'}];
        setMessages(updatedMessages);

        setTextareaValue('')
        setLoading(true)

        try {
            const response = await createCompletion(updatedMessages);

            const assistantResponse = response ?? "We couldn't generate a response, please try again later";
            setMessages(messages => [...messages, {content: assistantResponse, role: 'assistant'}]);
        } catch (e) {
            console.log(e)
        }

        setLoading(false)
    };

    const onTextareaChange = (event) => {
        setTextareaValue(event.target.value)
    }

    useEffect(() => {
        if (messages[messages.length - 1].role !== 'assistant') {
            onScrollToBottom();
        }
    }, [messages]);

    const onScrollToBottom = () => {
        chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }

    const onScrollToTop = () => {
        chatboxRef.current.scrollTop = 0;
    }

    const onClearMessages = () => {
        setMessages([]);
    }

    const regenerateMessage = async (message, index) => {
        try {
            setMessages([...messages.slice(0, index),
                {role: 'loading'},
                ...messages.slice(index + 1)
            ]);

            const response = await createCompletion(messages.slice(0, index));

            const assistantResponse = response ?? "We couldn't generate a response, please try again later";
            setMessages(messages => [...messages.slice(0, index),
                {content: assistantResponse, role: 'assistant'},
                ...messages.slice(index + 1)
            ]);

        } catch (e) {
            console.log(e)
        }
    }

    const onKeyDown = (event) => {
        if (event.shiftKey && event.key === 'Enter' || event.altKey && event.key === 'Enter') {
            event.preventDefault();
            setTextareaValue(textareaValue + '\n')
        } else if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage(event);
        }
    }

    return (
        <div className="Chatbot">
            <div className={"Chatbot__chatbox"}>
                <div ref={chatboxRef} className="Chatbot__messages">

                    {messages.map((message, index) =>
                        <ChatMessage key={index} index={index} message={message}
                                     onRegenerate={regenerateMessage}/>
                    )}

                    {loading && (
                        <LoadingMessage/>
                    )}

                </div>

                <form className="Chatbot__form" onSubmit={sendMessage}>

                    <div className={"Chatbot__InputActions"}>
                        <div onClick={onScrollToBottom}><IoArrowDown className={"Chatbot__Icon"}/></div>
                        <div onClick={onScrollToTop}><IoArrowUp className={"Chatbot__Icon"}/></div>
                        <div onClick={onClearMessages}><BsEraser className={"Chatbot__Icon"}/></div>
                    </div>

                    <textarea name="message"
                              className="Chatbot__input"
                              value={textareaValue}
                              onChange={onTextareaChange}
                              onKeyDown={onKeyDown}
                              placeholder="Type something... Enter to send."/>

                    <button
                        type="submit"
                        className="Chatbot__button"
                        color={"green"}
                        disabled={textareaValue || loading}>Send
                    </button>
                </form>
            </div>

        </div>
    );
}


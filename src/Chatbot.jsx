import {useEffect, useRef, useState} from "react";
import './Chatbot.css'
import {BsEraser} from "react-icons/bs";
import {IoArrowDown, IoArrowUp, IoCopyOutline, IoRefresh} from "react-icons/io5";

const defaultChatMessages = [
    {
        content: "Explain Pythagoras theorem",
        role: 'user'
    },
    {
        content: "The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the lengths of the other two sides. Mathematically, this is written as a2+b2=c2a2+b2=c2, where cc is the hypotenuse and aa and bb are the other two sides.",
        role: 'assistant'
    },
    {
        content: "Explain Pythagoras theorem",
        role: 'user'
    },
    {
        content: "The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the lengths of the other two sides. Mathematically, this is written as a2+b2=c2a2+b2=c2, where cc is the hypotenuse and aa and bb are the other two sides.",
        role: 'assistant'
    },
    {
        content: "Explain Pythagoras theorem",
        role: 'user'
    },
    {
        content: "The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the lengths of the other two sides. Mathematically, this is written as a2+b2=c2a2+b2=c2, where cc is the hypotenuse and aa and bb are the other two sides.",
        role: 'assistant'
    },
]

const ChatMessage = ({message, index, onRegenerate}) => {

    const onCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(message.content);
    }

    const onRegenerateClicked = (e) => {
        e.stopPropagation();
        onRegenerate(message, index);
    }

    return (
        <div className="ChatbotMessageContainer">
            <div className={`ChatbotMessage ChatbotMessage--${message.role}`}>
                {message.content}
                <div className={`ChatbotMessage__actions ChatbotMessage__actions--${message.role}`}>
                    <div onClick={onCopy}><IoCopyOutline className={"Chatbot__Icon"}/></div>
                    {message.role === 'assistant' && <div onClick={onRegenerateClicked}><IoRefresh className={"Chatbot__Icon"}/></div>
                    }
                </div>
            </div>
        </div>
    )
}

export const Chatbot = () => {
    const [loading, setLoading] = useState(false);
    const [textareaValue, setTextareaValue] = useState('')
    const [messages, setMessages] = useState(defaultChatMessages);
    const chatboxRef = useRef(null);

    const sendMessage = async (event) => {
        event.preventDefault();

        const newMessage = {content: textareaValue, role: 'user'}
        setMessages([...messages,
            newMessage
        ]);

        try {
            setTextareaValue('')
            setLoading(true)
            const response = createCompletion([...messages, newMessage]);

            const assistantResponse = response ?? "We couldn't generate a response, please try again later";

            setMessages([...messages,
                {content: assistantResponse, role: 'assistant'}
            ])
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    };

    const onTextareaChange = (event) => {
        setTextareaValue(event.target.value)
    }

    useEffect(() => {
        onScrollToBottom();
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
        // try {
        //     setLoading(true)
        //
        //     setMessages([...messages.slice(0, index),
        //         ...messages.slice(index + 1)
        //     ]);
        //
        //     const response = "Regenerating..."
        //
        //     setMessages([...messages,
        //         {content: response, role: 'assistant'}
        //     ])
        //
        //     addBotMessage(response ?? "There was an issue with the response, please try again later")
        // } catch (e) {
        //     console.log(e)
        // }
        // setLoading(false)
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
                    {messages.map((message, index) => {
                        return (
                            <ChatMessage key={index} index={index} message={message}
                                         onRegenerate={regenerateMessage}/>
                        )
                    })}
                    {loading && (
                        <div className="ChatbotMessageContainer">
                            <div className="ChatbotMessage ChatbotMessage--assistant">
                                <div className={"loader"}/>
                            </div>
                        </div>
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
import {IoCopyOutline, IoRefresh} from "react-icons/io5";
import {LoadingMessage} from "./LoadingMessage.jsx";

export const ChatMessage = ({message, index, onRegenerate}) => {

    const onCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(message.content);
    }

    const onRegenerateClicked = (e) => {
        e.stopPropagation();
        onRegenerate(message, index);
    }

    if (message.role === 'loading') {
        return (<LoadingMessage/>)
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

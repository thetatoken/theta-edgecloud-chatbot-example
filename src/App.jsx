import './App.css'
import {Chatbot} from "./Chatbot.jsx";

function App() {

    return (
        <>
            <div>
                <a href="https://www.thetaedgecloud.com" target="_blank">
                    <img src={"https://www.thetaedgecloud.com/images/edgecloud-logo.svg"} className="logo"
                         alt="Theta Edge Cloud logo"/>
                </a>
            </div>
            <h2>Chatbot sample project</h2>

            <Chatbot/>

            <p className="read-the-docs">
                <a href="#" target={"_blank"}>Click here</a> to access the GitHub repository
            </p>

        </>
    )
}

export default App

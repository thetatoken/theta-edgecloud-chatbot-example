import './App.css'
import {Chatbot} from "./Chatbot.jsx";

function App() {

    return (
        <>
            <Header/>

            <Chatbot/>

            <Footer/>
        </>
    )
}

export default App


const Header = () => {
    return (<>
            <h1>my math teacher</h1>
            <h2>a chatbot example</h2>
        </>
    )
}

const Footer = () => {
    return (
        <div>
            <a href="https://www.thetaedgecloud.com" target="_blank">
                <img src={"https://www.thetaedgecloud.com/images/edgecloud-logo.svg"} className="logo"
                     alt="Theta Edge Cloud logo"/>
            </a>
        </div>
    )
}
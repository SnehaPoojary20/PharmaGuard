import Footer from "../Footer/footer.jsx";
import Navbar from "./navbar.jsx";
import Search from "./search.jsx";
import Chatbot from "./chatbot.jsx";

const Home=()=>{
    return(
     <>
     <Navbar/>
     <Search/>
     <Chatbot/>
     <Footer/>

     </>
    );

}

export default Home;
import React from "react";
import "../Styling/home.css"

const Chatbot = () => {
  return (
    <div className="pharmamate">
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/fq_a0rkDPsWBsdfv1Hc1N"
        width="100%"
        style={{ height: "100%", minHeight: "700px" }}
        frameBorder="0"
        title="PharmaMate Chatbot"
      ></iframe>
    </div>
  );
};



export default Chatbot;
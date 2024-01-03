import { useCallback, useState } from 'react'
//import './chat.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import Layout from "../../components/Layout"
import axios from 'axios'

function InteliChat() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Resume Explorer! Ask me anything!",
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = useCallback((message) => {
    const chatMessages = [...messages, {
      message
    }]
    setMessages(chatMessages)
    setIsTyping(true)
    customChatGptAPICall(message, chatMessages)
  },[messages.length]);

  const customChatGptAPICall = async (message, chatMessages)=>{
    axios.defaults.withCredentials = true;
    // const config = {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   }
    // };
    // const URL = `http://15.206.232.42:5601/query?text=${message}`;
    // axios.get(URL, {config})
    //   .then((res) => {
    //     setIsTyping(false)
    //     setMessages([...chatMessages, {
    //       message: res.data?.answer || "Sorry, something went wrong. Please try again!"
    //     }])
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

    const URL = `http://15.206.232.42:5601/doc_qa/multi_doc_index`;
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    const data = {
      // additional_instructions: "",
      category: "resumes",
      query: message
    };
    axios.post(URL, data, {config})
      .then((res) => {
        setIsTyping(false)
        setMessages([...chatMessages, {
          message: res.data || "Sorry, something went wrong. Please try again!"
        }])
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <Layout>
    <div className="conatiner-fluid ">
      <div style={{ position:"relative", height: "70vh", width: "90%", marginLeft:"5%" }} >
        <MainContainer >
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Resume Explorer is typing" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
    </Layout>
  )
}

export default InteliChat

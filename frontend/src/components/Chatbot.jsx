import React, { useState } from "react";
import axios from "axios";
import { checkForSensitiveWords } from "./sensitiveWordChecker";
import ScheduleModal from "./ScheduleModal";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem('authToken');
  if (token) {
    axios.get('http://localhost:8000/protected-route', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  const handleSend = async () => {
    if (userInput.trim() === "") return;

    if (checkForSensitiveWords(userInput)) {
      setIsDisabled(true);
      setIsModalOpen(true);  // Open the scheduling modal
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userInput },
    ]);

    try {
      const response = await axios.post("http://localhost:8000/chat/", {
        prompt: userInput,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: response.data.response },
      ]);

      setUserInput("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleModalSubmit = async (appointment) => {
    try {
      const response = await axios.post("http://localhost:8000/schedule_appointment/", {
        user_email: "user@example.com",  // Replace with dynamic user email if available
        date: appointment.date,
        time: appointment.time,
        reason: "Sensitive content detected"  // Optional field
      });
      console.log("Appointment scheduled:", response.data);
    } catch (error) {
      console.error("Error scheduling appointment:", error);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      {/* Chatbox */}
      <div className="flex flex-col space-y-4 w-full p-4 bg-gray-100 rounded-lg overflow-auto h-96">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 rounded-lg ${message.role === "user" ? "bg-blue-100 self-end" : "bg-gray-300 self-start"}`}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center space-x-2 w-full mt-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isDisabled}
          className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={isDisabled}
          className={`p-2 bg-blue-500 text-white rounded-lg ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
        >
          Send
        </button>
      </div>

      {/* Scheduling Modal */}
      {isModalOpen && (
        <ScheduleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default ChatBot;

import { useEffect, useRef, useState } from "react";
import "../style/ChatBot.css";

const staticReplies = [
  // 🔹 Services
  {
    keywords: ["service", "services", "what do you do"],
    reply: "We provide Web Development, Mobile App Development, Cloud & DevOps, and Custom Software Solutions ⚡",
  },
  {
    keywords: ["web development", "website"],
    reply: "We build fast, secure, and scalable websites using React, Next.js, and modern technologies.",
  },
  {
    keywords: ["mobile app", "android", "ios"],
    reply: "We develop cross-platform mobile apps using Flutter and React Native.",
  },
  {
    keywords: ["cloud", "devops", "aws", "azure"],
    reply: "We offer Cloud & DevOps services including AWS, Azure, CI/CD pipelines, and server optimization.",
  },
  {
    keywords: ["custom software"],
    reply: "Yes, we build fully customized software solutions based on your business requirements.",
  },

  // 🔹 Technology Stack
  {
    keywords: ["technology", "tech", "stack"],
    reply: "Our tech stack includes React, Node.js, Python, Java, Flutter, Docker, and Cloud platforms 💻",
  },
  {
    keywords: ["frontend"],
    reply: "Frontend technologies: React, Next.js, Angular, Tailwind CSS.",
  },
  {
    keywords: ["backend"],
    reply: "Backend technologies: Node.js, Java, Python, REST APIs, and Microservices.",
  },
  {
    keywords: ["database"],
    reply: "We work with MongoDB, PostgreSQL, MySQL, and Firebase databases.",
  },

  // 🔹 Pricing & Cost
  {
    keywords: ["price", "pricing", "cost", "charges"],
    reply: "Pricing depends on project scope and requirements. We offer flexible and competitive pricing.",
  },
  {
    keywords: ["free", "trial"],
    reply: "We offer free consultation to understand your project needs.",
  },

  // 🔹 Timeline & Delivery
  {
    keywords: ["time", "delivery", "how long"],
    reply: "Project timelines depend on complexity. Small projects usually take 2–4 weeks.",
  },
  {
    keywords: ["fast", "speed"],
    reply: "We are known for lightning-fast delivery without compromising quality ⚡",
  },

  // 🔹 Process
  {
    keywords: ["process", "how do you work"],
    reply: "Our process includes Requirement Analysis, Design, Development, Testing, and Deployment.",
  },
  {
    keywords: ["communication", "update"],
    reply: "We provide regular updates and maintain transparent communication throughout the project.",
  },

  // 🔹 Support & Maintenance
  {
    keywords: ["support", "maintenance"],
    reply: "Yes, we provide post-launch support and maintenance services.",
  },
  {
    keywords: ["bug", "issue"],
    reply: "Our support team quickly resolves bugs and technical issues.",
  },

  // 🔹 Company Info
  {
    keywords: ["company", "about"],
    reply: "Lightning Cognition is a technology company focused on fast, reliable, and modern solutions.",
  },
  {
    keywords: ["experience", "years"],
    reply: "Our team has strong experience in building production-ready tech solutions.",
  },

  // 🔹 Contact
  {
    keywords: ["contact", "email", "phone", "reach"],
    reply: "You can contact us at contact@lightningcognition.com 📧",
  },
  {
    keywords: ["meeting", "call"],
    reply: "Yes, we can schedule a call or meeting to discuss your project.",
  },

  // 🔹 Location & Hiring
  {
    keywords: ["location", "where are you"],
    reply: "We work with clients globally and offer remote services.",
  },
  {
    keywords: ["career", "job", "hiring"],
    reply: "We’re always open to talented developers. Contact us for career opportunities.",
  },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const endRef = useRef(null);
 useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          from: "bot",
          text:
            "Hi 👋 Welcome to Lightning Cognition!\n\n" +
            "I can help you with:\n" +
            "• Services we offer\n" +
            "• Pricing & cost\n" +
            "• Technologies\n" +
            "• Timelines\n" +
            "• Contact details\n\n" +
            "Type your question or choose an option below 👇",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // 🔹 Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const getStaticReply = (text) => {
    const msg = text.toLowerCase();
    for (let item of staticReplies) {
      if (item.keywords.some((k) => msg.includes(k))) {
        return item.reply;
      }
    }
   return (
  "Hello 😅\n\n" +
  "You can ask me about:\n" +
  "• Services we offer\n" +
  "• Pricing & cost\n" +
  "• Technologies\n" +
  "• Timelines\n" +
  "• Contact details\n\n" +
  "Please try again or choose an option below 👇"
);

  };

  const sendMessage = (text = input) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: getStaticReply(text) },
      ]);
      setTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* 💬 Hint */}
      {!isOpen && <div className="chat-hint">Know more</div>}

      {/* 🤖 Icon */}
      <div className="chat-icon" onClick={() => setIsOpen(true)}>
        🤖
      </div>

      {/* 📦 Chat Box */}
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            Lightning Bot
            <span className="chat-close" onClick={() => setIsOpen(false)}>✖</span>
          </div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.from}`}>
                {msg.text}
              </div>
            ))}

            {/* 🔹 Suggestion Chips (NEW) */}
            {messages.length === 1 && !typing && (
              <div className="chat-chips">
                <button onClick={() => sendMessage("What services do you offer?")}>
                  Services
                </button>
                <button onClick={() => sendMessage("What is your pricing?")}>
                  Pricing
                </button>
                <button onClick={() => sendMessage("How can I contact you?")}>
                  Contact
                </button>
              </div>
            )}

            {/* ⏳ Typing */}
            {typing && (
              <div className="chat-message bot chat-typing">
                <span></span><span></span><span></span>
              </div>
            )}

            <div ref={endRef} />
          </div>

          <div className="chat-input-area">
            <input
              className="chat-input"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="chat-send" onClick={() => sendMessage()}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default ChatBot;

import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import { Clapperboard, Trash2, X, Bot } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const systemPrompt = `
You are an AI Movie Assistant.

You only answer questions related to movies and TV shows.

You can:
- Recommend movies based on user preferences.
- Answer questions about movies and TV shows.
- Suggest similar movies.
- Discuss movie genres.
- Provide movie summaries and explanations.
- Answer questions about actors and directors.

If the user asks about something unrelated to movies or TV shows,
politely explain that you are a movie assistant and can only help
with movie and TV-related questions.

Keep your answers friendly, helpful, and easy to understand.
`;

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const [retryMessage, setRetryMessage] = useState("");

  const { isDark } = useTheme();

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleSend(text = message) {
    if (!text.trim() || loading) return;

    const userMessage = text;

    const newMessages = [
      ...messages,
      {
        sender: "user",
        text: userMessage,
      },
    ];

    setMessages(newMessages);
    setMessage("");
    setRetryMessage("");
    setLoading(true);

    try {
      const contents = newMessages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [
          {
            text: msg.text,
          },
        ],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction: systemPrompt,
        },
      });

      setMessages([
        ...newMessages,
        {
          sender: "ai",
          text: response.text,
        },
      ]);
    } catch (error) {
      console.error("Gemini API Error:", error);

      setRetryMessage(userMessage);

      setMessages([
        ...newMessages,
        {
          sender: "ai",
          text: "Sorry, I couldn't get a response right now.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-yellow-300 text-black shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition"
      >
        <Clapperboard className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100%-32px)] h-[500px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden ${
            isDark
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white text-black"
          }`}
        >
          {/* Header */}
          <div className="bg-yellow-300 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* AI Avatar */}
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <Bot className="w-5 h-5 text-yellow-300" />
              </div>

              {/* AI Info */}
              <div>
                <h2 className="font-bold text-black">
                  AI Movie Assistant
                </h2>

                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>

                  <p className="text-xs text-black/70">
                    Online
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Clear Chat */}
              <button
                onClick={() => setMessages([])}
                disabled={messages.length === 0}
                className="w-8 h-8 rounded-full flex items-center justify-center text-black hover:bg-black/10 transition disabled:opacity-40"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-black hover:bg-black/10 transition"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className={`flex-1 overflow-y-auto p-4 ${
              isDark ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            {/* Welcome */}
            {messages.length === 0 && (
              <div
                className={`text-center text-sm mt-10 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <div className="flex justify-center mb-3">
                  <Bot
                    className={`w-10 h-10 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                </div>

                <p
                  className={`font-semibold ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Welcome!
                </p>

                <p className="mt-1">
                  Ask me for a movie recommendation.
                </p>
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {/* AI Avatar */}
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center mr-2 shrink-0">
                    <Bot className="w-4 h-4 text-black" />
                  </div>
                )}

                <div>
                  {/* Message */}
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-6 ${
                      msg.sender === "user"
                        ? "bg-yellow-300 text-black rounded-br-sm"
                        : msg.error
                        ? "bg-red-50 text-red-600 border border-red-200 rounded-bl-sm"
                        : isDark
                        ? "bg-gray-700 text-white border border-gray-600 rounded-bl-sm"
                        : "bg-white text-gray-800 shadow-sm border rounded-bl-sm"
                    }`}
                  >
                    {msg.sender === "ai" ? (
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>

                  {/* Try Again */}
                  {msg.error && (
                    <button
                      onClick={() => handleSend(retryMessage)}
                      className="mt-2 text-xs font-semibold text-red-600 hover:underline"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div className="flex justify-start items-center mb-4">
                {/* AI Avatar */}
                <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center mr-2 shrink-0">
                  <Bot className="w-4 h-4 text-black" />
                </div>

                {/* Typing Indicator */}
                <div
                  className={`border shadow-sm px-4 py-2.5 rounded-2xl rounded-bl-sm ${
                    isDark
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs ${
                        isDark
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      AI is typing
                    </span>

                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>

                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>

                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Auto Scroll Target */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className={`p-3 border-t flex gap-2 ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white"
            }`}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Ask about a movie..."
              className={`flex-1 border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-300 ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600 placeholder:text-gray-400"
                  : "bg-white text-black"
              }`}
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-yellow-300 px-4 rounded-xl font-semibold text-sm text-black disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
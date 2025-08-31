export function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-chat-bot-bg text-chat-bot-text rounded-2xl px-4 py-3 border mr-4 shadow-sm">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: "0.4s" }}></div>
          </div>
          <span className="text-sm text-muted-foreground ml-2">HR Assistant is typing...</span>
        </div>
      </div>
    </div>
  );
}
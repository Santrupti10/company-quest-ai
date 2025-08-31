import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onQuickQuestion: (question: string) => void;
}

const quickQuestions = [
  "What is the company policy?",
  "How many interview rounds?",
  "Check application status",
  "What does ABC company do?",
  "How can I apply for a job?",
  "What benefits do you offer?",
];

export function QuickActions({ onQuickQuestion }: QuickActionsProps) {
  return (
    <div className="p-4 border-t bg-muted/30">
      <p className="text-sm text-muted-foreground mb-3 font-medium">Quick Questions:</p>
      <div className="flex flex-wrap gap-2">
        {quickQuestions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onQuickQuestion(question)}
            className="text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
}
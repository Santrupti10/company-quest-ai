interface FAQ {
  question: string;
  answer: string;
  keywords: string[];
}

interface ApplicationStatus {
  email: string;
  jobId: string;
  status: string;
}

const faqs: FAQ[] = [
  {
    question: "What is the company policy?",
    answer: "Our company policy covers holidays and various workplace guidelines. For detailed information, please refer to the employee handbook or contact HR directly.",
    keywords: ["policy", "company policy", "holidays", "guidelines"]
  },
  {
    question: "How many rounds are going to be there in the interview?",
    answer: "There are going to be 3 rounds in our interview process.",
    keywords: ["rounds", "interview", "how many", "process"]
  },
  {
    question: "What does ABC company do?",
    answer: "ABC is a telecom company that focuses on telecom devices. Our mission is to help all companies with networking issues.",
    keywords: ["abc", "company", "telecom", "do", "mission", "networking"]
  },
  {
    question: "What is the company culture like?",
    answer: "We value collaboration, innovation, and inclusivity. Our teams work in a supportive environment where growth and learning are encouraged.",
    keywords: ["culture", "collaboration", "innovation", "inclusivity", "environment"]
  },
  {
    question: "Where are your offices located?",
    answer: "Our headquarters is in California, with additional offices all over the globe. We also support remote and hybrid work for certain roles.",
    keywords: ["offices", "located", "california", "headquarters", "remote", "hybrid"]
  },
  {
    question: "How can I apply for a job?",
    answer: "You can apply through our careers page at www.abc.com/careers. Simply search for open roles, submit your resume, and complete the application form.",
    keywords: ["apply", "job", "careers", "resume", "application"]
  },
  {
    question: "What documents are required to apply?",
    answer: "Generally, you need to submit your resume. Some roles may also require a cover letter, portfolio, or references.",
    keywords: ["documents", "required", "resume", "cover letter", "portfolio", "references"]
  },
  {
    question: "Can I apply for multiple positions at once?",
    answer: "Yes, you may apply to multiple roles if you meet the qualifications for each position.",
    keywords: ["multiple", "positions", "roles", "qualifications"]
  },
  {
    question: "How long does the hiring process take?",
    answer: "The process typically takes 2–4 weeks, depending on the role and number of applicants.",
    keywords: ["hiring", "process", "take", "weeks", "timeline"]
  },
  {
    question: "Will I be notified if I am not selected?",
    answer: "Yes, we ensure that all applicants are informed about their application status.",
    keywords: ["notified", "selected", "status", "informed"]
  },
  {
    question: "What does your interview process involve?",
    answer: "It usually includes an initial screening, one or two technical or behavioral interviews, and a final round with the hiring manager or leadership team.",
    keywords: ["interview process", "screening", "technical", "behavioral", "final round"]
  },
  {
    question: "Are interviews conducted in person or virtually?",
    answer: "We offer both. Initial rounds are often virtual, while final interviews may be in-person depending on the role.",
    keywords: ["interviews", "person", "virtual", "in-person"]
  },
  {
    question: "How should I prepare for the interview?",
    answer: "Review the job description, learn about our company, and be ready to discuss your skills and experiences relevant to the role.",
    keywords: ["prepare", "interview", "job description", "skills", "experiences"]
  },
  {
    question: "Do you offer remote work options?",
    answer: "Yes, many roles are remote or hybrid. Check the job description for specific details.",
    keywords: ["remote", "work", "options", "hybrid"]
  },
  {
    question: "What are the standard working hours?",
    answer: "Our standard working hours are flexible depending on the role and department. Specific hours will be discussed during the interview process.",
    keywords: ["working hours", "standard", "flexible", "hours"]
  },
  {
    question: "What is your policy on diversity and inclusion?",
    answer: "We are committed to creating an inclusive workplace and actively promote diversity across all levels of the organization.",
    keywords: ["diversity", "inclusion", "inclusive", "workplace"]
  },
  {
    question: "Do you disclose salary ranges?",
    answer: "Yes, salary ranges are listed in job postings where required and can be discussed during the interview process.",
    keywords: ["salary", "ranges", "disclose", "compensation"]
  },
  {
    question: "What benefits do you offer?",
    answer: "Our benefits include health insurance, retirement plans, paid time off, learning opportunities, and more.",
    keywords: ["benefits", "health", "insurance", "retirement", "paid time off"]
  },
  {
    question: "Are there opportunities for career growth?",
    answer: "Absolutely. We provide learning programs, mentorship, and clear career progression paths for employees.",
    keywords: ["career", "growth", "opportunities", "learning", "mentorship"]
  },
  {
    question: "Do you offer internships or graduate programs?",
    answer: "Yes, we offer both internship programs and entry-level graduate roles. Check our careers page for current openings.",
    keywords: ["internships", "graduate", "programs", "entry-level"]
  },
  {
    question: "What is the onboarding process like?",
    answer: "New hires go through a structured onboarding program that covers company orientation, team integration, and training for their role.",
    keywords: ["onboarding", "process", "new hires", "orientation", "training"]
  }
];

// Mock application statuses
const applicationStatuses: ApplicationStatus[] = [
  { email: "abc.str@email.com", jobId: "090090", status: "application under review" },
  { email: "john.doe@email.com", jobId: "090091", status: "interview scheduled" },
  { email: "jane.smith@email.com", jobId: "090092", status: "application rejected" },
];

export class HRChatbot {
  private awaitingStatusCheck: boolean = false;
  private statusCheckData: { email?: string; jobId?: string } = {};

  findBestMatch(userInput: string): string {
    const input = userInput.toLowerCase();
    
    // Check if asking for application status
    if (input.includes("status") && (input.includes("application") || input.includes("job"))) {
      this.awaitingStatusCheck = true;
      this.statusCheckData = {};
      return "To check your application status, I'll need some information. Please provide your email address and job ID.\n\nExample format:\nEmail: your.email@example.com\nJob ID: 090090";
    }

    // Handle status check input
    if (this.awaitingStatusCheck) {
      return this.handleStatusCheck(userInput);
    }

    // Find best FAQ match
    let bestMatch: FAQ | null = null;
    let highestScore = 0;

    for (const faq of faqs) {
      const score = this.calculateMatchScore(input, faq.keywords);
      if (score > highestScore && score > 0.3) { // Minimum threshold
        highestScore = score;
        bestMatch = faq;
      }
    }

    if (bestMatch) {
      return bestMatch.answer;
    }

    return "I'm sorry, I don't have information about that specific question. Here are some things I can help you with:\n\n• Application status checks\n• Company information and culture\n• Job application process\n• Interview process and preparation\n• Benefits and compensation\n• Career growth opportunities\n• Workplace policies\n\nPlease feel free to ask about any of these topics!";
  }

  private handleStatusCheck(input: string): string {
    const emailMatch = input.match(/email:\s*([^\s\n]+@[^\s\n]+)/i);
    const jobIdMatch = input.match(/job\s*id:\s*([^\s\n]+)/i);

    if (emailMatch) {
      this.statusCheckData.email = emailMatch[1];
    }
    if (jobIdMatch) {
      this.statusCheckData.jobId = jobIdMatch[1];
    }

    // Check if we have both pieces of information
    if (this.statusCheckData.email && this.statusCheckData.jobId) {
      const status = this.checkApplicationStatus(this.statusCheckData.email, this.statusCheckData.jobId);
      this.awaitingStatusCheck = false;
      this.statusCheckData = {};
      return status;
    }

    // Ask for missing information
    const missing = [];
    if (!this.statusCheckData.email) missing.push("email address");
    if (!this.statusCheckData.jobId) missing.push("job ID");

    return `I still need your ${missing.join(" and ")}. Please provide:\n\nEmail: your.email@example.com\nJob ID: 090090`;
  }

  private checkApplicationStatus(email: string, jobId: string): string {
    const application = applicationStatuses.find(
      app => app.email.toLowerCase() === email.toLowerCase() && app.jobId === jobId
    );

    if (application) {
      return `Application Status for ${email} (Job ID: ${jobId}):\n\n${application.status.toUpperCase()}\n\nIf you have any questions about your application status, please contact our HR team directly.`;
    }

    return `I couldn't find an application with email "${email}" and job ID "${jobId}". Please verify your information and try again, or contact our HR team for assistance.`;
  }

  private calculateMatchScore(input: string, keywords: string[]): number {
    let score = 0;
    const inputWords = input.split(/\s+/);
    
    for (const keyword of keywords) {
      const keywordWords = keyword.toLowerCase().split(/\s+/);
      
      // Check for exact phrase match
      if (input.includes(keyword.toLowerCase())) {
        score += keywordWords.length * 0.5;
      }
      
      // Check for individual word matches
      for (const keywordWord of keywordWords) {
        for (const inputWord of inputWords) {
          if (inputWord.includes(keywordWord) || keywordWord.includes(inputWord)) {
            score += 0.3;
          }
        }
      }
    }
    
    return score / Math.max(keywords.length, inputWords.length);
  }

  isAwaitingInput(): boolean {
    return this.awaitingStatusCheck;
  }
}
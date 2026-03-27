import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Database
  const db = {
    users: [
      {
        id: "user-1",
        name: "Alex Shadow",
        email: "alex@example.com",
        password: "password123",
        university: "Tech Institute",
        shadowScore: 742,
        seniorityLevel: "Lead Shadow",
        xp: 12500,
        learningCredits: 450,
        isClockedIn: false,
        lastClockIn: null,
        totalHoursLogged: 156,
        weeklyHours: 12,
        internshipDay: 18,
        reliabilityRating: 94,
        competencies: {
          codeQuality: 85,
          architecture: 70,
          security: 60,
          debugging: 90,
          collaboration: 80,
          documentation: 75,
        },
        workLog: [
          { id: "log-1", type: "PR", title: "Refactor Payment Gateway", status: "Merged", date: "2026-03-20", score: +15 },
          { id: "log-2", type: "Bug", title: "Fix Race Condition in Auth", status: "Resolved", date: "2026-03-22", score: +25 },
          { id: "log-3", type: "Review", title: "Architecture Review: User Service", status: "Completed", date: "2026-03-25", score: +10 },
        ],
        certifications: [
          { id: "cert-1", title: "Google SRE Track Verified", company: "Google", date: "2026-02-15" },
          { id: "cert-2", title: "Stripe Backend Specialist", company: "Stripe", date: "2026-03-01" },
        ],
        careerRoadmap: { google: 1, stripe: 1, microsoft: 0 },
        activeInternship: {
          company: "Google",
          trackId: "google-sre",
          startDate: "2026-03-09",
          endDate: "2026-04-06",
          currentSprint: 3,
          deadline: "2026-03-30T18:00:00Z"
        }
      }
    ],
    tracks: [
      {
        id: "google-sre",
        title: "Google SRE Track",
        company: "Google",
        industry: "SaaS",
        logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
        difficulty: "Hard",
        requiredScore: 600,
        duration: "4 weeks",
        skills: ["Reliability", "Monitoring", "Incident Response"],
        status: "Completed",
        price: 199,
        currency: "USD",
        roi: 92,
        isSponsorFunded: false,
        culture: "High Innovation / Complexity"
      },
      {
        id: "stripe-backend",
        title: "Stripe Integration",
        company: "Stripe",
        industry: "FinTech",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
        difficulty: "Medium",
        requiredScore: 400,
        duration: "2 weeks",
        skills: ["API Design", "Payments", "Security"],
        status: "In Progress",
        price: 99,
        currency: "USD",
        roi: 88,
        isSponsorFunded: true,
        culture: "Developer First / Speed"
      },
      {
        id: "microsoft-cloud",
        title: "Azure Cloud Architecture",
        company: "Microsoft",
        industry: "Cloud",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        difficulty: "Expert",
        requiredScore: 800,
        duration: "6 weeks",
        skills: ["Cloud Native", "Kubernetes", "Scalability"],
        status: "Locked",
        price: 299,
        currency: "USD",
        roi: 95,
        isSponsorFunded: false,
        culture: "Enterprise Scale / Reliability"
      },
      {
        id: "nvidia-ai",
        title: "CUDA Optimization",
        company: "NVIDIA",
        industry: "AI/ML",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
        difficulty: "Expert",
        requiredScore: 900,
        duration: "8 weeks",
        skills: ["Parallel Computing", "C++", "GPU Architecture"],
        status: "Locked",
        price: 499,
        currency: "USD",
        roi: 98,
        isSponsorFunded: false,
        culture: "Hardware Acceleration / Performance"
      }
    ]
  };

  // API Routes
  app.post("/api/auth/signup", (req, res) => {
    const { name, email, password, university } = req.body;
    if (db.users.find(u => u.email === email)) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = {
      id: `user-${db.users.length + 1}`,
      name,
      email,
      password,
      university: university || "Unknown University",
      shadowScore: 0,
      seniorityLevel: "Junior Shadow",
      xp: 0,
      learningCredits: 1000,
      isClockedIn: false,
      lastClockIn: null,
      totalHoursLogged: 0,
      weeklyHours: 0,
      internshipDay: 1,
      reliabilityRating: 100,
      isPro: false,
      role: "Backend Developer",
      unlockedCompanies: [],
      competencies: {
        codeQuality: 0,
        architecture: 0,
        security: 0,
        debugging: 0,
        collaboration: 0,
        documentation: 0,
      },
      workLog: [],
      certifications: [],
      careerRoadmap: {
        google: 0,
        stripe: 0,
        microsoft: 0
      },
      activeInternship: {
        company: "None",
        trackId: "none",
        startDate: "",
        endDate: "",
        currentSprint: 0,
        deadline: ""
      }
    };
    db.users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    res.json(userWithoutPassword);
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  app.post("/api/simulation/clock-in", (req, res) => {
    const { email } = req.body;
    const user = db.users.find(u => u.email === email);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    user.isClockedIn = true;
    user.lastClockIn = new Date().toISOString();
    res.json({ success: true, isClockedIn: true });
  });

  app.post("/api/simulation/clock-out", (req, res) => {
    const { email } = req.body;
    const user = db.users.find(u => u.email === email);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    if (user.isClockedIn && user.lastClockIn) {
      const duration = (new Date().getTime() - new Date(user.lastClockIn).getTime()) / (1000 * 60 * 60);
      user.totalHoursLogged += duration;
      user.weeklyHours += duration;
    }
    
    user.isClockedIn = false;
    user.lastClockIn = null;
    res.json({ success: true, isClockedIn: false, totalHours: user.totalHoursLogged });
  });

  app.post("/api/simulation/interaction", async (req, res) => {
    const { email, day, progress, lastSubmissionDays } = req.body;
    const user = db.users.find(u => u.email === email);
    if (!user) return res.status(404).json({ error: "User not found" });

    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      let prompt = `You are the Engineering Manager at ${user.activeInternship?.company || "Tech Corp"}. 
      It is Day ${day} of the 30-day internship. 
      Student Progress: ${progress}%. 
      Days since last submission: ${lastSubmissionDays}.`;

      if (day === 14 && progress < 40) {
        prompt += " Send an urgent check-in message. Be firm but professional.";
      } else if (day % 7 === 5) {
        prompt += " It's Friday. Ask for a 'Weekly Snippet' status update.";
      } else {
        prompt += " Send a daily stand-up ping. Ask what they are working on today.";
      }

      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt + "\nProvide a JSON response with: sender, text, urgency (High/Normal), type (Standup/Urgent/Friday).",
        config: { responseMimeType: "application/json" }
      });

      const response = await model;
      res.json(JSON.parse(response.text || "{}"));
    } catch (error) {
      res.status(500).json({ error: "Failed to trigger interaction" });
    }
  });

  app.post("/api/simulation/peer-review", async (req, res) => {
    const { company } = req.body;
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a short code snippet (5-10 lines) with a subtle bug for a peer review simulation at ${company}. 
        Also provide the name of the AI peer (another intern).
        Provide a JSON response with: peerName, snippet, context (what the code is supposed to do).`,
        config: { responseMimeType: "application/json" }
      });

      const response = await model;
      res.json(JSON.parse(response.text || "{}"));
    } catch (error) {
      res.status(500).json({ error: "Failed to generate peer review" });
    }
  });

  app.get("/api/profile", (req, res) => {
    const email = req.query.email;
    const user = db.users.find(u => u.email === email) || db.users[0];
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  app.get("/api/tracks", (req, res) => {
    res.json(db.tracks);
  });

  app.post("/api/workplace/boss-guidance", async (req, res) => {
    const { sprintStatus, company } = req.body;
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a high-pressure, but fair Engineering Manager at ${company}. 
        The current sprint status is: ${JSON.stringify(sprintStatus)}.
        Give a short (2-3 sentences), professional, and slightly intense guidance message to your intern. 
        Focus on priorities and the "Shadow Score" impact.
        
        Provide a JSON response with:
        - bossName: (e.g., Marcus, Sarah, Dave)
        - message: The guidance text.
        - priority: (Critical, High, Normal)`,
        config: { responseMimeType: "application/json" }
      });
      const response = await model;
      res.json(JSON.parse(response.text || "{}"));
    } catch (error) {
      res.status(500).json({ error: "Failed to get boss guidance" });
    }
  });

  app.post("/api/workplace/review-task", async (req, res) => {
    const { task, code, company } = req.body;
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a Senior Tech Lead at ${company}. 
        Review the following task and code submission.
        Task: ${task.title}
        Code: ${code}
        
        Provide a JSON response with:
        - approved: (boolean)
        - feedback: (string)
        - shadowScoreImpact: (number between -10 and +30)
        - xpGain: (number between 50 and 500)`,
        config: { responseMimeType: "application/json" }
      });
      const response = await model;
      res.json(JSON.parse(response.text || "{}"));
    } catch (error) {
      res.status(500).json({ error: "Failed to review task" });
    }
  });

  app.post("/api/workplace/event", async (req, res) => {
    const { userId, trackId } = req.body;
    
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      const eventTypes = ["The Pivot", "The Bug Report", "The Stand-up"];
      const selectedEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a short, realistic workplace message for a simulation.
        Event Type: ${selectedEvent}
        Company Context: ${db.tracks.find(t => t.id === trackId)?.company || "Tech Corp"}
        
        Provide a JSON response with:
        - persona: (PM, Tech Lead, or HR)
        - message: The actual message text.
        - urgency: (High, Medium, Low)
        - shadowScoreImpact: (A number between -20 and +20)`,
        config: {
          responseMimeType: "application/json"
        }
      });

      const response = await model;
      const eventData = JSON.parse(response.text || "{}");
      
      res.json({
        type: selectedEvent,
        ...eventData
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to trigger event" });
    }
  });

  app.post("/api/workplace/chat", async (req, res) => {
    const { message, company, history } = req.body;
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a member of a tech team at ${company}. 
        The team is chatting in Slack. 
        Recent history: ${JSON.stringify(history)}
        User message: ${message}
        
        Respond as a specific persona (Tech Lead, PM, or Senior Dev).
        Keep it short, professional, and realistic for a workplace chat.
        
        Provide a JSON response with:
        - sender: (e.g., Dave (Tech Lead), Sarah (PM), Mike (Senior Dev))
        - text: The response message.
        - persona: (tech, pm, or boss)`,
        config: { responseMimeType: "application/json" }
      });
      const response = await model;
      res.json(JSON.parse(response.text || "{}"));
    } catch (error) {
      res.status(500).json({ error: "Failed to chat" });
    }
  });

  app.post("/api/submissions/evaluate", async (req, res) => {
    const { code, taskId } = req.body;
    
    try {
      // In a real app, we'd call Gemini here.
      // We'll use the service we created (though it's client-side, we can mimic it here or just use the logic)
      // Since server.ts is Node, we can import the SDK directly.
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Evaluate the following code for a task.
        
        Code:
        ${code}
        
        Provide a JSON response with:
        - quality: (0-100)
        - architecture: (0-100)
        - communication: (0-100)
        - feedback: A short professional feedback string.`,
        config: {
          responseMimeType: "application/json"
        }
      });

      const response = await model;
      const evaluation = JSON.parse(response.text || "{}");

      const quality = evaluation.quality || 70;
      const architecture = evaluation.architecture || 70;
      const communication = evaluation.communication || 70;
      const resolutionTime = 1.5; // hours

      const scoreChange = Math.floor(((quality * 0.4) + (architecture * 0.3) + (communication * 0.2)) / (resolutionTime * 0.1));
      
      db.users[0].shadowScore += scoreChange;
      db.users[0].workLog.unshift({
        id: `log-${Date.now()}`,
        type: "PR",
        title: "Simulation Submission",
        status: "Merged",
        date: new Date().toISOString().split('T')[0],
        score: scoreChange
      });
      
      res.json({
        success: true,
        scoreChange,
        breakdown: { quality, architecture, communication, resolutionTime },
        feedback: evaluation.feedback || "Good effort on this task."
      });
    } catch (error) {
      console.error("Evaluation error:", error);
      res.status(500).json({ success: false, error: "Failed to evaluate submission" });
    }
  });

  app.post("/api/simulation/peer-review-eval", async (req, res) => {
    const { peerReview, userFeedback, company } = req.body;
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Evaluate a student's peer review feedback for a code snippet at ${company}.
        
        Peer's Code:
        ${peerReview.snippet}
        
        Student's Feedback:
        ${userFeedback}
        
        Provide a JSON response with:
        - scoreImpact: (0-15) based on technical accuracy and empathy.
        - feedback: A short response from the peer (e.g., "Oh, I see it now! Thanks for catching that.").`,
        config: { responseMimeType: "application/json" }
      });

      const response = await model;
      res.json(JSON.parse(response.text || "{}"));
    } catch (error) {
      res.status(500).json({ error: "Failed to evaluate peer review" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

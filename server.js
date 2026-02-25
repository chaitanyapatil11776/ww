










// // // /* =====================================
// // //    🚀 STARTUP SURVIVAL AI - MEDIUM MODE
// // //    Clean JSON API for React Native
// // // ===================================== */

// // // require("dotenv").config();

// // // const express = require("express");
// // // const cors = require("cors");
// // // const rateLimit = require("express-rate-limit");
// // // const helmet = require("helmet");
// // // const { GoogleGenAI } = require("@google/genai");

// // // const app = express();
// // // const PORT = 3000;

// // // /* ===============================
// // //    🔐 SECURITY
// // // ================================ */

// // // app.use(helmet());
// // // app.use(cors());
// // // app.use(express.json());

// // // const limiter = rateLimit({
// // //   windowMs: 60 * 1000,
// // //   max: 30
// // // });
// // // app.use(limiter);

// // // /* ===============================
// // //    🔑 GEMINI CONFIG
// // // ================================ */

// // // if (!process.env.GEMINI_API_KEY) {
// // //   console.log("❌ Add GEMINI_API_KEY in .env file");
// // //   process.exit(1);
// // // }

// // // const ai = new GoogleGenAI({
// // //   apiKey: process.env.GEMINI_API_KEY
// // // });

// // // /* ===============================
// // //    🔁 SAFE GENERATE
// // // ================================ */

// // // async function safeGenerate(prompt) {
// // //   try {
// // //     const response = await ai.models.generateContent({
// // //       model: "gemini-2.0-flash",
// // //       contents: prompt
// // //     });

// // //     if (response?.text) return response.text;

// // //     if (response?.candidates?.length > 0) {
// // //       return response.candidates[0]?.content?.parts?.[0]?.text || "";
// // //     }

// // //     return "";
// // //   } catch (err) {
// // //     console.log("AI Error:", err.message);
// // //     return "AI generation failed.";
// // //   }
// // // }

// // // /* ===============================
// // //    📊 MAIN REPORT ROUTE
// // // ================================ */

// // // app.post("/analyze", async (req, res) => {
// // //   try {
// // //     const { ideaName, problem, audience, country, budget } = req.body;

// // //     if (!ideaName || !problem || !audience || !country || !budget) {
// // //       return res.json({ success: false });
// // //     }

// // //     global.latestInput = {
// // //       ideaName,
// // //       problem,
// // //       audience,
// // //       country,
// // //       budget
// // //     };

// // //     const prompt = `
// // // You are a venture capitalist.

// // // Return ONLY raw valid JSON.
// // // Each section should be 150–300 words.
// // // Keep it professional and medium-length.
// // // Avoid very long explanations.

// // // {
// // //   "Executive Summary": "...",
// // //   "Problem Validation": "...",
// // //   "Market Opportunity": "...",
// // //   "Target Audience Insights": "...",
// // //   "Competitor Analysis": "...",
// // //   "Unique Differentiation": "...",
// // //   "Monetization Model": "...",
// // //   "Go-To-Market Strategy": "...",
// // //   "Financial Projection": "...",
// // //   "Risk Assessment": "...",
// // //   "AI Investment Score": "Numeric score with short explanation"
// // // }

// // // Startup Idea: ${ideaName}
// // // Problem: ${problem}
// // // Target Audience: ${audience}
// // // Country: ${country}
// // // Budget: ${budget}
// // // `;

// // //     const raw = await safeGenerate(prompt);

// // //     let cleaned = raw.trim();

// // //     if (cleaned.startsWith("```")) {
// // //       cleaned = cleaned.replace(/```json/g, "")
// // //                        .replace(/```/g, "")
// // //                        .trim();
// // //     }

// // //     const first = cleaned.indexOf("{");
// // //     const last = cleaned.lastIndexOf("}");

// // //     if (first !== -1 && last !== -1) {
// // //       cleaned = cleaned.substring(first, last + 1);
// // //     }

// // //     const report = JSON.parse(cleaned);

// // //     global.latestReport = report;

// // //     res.json({
// // //       success: true,
// // //       sections: Object.keys(report)
// // //     });

// // //   } catch (err) {
// // //     console.log("Server Error:", err.message);
// // //     res.json({ success: false });
// // //   }
// // // });

// // // /* ===============================
// // //    🔍 MEDIUM DETAIL SECTION ROUTE
// // // ================================ */

// // // app.get("/section/:name", async (req, res) => {
// // //   try {
// // //     const sectionName = req.params.name;

// // //     if (!global.latestInput) {
// // //       return res.json({ success: false });
// // //     }

// // //     const { ideaName, problem, audience, country, budget } =
// // //       global.latestInput;

// // //     const prompt = `
// // // You are a venture capitalist.

// // // Generate a MEDIUM-LENGTH professional analysis (300–500 words)
// // // for the section: "${sectionName}"

// // // Startup Idea: ${ideaName}
// // // Problem: ${problem}
// // // Target Audience: ${audience}
// // // Country: ${country}
// // // Budget: ${budget}

// // // Guidelines:
// // // - Structured with small subheadings
// // // - Clear and readable
// // // - Practical investor tone
// // // - Include relevant numbers where useful
// // // - Avoid excessive detail
// // // `;

// // //     const content = await safeGenerate(prompt);

// // //     res.json({
// // //       success: true,
// // //       content
// // //     });

// // //   } catch (err) {
// // //     res.json({ success: false });
// // //   }
// // // });

// // // /* ===============================
// // //    🚀 START SERVER
// // // ================================ */

// // // // app.listen(PORT, () => {
// // // //   console.log("🚀 Server running at http://10.206.228.30:3000");
// // // // });


// // // app.listen(PORT, "0.0.0.0", () => {
// // //   console.log(`🚀 Server running at http://10.171.41.30:${PORT}`);
// // // });










// // ///---------------------rapidapi-------------

// // // require("dotenv").config();
// // // const express = require("express");
// // // const axios = require("axios");
// // // const cors = require("cors");
// // // const path = require("path");

// // // const app = express();
// // // app.use(cors());
// // // app.use(express.json());
// // // app.use(express.static(path.join(__dirname, "public")));

// // // const PORT = 5000;

// // // // API Route
// // // app.get("/api/analyze", async (req, res) => {
// // //   const domain = req.query.domain;

// // //   if (!domain) {
// // //     return res.status(400).json({ message: "Domain is required" });
// // //   }

// // //   try {
// // //     const response = await axios.get(
// // //       "https://similarweb-insights.p.rapidapi.com/traffic",
// // //       {
// // //         params: { domain },
// // //         headers: {
// // //           "x-rapidapi-key": process.env.RAPID_API_KEY,
// // //           "x-rapidapi-host": "similarweb-insights.p.rapidapi.com",
// // //         },
// // //       }
// // //     );

// // //     const visits = response.data.Visits;

// // //     // Competition Level
// // //     let competitionLevel = "";
// // //     let competitionScore = 0;

// // //     if (visits > 10000000) {
// // //       competitionLevel = "Very High";
// // //       competitionScore = 90;
// // //     } else if (visits > 1000000) {
// // //       competitionLevel = "High";
// // //       competitionScore = 75;
// // //     } else if (visits > 100000) {
// // //       competitionLevel = "Medium";
// // //       competitionScore = 50;
// // //     } else {
// // //       competitionLevel = "Low";
// // //       competitionScore = 25;
// // //     }

// // //     // Risk Assessment
// // //     let riskLevel = competitionScore > 80 ? "High Risk" :
// // //                     competitionScore > 60 ? "Moderate Risk" :
// // //                     "Low Risk";

// // //     // Startup Health Score (Simple Logic)
// // //     const marketScore = 80; // Assume good demand for now
// // //     const healthScore = Math.round(
// // //       (marketScore * 0.4) +
// // //       ((100 - competitionScore) * 0.6)
// // //     );

// // //     res.json({
// // //       domain,
// // //       visits,
// // //       competitionLevel,
// // //       competitionScore,
// // //       riskLevel,
// // //       startupHealthScore: healthScore
// // //     });

// // //   } catch (error) {
// // //     console.error(error.response?.data || error.message);
// // //     res.status(500).json({ message: "API Error" });
// // //   }
// // // });

// // // app.listen(PORT, () => {
// // //   console.log(`Server running at http://localhost:${PORT}`);
// // // });














// /* ============================================
//    🚀 STARTUP SURVIVAL AI - FULL PRO VERSION
//    Gemini + SimilarWeb Integrated
// ============================================ */

// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
// const axios = require("axios");
// const { GoogleGenAI } = require("@google/genai");

// const app = express();

// /* ===============================
//    🔐 SECURITY
// ================================ */
// app.use(helmet());
// app.use(cors());
// app.use(express.json());

// const limiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 30
// });
// app.use(limiter);

// /* ===============================
//    🔑 ENV VALIDATION
// ================================ */

// if (!process.env.GEMINI_API_KEY) {
//   console.log("❌ Missing GEMINI_API_KEY in .env");
//   process.exit(1);
// }

// if (!process.env.RAPID_API_KEY) {
//   console.log("❌ Missing RAPID_API_KEY in .env");
//   process.exit(1);
// }

// /* ===============================
//    🔑 GEMINI CONFIG
// ================================ */

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY
// });

// /* ===============================
//    🔁 SAFE AI GENERATION
// ================================ */

// async function safeGenerate(prompt) {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: prompt
//     });

//     if (response?.text) return response.text;

//     if (response?.candidates?.length > 0) {
//       return response.candidates[0]?.content?.parts?.[0]?.text || "";
//     }

//     return "";
//   } catch (err) {
//     console.log("AI Error:", err.message);
//     return "AI generation failed.";
//   }
// }

// /* ============================================
//    📊 1️⃣ MAIN STARTUP REPORT (UNCHANGED LOGIC)
// ============================================ */

// app.post("/analyze", async (req, res) => {
//   try {
//     const { ideaName, problem, audience, country, budget } = req.body;

//     if (!ideaName || !problem || !audience || !country || !budget) {
//       return res.json({ success: false });
//     }

//     global.latestInput = {
//       ideaName,
//       problem,
//       audience,
//       country,
//       budget
//     };

//     const prompt = `
// You are a venture capitalist.

// Return ONLY raw valid JSON.
// Each section should be 150–300 words.
// Keep it professional and medium-length.
// Avoid very long explanations.

// {
//   "Executive Summary": "...",
//   "Problem Validation": "...",
//   "Market Opportunity": "...",
//   "Target Audience Insights": "...",
//   "Competitor Analysis": "...",
//   "Unique Differentiation": "...",
//   "Monetization Model": "...",
//   "Go-To-Market Strategy": "...",
//   "Financial Projection": "...",
//   "Risk Assessment": "...",
//   "AI Investment Score": "Numeric score with short explanation"
// }

// Startup Idea: ${ideaName}
// Problem: ${problem}
// Target Audience: ${audience}
// Country: ${country}
// Budget: ${budget}
// `;

//     const raw = await safeGenerate(prompt);

//     let cleaned = raw.trim();

//     if (cleaned.startsWith("```")) {
//       cleaned = cleaned.replace(/```json/g, "")
//                        .replace(/```/g, "")
//                        .trim();
//     }

//     const first = cleaned.indexOf("{");
//     const last = cleaned.lastIndexOf("}");

//     if (first !== -1 && last !== -1) {
//       cleaned = cleaned.substring(first, last + 1);
//     }

//     const report = JSON.parse(cleaned);

//     global.latestReport = report;

//     res.json({
//       success: true,
//       sections: Object.keys(report)
//     });

//   } catch (err) {
//     console.log("Server Error:", err.message);
//     res.json({ success: false });
//   }
// });

// /* ============================================
//    🔍 2️⃣ MEDIUM DETAIL SECTION ROUTE
// ============================================ */

// app.get("/section/:name", async (req, res) => {
//   try {
//     const sectionName = req.params.name;

//     if (!global.latestInput) {
//       return res.json({ success: false });
//     }

//     const { ideaName, problem, audience, country, budget } =
//       global.latestInput;

//     const prompt = `
// You are a venture capitalist.

// Generate a MEDIUM-LENGTH professional analysis (300–500 words)
// for the section: "${sectionName}"

// Startup Idea: ${ideaName}
// Problem: ${problem}
// Target Audience: ${audience}
// Country: ${country}
// Budget: ${budget}

// - Structured with small subheadings
// - Clear investor tone
// - Practical insights
// - Include relevant numbers where useful
// `;

//     const content = await safeGenerate(prompt);

//     res.json({
//       success: true,
//       content
//     });

//   } catch (err) {
//     res.json({ success: false });
//   }
// });

// /* ============================================
//    🌍 3️⃣ MARKET COMPETITION ANALYSIS (RapidAPI)
// ============================================ */

// app.get("/api/market-analysis", async (req, res) => {
//   try {
//     const domain = req.query.domain;

//     if (!domain) {
//       return res.status(400).json({ message: "Domain is required" });
//     }

//     const response = await axios.get(
//       "https://similarweb-insights.p.rapidapi.com/traffic",
//       {
//         params: { domain },
//         headers: {
//           "x-rapidapi-key": process.env.RAPID_API_KEY,
//           "x-rapidapi-host": process.env.RAPID_API_HOST
//         }
//       }
//     );

//     const visits = response.data.Visits || 0;

//     let competitionLevel = "";
//     let competitionScore = 0;

//     if (visits > 10000000) {
//       competitionLevel = "Very High";
//       competitionScore = 90;
//     } else if (visits > 1000000) {
//       competitionLevel = "High";
//       competitionScore = 75;
//     } else if (visits > 100000) {
//       competitionLevel = "Medium";
//       competitionScore = 50;
//     } else {
//       competitionLevel = "Low";
//       competitionScore = 25;
//     }

//     const riskLevel =
//       competitionScore > 80
//         ? "High Risk"
//         : competitionScore > 60
//         ? "Moderate Risk"
//         : "Low Risk";

//     const marketScore = 80;

//     const startupHealthScore = Math.round(
//       (marketScore * 0.4) +
//       ((100 - competitionScore) * 0.6)
//     );

//     res.json({
//       domain,
//       visits,
//       competitionLevel,
//       competitionScore,
//       riskLevel,
//       startupHealthScore
//     });

//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({ message: "Market API Error" });
//   }
// });

// /* ============================================
//    🚀 START SERVER
// ============================================ */

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


/* ============================================
   🚀 STARTUP SURVIVAL AI - FULL PRO VERSION
   Gemini + SimilarWeb + Startup News
============================================ */

// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
// const axios = require("axios");
// const { GoogleGenAI } = require("@google/genai");

// const app = express();

// /* ===============================
//    🔐 SECURITY
// ================================ */

// app.use(helmet());
// app.use(cors());
// app.use(express.json());

// const limiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 30
// });
// app.use(limiter);

// /* ===============================
//    🔑 ENV VALIDATION
// ================================ */

// if (!process.env.GEMINI_API_KEY) {
//   console.log("❌ Missing GEMINI_API_KEY in .env");
//   process.exit(1);
// }

// if (!process.env.RAPID_API_KEY) {
//   console.log("❌ Missing RAPID_API_KEY in .env");
//   process.exit(1);
// }

// /* ===============================
//    🤖 GEMINI CONFIG
// ================================ */

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY
// });

// /* ===============================
//    🔁 SAFE AI GENERATION
// ================================ */

// async function safeGenerate(prompt) {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: prompt
//     });

//     if (response?.text) return response.text;

//     if (response?.candidates?.length > 0) {
//       return response.candidates[0]?.content?.parts?.[0]?.text || "";
//     }

//     return "";
//   } catch (err) {
//     console.log("AI Error:", err.message);
//     return "AI generation failed.";
//   }
// }

// /* ============================================
//    📊 1️⃣ MAIN STARTUP REPORT
// ============================================ */

// app.post("/analyze", async (req, res) => {
//   try {
//     const { ideaName, problem, audience, country, budget } = req.body;

//     if (!ideaName || !problem || !audience || !country || !budget) {
//       return res.json({ success: false });
//     }

//     global.latestInput = {
//       ideaName,
//       problem,
//       audience,
//       country,
//       budget
//     };

//     const prompt = `
// You are a venture capitalist.

// Return ONLY raw valid JSON.

// {
//   "Executive Summary": "...",
//   "Problem Validation": "...",
//   "Market Opportunity": "...",
//   "Target Audience Insights": "...",
//   "Competitor Analysis": "...",
//   "Unique Differentiation": "...",
//   "Monetization Model": "...",
//   "Go-To-Market Strategy": "...",
//   "Financial Projection": "...",
//   "Risk Assessment": "...",
//   "AI Investment Score": "Numeric score with short explanation"
// }

// Startup Idea: ${ideaName}
// Problem: ${problem}
// Target Audience: ${audience}
// Country: ${country}
// Budget: ${budget}
// `;

//     const raw = await safeGenerate(prompt);

//     let cleaned = raw.trim();

//     if (cleaned.startsWith("```")) {
//       cleaned = cleaned.replace(/```json/g, "")
//                        .replace(/```/g, "")
//                        .trim();
//     }

//     const first = cleaned.indexOf("{");
//     const last = cleaned.lastIndexOf("}");

//     if (first !== -1 && last !== -1) {
//       cleaned = cleaned.substring(first, last + 1);
//     }

//     const report = JSON.parse(cleaned);
//     global.latestReport = report;

//     res.json({
//       success: true,
//       sections: Object.keys(report)
//     });

//   } catch (err) {
//     console.log("Analyze Error:", err.message);
//     res.json({ success: false });
//   }
// });

// /* ============================================
//    🔍 2️⃣ SECTION DETAIL ROUTE
// ============================================ */

// app.get("/section/:name", async (req, res) => {
//   try {
//     const sectionName = req.params.name;

//     if (!global.latestInput) {
//       return res.json({ success: false });
//     }

//     const { ideaName, problem, audience, country, budget } =
//       global.latestInput;

//     const prompt = `
// Generate a professional analysis (300–500 words)
// for the section: "${sectionName}"

// Startup Idea: ${ideaName}
// Problem: ${problem}
// Target Audience: ${audience}
// Country: ${country}
// Budget: ${budget}
// `;

//     const content = await safeGenerate(prompt);

//     res.json({
//       success: true,
//       content
//     });

//   } catch (err) {
//     res.json({ success: false });
//   }
// });

// /* ============================================
//    🌍 3️⃣ MARKET COMPETITION ANALYSIS
// ============================================ */

// app.get("/api/market-analysis", async (req, res) => {
//   try {
//     const domain = req.query.domain;

//     if (!domain) {
//       return res.status(400).json({ message: "Domain is required" });
//     }

//     const response = await axios.get(
//       "https://similarweb-insights.p.rapidapi.com/traffic",
//       {
//         params: { domain },
//         headers: {
//           "x-rapidapi-key": process.env.RAPID_API_KEY,
//           "x-rapidapi-host": "similarweb-insights.p.rapidapi.com"
//         }
//       }
//     );

//     const visits = response.data.Visits || 0;

//     let competitionScore =
//       visits > 10000000 ? 90 :
//       visits > 1000000  ? 75 :
//       visits > 100000   ? 50 : 25;

//     const competitionLevel =
//       competitionScore >= 90 ? "Very High" :
//       competitionScore >= 75 ? "High" :
//       competitionScore >= 50 ? "Medium" : "Low";

//     const riskLevel =
//       competitionScore > 80 ? "High Risk" :
//       competitionScore > 60 ? "Moderate Risk" : "Low Risk";

//     const startupHealthScore = Math.round(
//       (80 * 0.4) + ((100 - competitionScore) * 0.6)
//     );

//     res.json({
//       domain,
//       visits,
//       competitionLevel,
//       competitionScore,
//       riskLevel,
//       startupHealthScore
//     });

//   } catch (error) {
//     console.error("Market API Error:", error.response?.data || error.message);
//     res.status(500).json({ message: "Market API Error" });
//   }
// });

// /* ============================================
//    📰 4️⃣ STARTUP NEWS SEARCH
// ============================================ */

// app.get("/api/startup-news", async (req, res) => {
//   try {
//     const query = req.query.q;

//     if (!query) {
//       return res.status(400).json({ message: "Search query required" });
//     }

//     const response = await axios.get(
//       "https://real-time-news-data.p.rapidapi.com/search",
//       {
//         params: {
//           query: query,
//           limit: 10,
//           time_published: "anytime",
//           country: "US",
//           lang: "en"
//         },
//         headers: {
//           "x-rapidapi-key": process.env.RAPID_API_KEY,
//           "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
//         }
//       }
//     );

//     res.json({
//       success: true,
//       results: response.data.data
//     });

//   } catch (error) {
//     console.error("News API Error:", error.response?.data || error.message);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch startup news"
//     });
//   }
// });

// /* ============================================
//    🚀 START SERVER
// ============================================ */

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Startup Survival AI running on port ${PORT}`);
// });









// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
// const axios = require("axios");
// const { GoogleGenAI } = require("@google/genai");

// const app = express();

// /* ===============================
//    🔐 SECURITY
// ================================ */

// app.use(helmet());
// app.use(cors());
// app.use(express.json());

// const limiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 30
// });
// app.use(limiter);

// /* ===============================
//    🔑 ENV VALIDATION
// ================================ */

// if (!process.env.GEMINI_API_KEY) {
//   console.log("❌ Missing GEMINI_API_KEY in .env");
//   process.exit(1);
// }

// if (!process.env.RAPID_API_KEY) {
//   console.log("❌ Missing RAPID_API_KEY in .env");
//   process.exit(1);
// }

// /* ===============================
//    🤖 GEMINI CONFIG
// ================================ */

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY
// });

// /* ===============================
//    🔁 SAFE AI GENERATION
// ================================ */

// async function safeGenerate(prompt) {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: prompt
//     });

//     if (response?.text) return response.text;

//     if (response?.candidates?.length > 0) {
//       return response.candidates[0]?.content?.parts?.[0]?.text || "";
//     }

//     return "";
//   } catch (err) {
//     console.log("AI Error:", err.message);
//     return "AI generation failed.";
//   }
// }

// /* ============================================
//    📊 1️⃣ MAIN STARTUP REPORT
// ============================================ */

// app.post("/analyze", async (req, res) => {
//   try {
//     const { ideaName, problem, audience, country, budget } = req.body;

//     if (!ideaName || !problem || !audience || !country || !budget) {
//       return res.json({ success: false });
//     }

//     global.latestInput = {
//       ideaName,
//       problem,
//       audience,
//       country,
//       budget
//     };

//     const prompt = `
// You are a venture capitalist.

// Return ONLY raw valid JSON.

// {
//   "Executive Summary": "...",
//   "Problem Validation": "...",
//   "Market Opportunity": "...",
//   "Target Audience Insights": "...",
//   "Competitor Analysis": "...",
//   "Unique Differentiation": "...",
//   "Monetization Model": "...",
//   "Go-To-Market Strategy": "...",
//   "Financial Projection": "...",
//   "Risk Assessment": "...",
//   "AI Investment Score": "Numeric score with short explanation"
// }

// Startup Idea: ${ideaName}
// Problem: ${problem}
// Target Audience: ${audience}
// Country: ${country}
// Budget: ${budget}
// `;

//     const raw = await safeGenerate(prompt);

//     let cleaned = raw.trim();

//     if (cleaned.startsWith("```")) {
//       cleaned = cleaned.replace(/```json/g, "")
//                        .replace(/```/g, "")
//                        .trim();
//     }

//     const first = cleaned.indexOf("{");
//     const last = cleaned.lastIndexOf("}");

//     if (first !== -1 && last !== -1) {
//       cleaned = cleaned.substring(first, last + 1);
//     }

//     const report = JSON.parse(cleaned);
//     global.latestReport = report;

//     res.json({
//       success: true,
//       sections: Object.keys(report)
//     });

//   } catch (err) {
//     console.log("Analyze Error:", err.message);
//     res.json({ success: false });
//   }
// });

// /* ============================================
//    🔍 2️⃣ SECTION DETAIL ROUTE
// ============================================ */

// app.get("/section/:name", async (req, res) => {
//   try {
//     const sectionName = req.params.name;

//     if (!global.latestInput) {
//       return res.json({ success: false });
//     }

//     const { ideaName, problem, audience, country, budget } =
//       global.latestInput;

//     const prompt = `
// Generate a professional analysis (300–500 words)
// for the section: "${sectionName}"

// Startup Idea: ${ideaName}
// Problem: ${problem}
// Target Audience: ${audience}
// Country: ${country}
// Budget: ${budget}
// `;

//     const content = await safeGenerate(prompt);

//     res.json({
//       success: true,
//       content
//     });

//   } catch (err) {
//     res.json({ success: false });
//   }
// });

// /* ============================================
//    🌍 3️⃣ MARKET COMPETITION ANALYSIS
// ============================================ */

// app.get("/api/market-analysis", async (req, res) => {
//   try {
//     const domain = req.query.domain;

//     if (!domain) {
//       return res.status(400).json({ message: "Domain is required" });
//     }

//     const response = await axios.get(
//       "https://similarweb-insights.p.rapidapi.com/traffic",
//       {
//         params: { domain },
//         headers: {
//           "x-rapidapi-key": process.env.RAPID_API_KEY,
//           "x-rapidapi-host": "similarweb-insights.p.rapidapi.com"
//         }
//       }
//     );

//     const visits = response.data.Visits || 0;

//     let competitionScore =
//       visits > 10000000 ? 90 :
//       visits > 1000000  ? 75 :
//       visits > 100000   ? 50 : 25;

//     const competitionLevel =
//       competitionScore >= 90 ? "Very High" :
//       competitionScore >= 75 ? "High" :
//       competitionScore >= 50 ? "Medium" : "Low";

//     const riskLevel =
//       competitionScore > 80 ? "High Risk" :
//       competitionScore > 60 ? "Moderate Risk" : "Low Risk";

//     const startupHealthScore = Math.round(
//       (80 * 0.4) + ((100 - competitionScore) * 0.6)
//     );

//     res.json({
//       domain,
//       visits,
//       competitionLevel,
//       competitionScore,
//       riskLevel,
//       startupHealthScore
//     });

//   } catch (error) {
//     console.error("Market API Error:", error.response?.data || error.message);
//     res.status(500).json({ message: "Market API Error" });
//   }
// });

// /* ============================================
//    📰 4️⃣ STARTUP NEWS SEARCH (FIXED IMAGE)
// ============================================ */

// app.get("/api/startup-news", async (req, res) => {
//   try {
//     const query = req.query.q;

//     if (!query) {
//       return res.status(400).json({ message: "Search query required" });
//     }

//     const response = await axios.get(
//       "https://real-time-news-data.p.rapidapi.com/search",
//       {
//         params: {
//           query: query,
//           limit: 10,
//           time_published: "anytime",
//           country: "US",
//           lang: "en"
//         },
//         headers: {
//           "x-rapidapi-key": process.env.RAPID_API_KEY,
//           "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
//         }
//       }
//     );

//     const formattedNews = response.data.data.map(item => ({
//       title: item.title,
//       summary: item.snippet || item.summary || "",
//       link: item.link,
//       published_date: item.published_datetime_utc || "",
//       image_url: item.photo_url || item.thumbnail || ""
//     }));

//     res.json({
//       success: true,
//       results: formattedNews
//     });

//   } catch (error) {
//     console.error("News API Error:", error.response?.data || error.message);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch startup news"
//     });
//   }
// });

// /* ============================================
//    🚀 START SERVER
// ============================================ */

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Startup Survival AI running on port ${PORT}`);
// });











// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
// const axios = require("axios");
// const { GoogleGenAI } = require("@google/genai");

// const app = express();

// /* ===============================
//    🔐 SECURITY
// ================================ */

// app.use(helmet());
// app.use(cors());
// app.use(express.json());

// const limiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 30
// });
// app.use(limiter);

// /* ===============================
//    🔑 ENV VALIDATION
// ================================ */

// if (!process.env.GEMINI_API_KEY) {
//   console.log("❌ Missing GEMINI_API_KEY in .env");
//   process.exit(1);
// }

// if (!process.env.RAPID_API_KEY) {
//   console.log("❌ Missing RAPID_API_KEY in .env");
//   process.exit(1);
// }

// /* ===============================
//    🤖 GEMINI CONFIG
// ================================ */

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY
// });

// /* ===============================
//    🔁 SAFE AI GENERATION
// ================================ */

// async function safeGenerate(prompt, retries = 3, delay = 2000) {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash", // ✅ Correct model for @google/genai
//       contents: prompt
//     });

//     if (response?.text) return response.text;

//     if (response?.candidates?.length > 0) {
//       return response.candidates[0]?.content?.parts?.[0]?.text || "";
//     }

//     return "";

//   } catch (err) {

//     console.log("AI Error:", err.message);

//     // 🔥 Handle 429 with exponential backoff
//     if (err.message.includes("429") && retries > 0) {
//       console.log(`Retrying in ${delay / 1000}s...`);
//       await new Promise(r => setTimeout(r, delay));
//       return safeGenerate(prompt, retries - 1, delay * 2);
//     }

//     return "AI generation failed.";
//   }
// }

// /* ============================================
//    📊 1️⃣ MAIN STARTUP REPORT
// ============================================ */

// app.post("/analyze", async (req, res) => {
//   try {
//     const { ideaName, problem, audience, country, budget } = req.body;

//     if (!ideaName || !problem || !audience || !country || !budget) {
//       return res.json({ success: false, message: "Missing fields" });
//     }

//     global.latestInput = {
//       ideaName,
//       problem,
//       audience,
//       country,
//       budget
//     };

//     const prompt = `
// You are a venture capitalist.

// Return ONLY raw valid JSON.
// Keep output under 800 words.

// {
//   "Executive Summary": "...",
//   "Problem Validation": "...",
//   "Market Opportunity": "...",
//   "Target Audience Insights": "...",
//   "Competitor Analysis": "...",
//   "Unique Differentiation": "...",
//   "Monetization Model": "...",
//   "Go-To-Market Strategy": "...",
//   "Financial Projection": "...",
//   "Risk Assessment": "...",
//   "AI Investment Score": "Numeric score with short explanation"
// }

// Startup Idea: ${ideaName}
// Problem: ${problem}
// Target Audience: ${audience}
// Country: ${country}
// Budget: ${budget}
// `;

//     const raw = await safeGenerate(prompt);

//     if (!raw || raw.includes("AI generation failed")) {
//       return res.json({ success: false, message: "AI failed" });
//     }

//     let cleaned = raw.trim();

//     if (cleaned.startsWith("```")) {
//       cleaned = cleaned.replace(/```json/g, "")
//                        .replace(/```/g, "")
//                        .trim();
//     }

//     const first = cleaned.indexOf("{");
//     const last = cleaned.lastIndexOf("}");

//     if (first !== -1 && last !== -1) {
//       cleaned = cleaned.substring(first, last + 1);
//     }

//     let report;

//     try {
//       report = JSON.parse(cleaned);
//     } catch (parseErr) {
//       console.log("JSON Parse Error:", parseErr.message);
//       return res.json({ success: false, message: "Invalid AI JSON format" });
//     }

//     global.latestReport = report;

//     res.json({
//       success: true,
//       sections: Object.keys(report)
//     });

//   } catch (err) {
//     console.log("Analyze Error:", err.message);
//     res.json({ success: false });
//   }
// });

// /* ============================================
//    🔍 2️⃣ SECTION DETAIL ROUTE
// ============================================ */

// app.get("/section/:name", async (req, res) => {
//   try {
//     const sectionName = req.params.name;

//     if (!global.latestInput) {
//       return res.json({ success: false });
//     }

//     const { ideaName, problem, audience, country, budget } =
//       global.latestInput;

//     const prompt = `
// Generate a professional analysis (300–500 words)
// for the section: "${sectionName}"

// Startup Idea: ${ideaName}
// Problem: ${problem}
// Target Audience: ${audience}
// Country: ${country}
// Budget: ${budget}
// `;

//     const content = await safeGenerate(prompt);

//     res.json({
//       success: true,
//       content
//     });

//   } catch (err) {
//     res.json({ success: false });
//   }
// });

// /* ============================================
//    🌍 3️⃣ MARKET COMPETITION ANALYSIS
// ============================================ */

// app.get("/api/market-analysis", async (req, res) => {
//   try {
//     const domain = req.query.domain;

//     if (!domain) {
//       return res.status(400).json({ message: "Domain is required" });
//     }

//     const response = await axios.get(
//       "https://similarweb-insights.p.rapidapi.com/traffic",
//       {
//         params: { domain },
//         headers: {
//           "x-rapidapi-key": process.env.RAPID_API_KEY,
//           "x-rapidapi-host": "similarweb-insights.p.rapidapi.com"
//         }
//       }
//     );

//     const visits = response.data.Visits || 0;

//     let competitionScore =
//       visits > 10000000 ? 90 :
//       visits > 1000000  ? 75 :
//       visits > 100000   ? 50 : 25;

//     const competitionLevel =
//       competitionScore >= 90 ? "Very High" :
//       competitionScore >= 75 ? "High" :
//       competitionScore >= 50 ? "Medium" : "Low";

//     const riskLevel =
//       competitionScore > 80 ? "High Risk" :
//       competitionScore > 60 ? "Moderate Risk" : "Low Risk";

//     const startupHealthScore = Math.round(
//       (80 * 0.4) + ((100 - competitionScore) * 0.6)
//     );

//     res.json({
//       domain,
//       visits,
//       competitionLevel,
//       competitionScore,
//       riskLevel,
//       startupHealthScore
//     });

//   } catch (error) {
//     console.error("Market API Error:", error.response?.data || error.message);
//     res.status(500).json({ message: "Market API Error" });
//   }
// });

// /* ============================================
//    📰 4️⃣ STARTUP NEWS SEARCH
// ============================================ */

// app.get("/api/startup-news", async (req, res) => {
//   try {
//     const query = req.query.q;

//     if (!query) {
//       return res.status(400).json({ message: "Search query required" });
//     }

//     const response = await axios.get(
//       "https://real-time-news-data.p.rapidapi.com/search",
//       {
//         params: {
//           query,
//           limit: 10,
//           time_published: "anytime",
//           country: "US",
//           lang: "en"
//         },
//         headers: {
//           "x-rapidapi-key": process.env.RAPID_API_KEY,
//           "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
//         }
//       }
//     );

//     const formattedNews = response.data.data.map(item => ({
//       title: item.title,
//       summary: item.snippet || item.summary || "",
//       link: item.link,
//       published_date: item.published_datetime_utc || "",
//       image_url: item.photo_url || item.thumbnail || ""
//     }));

//     res.json({
//       success: true,
//       results: formattedNews
//     });

//   } catch (error) {
//     console.error("News API Error:", error.response?.data || error.message);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch startup news"
//     });
//   }
// });

// /* ============================================
//    🚀 START SERVER
// ============================================ */

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Startup Survival AI running on port ${PORT}`);
// });










require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const axios = require("axios");
const { GoogleGenAI } = require("@google/genai");

const app = express();

/* ===============================
   🔐 SECURITY
================================ */

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30
});
app.use(limiter);

/* ===============================
   🔑 ENV CHECK (DO NOT EXIT ON VERCEL)
================================ */

if (!process.env.GEMINI_API_KEY) {
  console.log("⚠ GEMINI_API_KEY missing");
}

if (!process.env.RAPID_API_KEY) {
  console.log("⚠ RAPID_API_KEY missing");
}

/* ===============================
   🤖 GEMINI CONFIG
================================ */

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

/* ===============================
   SAFE AI GENERATION
================================ */

async function safeGenerate(prompt, retries = 3, delay = 2000) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });

    if (response?.text) return response.text;

    if (response?.candidates?.length > 0) {
      return response.candidates[0]?.content?.parts?.[0]?.text || "";
    }

    return "";
  } catch (err) {
    console.log("AI Error:", err.message);

    if (err.message.includes("429") && retries > 0) {
      await new Promise(r => setTimeout(r, delay));
      return safeGenerate(prompt, retries - 1, delay * 2);
    }

    return "AI generation failed.";
  }
}

/* ============================================
   ROOT ROUTE
============================================ */

app.get("/", (req, res) => {
  res.json({ message: "Startup Survival AI Running 🚀" });
});

/* ============================================
   1️⃣ MAIN STARTUP REPORT
============================================ */

app.post("/analyze", async (req, res) => {
  try {
    const { ideaName, problem, audience, country, budget } = req.body;

    if (!ideaName || !problem || !audience || !country || !budget) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const prompt = `
Return ONLY raw valid JSON:

{
  "Executive Summary": "...",
  "Problem Validation": "...",
  "Market Opportunity": "...",
  "Target Audience Insights": "...",
  "Competitor Analysis": "...",
  "Unique Differentiation": "...",
  "Monetization Model": "...",
  "Go-To-Market Strategy": "...",
  "Financial Projection": "...",
  "Risk Assessment": "...",
  "AI Investment Score": "Numeric score with short explanation"
}

Startup Idea: ${ideaName}
Problem: ${problem}
Target Audience: ${audience}
Country: ${country}
Budget: ${budget}
`;

    const raw = await safeGenerate(prompt);

    if (!raw) {
      return res.json({ success: false, message: "AI failed" });
    }

    res.json({ success: true, result: raw });

  } catch (err) {
    console.log("Analyze Error:", err.message);
    res.status(500).json({ success: false });
  }
});

/* ============================================
   2️⃣ MARKET ANALYSIS
============================================ */

app.get("/api/market-analysis", async (req, res) => {
  try {
    const domain = req.query.domain;

    if (!domain) {
      return res.status(400).json({ message: "Domain is required" });
    }

    const response = await axios.get(
      "https://similarweb-insights.p.rapidapi.com/traffic",
      {
        params: { domain },
        headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "similarweb-insights.p.rapidapi.com"
        }
      }
    );

    const visits = response.data.Visits || 0;

    res.json({
      domain,
      visits
    });

  } catch (error) {
    console.error("Market API Error:", error.message);
    res.status(500).json({ message: "Market API Error" });
  }
});

/* ============================================
   3️⃣ STARTUP NEWS
============================================ */

app.get("/api/startup-news", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Search query required" });
    }

    const response = await axios.get(
      "https://real-time-news-data.p.rapidapi.com/search",
      {
        params: {
          query,
          limit: 10,
          country: "US",
          lang: "en"
        },
        headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
        }
      }
    );

    res.json({
      success: true,
      results: response.data.data
    });

  } catch (error) {
    console.error("News API Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch startup news"
    });
  }
});

/* ============================================
   EXPORT FOR VERCEL (IMPORTANT)
============================================ */

module.exports = app;
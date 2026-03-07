















// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
// const axios = require("axios");
// const https = require("https");
// const googleTrends = require('google-trends-api');
// const app = express();

// /* =================================================
//    🔐 SECURITY
// ================================================= */

// app.use(helmet());
// app.use(cors());
// app.use(express.json());

// app.use(
//   rateLimit({
//     windowMs: 60 * 1000,
//     max: 30,
//     message: { success: false, message: "Too many requests" }
//   })
// );

// /* =================================================
//    🔑 ENV CHECK
// ================================================= */

// if (!process.env.GROQ_API_KEY) {
//   console.error("❌ Missing GROQ_API_KEY");
//   process.exit(1);
// }

// if (!process.env.RAPID_API_KEY) {
//   console.error("❌ Missing RAPID_API_KEY");
//   process.exit(1);
// }

// console.log("✅ All environment variables loaded");

// /* =================================================
//    💾 MEMORY STORE
// ================================================= */

// let latestReport = null;

// /* =================================================
//    🤖 GROQ AI FUNCTION (Using Axios)
// ================================================= */

// async function safeGenerate(prompt) {
//   try {
//     console.log("📨 Sending request to Groq API...");
    
//     const response = await axios.post(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         model: "llama-3.3-70b-versatile",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//         max_tokens: 2048
//       },
//       {
//         headers: {
//           "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
//           "Content-Type": "application/json"
//         },
//         timeout: 30000
//       }
//     );

//     console.log("✅ Groq response received");
//     return response.data?.choices?.[0]?.message?.content || "";

//   } catch (err) {
//     console.error("❌ Groq Error:", err.response?.data?.error?.message || err.message);
//     return null;
//   }
// }

// /* =================================================
//    📊 1️⃣ GENERATE FULL STARTUP REPORT
// ================================================= */

// app.post("/analyze", async (req, res) => {
//   try {
//     const { ideaName, problem, audience, country, budget } = req.body;

//     if (!ideaName || !problem || !audience || !country || !budget) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields required"
//       });
//     }

//     console.log(`\n📊 Analyzing startup: ${ideaName}`);

//     const prompt = `You are a professional startup analyst. Generate a detailed startup investment report in valid JSON format ONLY.

// CRITICAL: Your response must be ONLY valid JSON, nothing else.

// Return this exact JSON structure with detailed content (minimum 300 words per section):

// {
//   "Executive Summary": "Write a comprehensive executive summary here...",
//   "Market Analysis": "Write detailed market analysis here...",
//   "Revenue Model": "Write revenue model details here...",
//   "Risk Assessment": "Write risk assessment here...",
//   "Growth Strategy": "Write growth strategy here..."
// }

// STARTUP DETAILS:
// - Name: ${ideaName}
// - Problem: ${problem}
// - Audience: ${audience}
// - Country: ${country}
// - Budget: $${budget}

// Now generate the report as valid JSON only. Start with { and end with }. No markdown, no code blocks, no extra text.`;

//     const raw = await safeGenerate(prompt);

//     if (!raw) {
//       return res.status(500).json({ 
//         success: false,
//         message: "Failed to generate report from Groq"
//       });
//     }

//     /* ---------- Clean AI Response ---------- */

//     let cleaned = raw.trim();

//     // Remove markdown code blocks
//     if (cleaned.includes("```")) {
//       cleaned = cleaned.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
//     }

//     // Find JSON object
//     const first = cleaned.indexOf("{");
//     const last = cleaned.lastIndexOf("}");

//     console.log(`Raw response length: ${raw.length}, Cleaned length: ${cleaned.length}`);

//     if (first === -1 || last === -1) {
//       console.error("❌ No valid JSON brackets found in response");
//       console.error("Raw response sample:", raw.substring(0, 200));
//       return res.status(500).json({
//         success: false,
//         message: "Invalid response format from AI"
//       });
//     }

//     const jsonString = cleaned.substring(first, last + 1);
    
//     let parsed;

//     try {
//       parsed = JSON.parse(jsonString);
      
//       // Validate all required keys exist
//       const requiredKeys = ["Executive Summary", "Market Analysis", "Revenue Model", "Risk Assessment", "Growth Strategy"];
//       const missingKeys = requiredKeys.filter(key => !parsed[key]);
      
//       if (missingKeys.length > 0) {
//         console.error("❌ Missing required sections:", missingKeys);
//         return res.status(500).json({
//           success: false,
//           message: "Incomplete report sections",
//           missing: missingKeys
//         });
//       }
      
//     } catch (err) {
//       console.error("❌ JSON parse error:", err.message);
//       console.error("Attempted to parse:", jsonString.substring(0, 300));
//       return res.status(500).json({
//         success: false,
//         message: "Failed to parse response"
//       });
//     }

//     latestReport = parsed;

//     console.log("✅ Report generated and stored successfully");

//     res.json({
//       success: true,
//       message: "Analysis completed",
//       sections: Object.keys(parsed),
//       startupName: ideaName,
//       generatedAt: new Date().toISOString()
//     });

//   } catch (err) {
//     console.error("❌ Analyze Error:", err.message);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to analyze startup"
//     });
//   }
// });

// /* =================================================
//    🔍 2️⃣ GET SECTION (SMART MATCH)
// ================================================= */

// app.get("/section/:name", (req, res) => {
//   try {
//     if (!latestReport) {
//       return res.status(400).json({
//         success: false,
//         message: "Run /analyze first"
//       });
//     }

//     const requestName = req.params.name
//       .toLowerCase()
//       .replace(/\s+/g, "")
//       .replace(/[^a-z0-9]/g, "");

//     const matchedKey = Object.keys(latestReport).find(key =>
//       key.toLowerCase()
//         .replace(/\s+/g, "")
//         .replace(/[^a-z0-9]/g, "") === requestName
//     );

//     if (!matchedKey) {
//       return res.status(404).json({
//         success: false,
//         message: `Section '${req.params.name}' not found`,
//         availableSections: Object.keys(latestReport)
//       });
//     }

//     const content = latestReport[matchedKey];

//     console.log(`📖 Retrieved section: ${matchedKey}`);

//     res.json({
//       success: true,
//       section: matchedKey,
//       content,
//       length: content.length,
//       wordCount: content.split(/\s+/).length
//     });

//   } catch (err) {
//     console.error("❌ Section Error:", err.message);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to retrieve section"
//     });
//   }
// });

// /* =================================================
//    🌍 3️⃣ MARKET ANALYSIS (RAPIDAPI)
// ================================================= */

// app.get("/api/market-analysis", async (req, res) => {
//   try {
//     const { domain } = req.query;

//     if (!domain) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Domain parameter required (e.g., ?domain=example.com)" 
//       });
//     }

//     console.log(`📊 Fetching market analysis for: ${domain}`);

//     const response = await axios.get(
//       "https://similarweb-insights.p.rapidapi.com/traffic",
//       {
//         params: { domain },
//         headers: {
//           "x-rapidapi-key": process.env.RAPID_API_KEY,
//           "x-rapidapi-host": "similarweb-insights.p.rapidapi.com"
//         },
//         timeout: 10000
//       }
//     );

//     const visits = response.data?.Visits || 0;

//     const competitionScore =
//       visits > 10000000 ? 90 :
//         visits > 1000000 ? 75 :
//           visits > 100000 ? 50 : 
//             visits > 10000 ? 25 : 10;

//     console.log(`✅ Market analysis retrieved: ${visits.toLocaleString()} visits`);

//     res.json({
//       success: true,
//       domain,
//       visits: visits.toLocaleString(),
//       competitionScore,
//       competitionLevel: competitionScore >= 80 ? "Very High" : competitionScore >= 60 ? "High" : "Medium"
//     });

//   } catch (err) {
//     console.error("❌ Market API Error:", err.message);
//     res.status(500).json({ 
//       success: false,
//       message: "Market API Error" 
//     });
//   }
// });

// /* =================================================
//    📰 4️⃣ STARTUP NEWS
// ================================================= */

// // app.get("/api/startup-news", async (req, res) => {
// //   try {
// //     const { q } = req.query;

// //     if (!q) {
// //       return res.status(400).json({ 
// //         success: false,
// //         message: "Query parameter 'q' required (e.g., ?q=ai+startups)" 
// //       });
// //     }

// //     console.log(`📰 Searching news for: ${q}`);

// //     const response = await axios.get(
// //       "https://real-time-news-data.p.rapidapi.com/search",
// //       {
// //         params: { query: q, limit: 10 },
// //         headers: {
// //           "x-rapidapi-key": process.env.RAPID_API_KEY,
// //           "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
// //         },
// //         timeout: 10000
// //       }
// //     );

// //     const articles = response.data?.data || [];

// //     console.log(`✅ Retrieved ${articles.length} news articles`);

// //     res.json({
// //       success: true,
// //       query: q,
// //       count: articles.length,
// //       results: articles.map(article => ({
// //         title: article.title,
// //         link: article.link,
// //         source: article.source_id,
// //         publishedAt: article.published_datetime_utc,
// //         summary: article.description || "No summary available"
// //       }))
// //     });

// //   } catch (err) {
// //     console.error("❌ News API Error:", err.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "News API Error"
// //     });
// //   }
// // });



// /* =================================================
//    📰 STARTUP NEWS API
// ================================================= */

// app.get("/api/startup-news", async (req, res) => {
//   try {

//     const { q } = req.query;

//     if (!q) {
//       return res.status(400).json({
//         success: false,
//         message: "Query parameter 'q' required (example: ?q=ai startups)"
//       });
//     }

//     console.log(`📰 Searching news for: ${q}`);

//     const response = await axios.get(
//       "https://real-time-news-data.p.rapidapi.com/search",
//       {
//         params: {
//           query: q,
//           limit: 10
//         },
//         headers: {
//           "x-rapidapi-key": process.env.RAPID_API_KEY,
//           "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
//         },
//         timeout: 10000
//       }
//     );

//     const articles = response.data?.data || [];

//     console.log(`✅ Retrieved ${articles.length} news articles`);

//     res.json({
//       success: true,
//       query: q,
//       count: articles.length,

//       results: articles.map(article => ({
//         title: article.title,
//         link: article.link,
//         source: article.source_id,
//         published_date: article.published_datetime_utc,
//         summary: article.description || "No summary available",

//         // ⭐ IMPORTANT FOR IMAGES
//         image_url: article.photo_url || article.thumbnail_url || null
//       }))

//     });

//   } catch (err) {

//     console.error("❌ News API Error:", err.message);

//     res.status(500).json({
//       success: false,
//       message: "News API Error"
//     });

//   }
// });
// app.get("/api/startup-competitors", async (req, res) => {

//   try {

//     const { q } = req.query;

//     if (!q) {
//       return res.status(400).json({
//         success: false,
//         message: "Query required (example: ?q=ai startup)"
//       });
//     }

//     console.log("🔎 Searching competitors for:", q);

//     const response = await axios.get(
//       "https://real-time-news-data.p.rapidapi.com/search",
//       {
//         params: {
//           query: `${q} startup`,
//           limit: 10
//         },
//         headers: {
//           "x-rapidapi-key": process.env.RAPID_API_KEY,
//           "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
//         }
//       }
//     );

//     const articles = response.data?.data || [];

//     const competitors = articles.map(article => {

//       let company = "Startup";

//       if (article.title) {

//         const words = article.title.split(" ");

//         company = words.slice(0,2).join(" ");

//       }

//       return {
//         company: company,
//         website: article.link,
//         summary: article.description || "No description available",
//         image: article.photo_url || null,
//         source: article.source_id,
//         published: article.published_datetime_utc
//       };

//     });


//     res.json({
//       success: true,
//       idea: q,
//       competitors: competitors
//     });

//   } catch (error) {

//     console.error("❌ API Error:", error.message);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch competitors"
//     });

//   }

// });



// /* =================================================
//    🧠 AI PROBLEM DETECTOR
// ================================================= */

// app.post("/api/problem-detector", async (req, res) => {

//   try {

//     const { ideaName, problem, audience } = req.body;

//     if (!ideaName || !problem || !audience) {
//       return res.status(400).json({
//         success:false,
//         message:"ideaName, problem, audience required"
//       });
//     }

//     console.log("🧠 Running AI Problem Detector for:", ideaName);

//     const prompt = `
// You are a startup validation expert.

// Analyze the startup problem and determine if it is a REAL and STRONG problem.

// Return ONLY valid JSON.

// JSON format:

// {
//  "isRealProblem": true,
//  "affectedUsers": "who suffers from this problem",
//  "painLevel": "Low | Medium | High",
//  "frequency": "How often this problem occurs",
//  "urgency": "Low | Medium | High",
//  "validationScore": 0-100,
//  "analysis": "Detailed explanation of why this is or isn't a strong startup problem"
// }

// Startup Idea: ${ideaName}

// Problem:
// ${problem}

// Target Audience:
// ${audience}

// Respond ONLY with JSON.
// `;

//     const raw = await safeGenerate(prompt);

//     if (!raw) {
//       return res.status(500).json({
//         success:false,
//         message:"Groq AI failed"
//       });
//     }

//     /* ---------- Clean AI Response ---------- */

//     let cleaned = raw.trim();

//     if (cleaned.includes("```")) {
//       cleaned = cleaned.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();
//     }

//     const first = cleaned.indexOf("{");
//     const last = cleaned.lastIndexOf("}");

//     if (first === -1 || last === -1) {
//       return res.status(500).json({
//         success:false,
//         message:"Invalid AI response format"
//       });
//     }

//     const jsonString = cleaned.substring(first,last+1);

//     let parsed;

//     try {
//       parsed = JSON.parse(jsonString);
//     } catch(err) {
//       return res.status(500).json({
//         success:false,
//         message:"Failed to parse AI response"
//       });
//     }

//     console.log("✅ Problem Detector completed");

//     res.json({
//       success:true,
//       startup:ideaName,
//       result:parsed
//     });

//   } catch(err) {

//     console.error("❌ Problem Detector Error:",err.message);

//     res.status(500).json({
//       success:false,
//       message:"Problem detection failed"
//     });

//   }

// });


// /* =================================================
//    🔧 ERROR HANDLING
// ================================================= */

// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Endpoint not found",
//     path: req.path,
//     method: req.method
//   });
// });

// app.use((err, req, res, next) => {
//   console.error("❌ Unhandled Error:", err.message);
//   res.status(500).json({
//     success: false,
//     message: "Internal server error"
//   });
// });

// /* =================================================
//    🚀 START SERVER
// ================================================= */

// const PORT = process.env.PORT || 3000;

// const server = app.listen(PORT, () => {
//   console.log(`
// ╔═══════════════════════════════════════════════════╗
// ║                                                   ║
// ║     🚀 STARTUP SURVIVAL AI SERVER RUNNING        ║
// ║                                                   ║
// ║  Port: ${PORT}                                         ║
// ║  AI Model: Groq (Llama 3.3 70B Versatile)       ║
// ║  APIs: RapidAPI (News & Market Analysis)        ║
// ║                                                   ║
// ║  🔗 Server: http://localhost:${PORT}                   ║
// ║  📊 Health: http://localhost:${PORT}/health             ║
// ║  📚 API Info: http://localhost:${PORT}/                 ║
// ║                                                   ║
// ║  ✅ Ready to analyze startups!                   ║
// ║                                                   ║
// ╚═══════════════════════════════════════════════════╝
//   `);
// });

// /* Graceful shutdown */
// process.on("SIGTERM", () => {
//   console.log("📍 SIGTERM received, shutting down gracefully");
//   server.close(() => {
//     console.log("✅ Server closed");
//     process.exit(0);
//   });
// });

// process.on("SIGINT", () => {
//   console.log("📍 SIGINT received, shutting down gracefully");
//   server.close(() => {
//     console.log("✅ Server closed");
//     process.exit(0);
//   });
// });

// module.exports = app;














require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const axios = require("axios");
const https = require("https");
const googleTrends = require('google-trends-api');
const app = express();

/* =================================================
   🔐 SECURITY
================================================= */

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: { success: false, message: "Too many requests" }
  })
);

/* =================================================
   🔑 ENV CHECK
================================================= */

if (!process.env.GROQ_API_KEY) {
  console.error("❌ Missing GROQ_API_KEY");
  process.exit(1);
}

if (!process.env.RAPID_API_KEY) {
  console.error("❌ Missing RAPID_API_KEY");
  process.exit(1);
}

console.log("✅ All environment variables loaded");

/* =================================================
   💾 MEMORY STORE
================================================= */

let latestReport = null;
let latestPitch = null;

/* =================================================
   🤖 GROQ AI FUNCTION (Using Axios)
================================================= */

async function safeGenerate(prompt) {
  try {
    console.log("📨 Sending request to Groq API...");
    
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2048
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 60000
      }
    );

    console.log("✅ Groq response received");
    return response.data?.choices?.[0]?.message?.content || "";

  } catch (err) {
    console.error("❌ Groq Error:", err.response?.data?.error?.message || err.message);
    return null;
  }
}

/* =================================================
   📊 1️⃣ GENERATE FULL STARTUP REPORT
================================================= */

app.post("/analyze", async (req, res) => {
  try {
    const { ideaName, problem, audience, country, budget } = req.body;

    if (!ideaName || !problem || !audience || !country || !budget) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    console.log(`\n📊 Analyzing startup: ${ideaName}`);

    const prompt = `You are a professional startup analyst. Generate a detailed startup investment report in valid JSON format ONLY.

CRITICAL: Your response must be ONLY valid JSON, nothing else.

Return this exact JSON structure with detailed content (minimum 300 words per section):

{
  "Executive Summary": "Write a comprehensive executive summary here...",
  "Market Analysis": "Write detailed market analysis here...",
  "Revenue Model": "Write revenue model details here...",
  "Risk Assessment": "Write risk assessment here...",
  "Growth Strategy": "Write growth strategy here..."
}

STARTUP DETAILS:
- Name: ${ideaName}
- Problem: ${problem}
- Audience: ${audience}
- Country: ${country}
- Budget: $${budget}

Now generate the report as valid JSON only. Start with { and end with }. No markdown, no code blocks, no extra text.`;

    const raw = await safeGenerate(prompt);

    if (!raw) {
      return res.status(500).json({ 
        success: false,
        message: "Failed to generate report from Groq"
      });
    }

    /* ---------- Clean AI Response ---------- */

    let cleaned = raw.trim();

    // Remove markdown code blocks
    if (cleaned.includes("```")) {
      cleaned = cleaned.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    }

    // Find JSON object
    const first = cleaned.indexOf("{");
    const last = cleaned.lastIndexOf("}");

    console.log(`Raw response length: ${raw.length}, Cleaned length: ${cleaned.length}`);

    if (first === -1 || last === -1) {
      console.error("❌ No valid JSON brackets found in response");
      console.error("Raw response sample:", raw.substring(0, 200));
      return res.status(500).json({
        success: false,
        message: "Invalid response format from AI"
      });
    }

    const jsonString = cleaned.substring(first, last + 1);
    
    let parsed;

    try {
      parsed = JSON.parse(jsonString);
      
      // Validate all required keys exist
      const requiredKeys = ["Executive Summary", "Market Analysis", "Revenue Model", "Risk Assessment", "Growth Strategy"];
      const missingKeys = requiredKeys.filter(key => !parsed[key]);
      
      if (missingKeys.length > 0) {
        console.error("❌ Missing required sections:", missingKeys);
        return res.status(500).json({
          success: false,
          message: "Incomplete report sections",
          missing: missingKeys
        });
      }
      
    } catch (err) {
      console.error("❌ JSON parse error:", err.message);
      console.error("Attempted to parse:", jsonString.substring(0, 300));
      return res.status(500).json({
        success: false,
        message: "Failed to parse response"
      });
    }

    latestReport = parsed;

    console.log("✅ Report generated and stored successfully");

    res.json({
      success: true,
      message: "Analysis completed",
      sections: Object.keys(parsed),
      startupName: ideaName,
      generatedAt: new Date().toISOString()
    });

  } catch (err) {
    console.error("❌ Analyze Error:", err.message);
    res.status(500).json({ 
      success: false,
      message: "Failed to analyze startup"
    });
  }
});

/* =================================================
   🔍 2️⃣ GET SECTION (SMART MATCH)
================================================= */

app.get("/section/:name", (req, res) => {
  try {
    if (!latestReport) {
      return res.status(400).json({
        success: false,
        message: "Run /analyze first"
      });
    }

    const requestName = req.params.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "");

    const matchedKey = Object.keys(latestReport).find(key =>
      key.toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9]/g, "") === requestName
    );

    if (!matchedKey) {
      return res.status(404).json({
        success: false,
        message: `Section '${req.params.name}' not found`,
        availableSections: Object.keys(latestReport)
      });
    }

    const content = latestReport[matchedKey];

    console.log(`📖 Retrieved section: ${matchedKey}`);

    res.json({
      success: true,
      section: matchedKey,
      content,
      length: content.length,
      wordCount: content.split(/\s+/).length
    });

  } catch (err) {
    console.error("❌ Section Error:", err.message);
    res.status(500).json({ 
      success: false,
      message: "Failed to retrieve section"
    });
  }
});

/* =================================================
   🌍 3️⃣ MARKET ANALYSIS (RAPIDAPI)
================================================= */

app.get("/api/market-analysis", async (req, res) => {
  try {
    const { domain } = req.query;

    if (!domain) {
      return res.status(400).json({ 
        success: false,
        message: "Domain parameter required (e.g., ?domain=example.com)" 
      });
    }

    console.log(`📊 Fetching market analysis for: ${domain}`);

    const response = await axios.get(
      "https://similarweb-insights.p.rapidapi.com/traffic",
      {
        params: { domain },
        headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "similarweb-insights.p.rapidapi.com"
        },
        timeout: 10000
      }
    );

    const visits = response.data?.Visits || 0;

    const competitionScore =
      visits > 10000000 ? 90 :
        visits > 1000000 ? 75 :
          visits > 100000 ? 50 : 
            visits > 10000 ? 25 : 10;

    console.log(`✅ Market analysis retrieved: ${visits.toLocaleString()} visits`);

    res.json({
      success: true,
      domain,
      visits: visits.toLocaleString(),
      competitionScore,
      competitionLevel: competitionScore >= 80 ? "Very High" : competitionScore >= 60 ? "High" : "Medium"
    });

  } catch (err) {
    console.error("❌ Market API Error:", err.message);
    res.status(500).json({ 
      success: false,
      message: "Market API Error" 
    });
  }
});

/* =================================================
   📰 4️⃣ STARTUP NEWS
================================================= */

app.get("/api/startup-news", async (req, res) => {
  try {

    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Query parameter 'q' required (example: ?q=ai startups)"
      });
    }

    console.log(`📰 Searching news for: ${q}`);

    const response = await axios.get(
      "https://real-time-news-data.p.rapidapi.com/search",
      {
        params: {
          query: q,
          limit: 10
        },
        headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
        },
        timeout: 10000
      }
    );

    const articles = response.data?.data || [];

    console.log(`✅ Retrieved ${articles.length} news articles`);

    res.json({
      success: true,
      query: q,
      count: articles.length,

      results: articles.map(article => ({
        title: article.title,
        link: article.link,
        source: article.source_id,
        published_date: article.published_datetime_utc,
        summary: article.description || "No summary available",

        // ⭐ IMPORTANT FOR IMAGES
        image_url: article.photo_url || article.thumbnail_url || null
      }))

    });

  } catch (err) {

    console.error("❌ News API Error:", err.message);

    res.status(500).json({
      success: false,
      message: "News API Error"
    });

  }
});

/* =================================================
   🏆 5️⃣ STARTUP COMPETITORS
================================================= */

app.get("/api/startup-competitors", async (req, res) => {

  try {

    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Query required (example: ?q=ai startup)"
      });
    }

    console.log("🔎 Searching competitors for:", q);

    const response = await axios.get(
      "https://real-time-news-data.p.rapidapi.com/search",
      {
        params: {
          query: `${q} startup`,
          limit: 10
        },
        headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "real-time-news-data.p.rapidapi.com"
        }
      }
    );

    const articles = response.data?.data || [];

    const competitors = articles.map(article => {

      let company = "Startup";

      if (article.title) {

        const words = article.title.split(" ");

        company = words.slice(0,2).join(" ");

      }

      return {
        company: company,
        website: article.link,
        summary: article.description || "No description available",
        image: article.photo_url || null,
        source: article.source_id,
        published: article.published_datetime_utc
      };

    });


    res.json({
      success: true,
      idea: q,
      competitors: competitors
    });

  } catch (error) {

    console.error("❌ API Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch competitors"
    });

  }

});

/* =================================================
   🧠 6️⃣ AI PROBLEM DETECTOR
================================================= */

app.post("/api/problem-detector", async (req, res) => {

  try {

    const { ideaName, problem, audience } = req.body;

    if (!ideaName || !problem || !audience) {
      return res.status(400).json({
        success:false,
        message:"ideaName, problem, audience required"
      });
    }

    console.log("🧠 Running AI Problem Detector for:", ideaName);

    const prompt = `
You are a startup validation expert.

Analyze the startup problem and determine if it is a REAL and STRONG problem.

Return ONLY valid JSON.

JSON format:

{
 "isRealProblem": true,
 "affectedUsers": "who suffers from this problem",
 "painLevel": "Low | Medium | High",
 "frequency": "How often this problem occurs",
 "urgency": "Low | Medium | High",
 "validationScore": 0-100,
 "analysis": "Detailed explanation of why this is or isn't a strong startup problem"
}

Startup Idea: ${ideaName}

Problem:
${problem}

Target Audience:
${audience}

Respond ONLY with JSON.
`;

    const raw = await safeGenerate(prompt);

    if (!raw) {
      return res.status(500).json({
        success:false,
        message:"Groq AI failed"
      });
    }

    /* ---------- Clean AI Response ---------- */

    let cleaned = raw.trim();

    if (cleaned.includes("```")) {
      cleaned = cleaned.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();
    }

    const first = cleaned.indexOf("{");
    const last = cleaned.lastIndexOf("}");

    if (first === -1 || last === -1) {
      return res.status(500).json({
        success:false,
        message:"Invalid AI response format"
      });
    }

    const jsonString = cleaned.substring(first,last+1);

    let parsed;

    try {
      parsed = JSON.parse(jsonString);
    } catch(err) {
      return res.status(500).json({
        success:false,
        message:"Failed to parse AI response"
      });
    }

    console.log("✅ Problem Detector completed");

    res.json({
      success:true,
      startup:ideaName,
      result:parsed
    });

  } catch(err) {

    console.error("❌ Problem Detector Error:",err.message);

    res.status(500).json({
      success:false,
      message:"Problem detection failed"
    });

  }

});

/* =================================================
   🎤 7️⃣ AI PITCH GENERATOR
================================================= */

app.post("/api/pitch-generator", async (req, res) => {
  try {
    const { ideaName, problem, solution, audience, uniqueValue } = req.body;

    console.log("\n🎤 ====== PITCH GENERATOR REQUEST ======");
    console.log("📨 Received request:", {
      ideaName,
      problem: problem?.substring(0, 50) + "...",
      solution: solution?.substring(0, 50) + "...",
      audience,
      uniqueValue
    });

    if (!ideaName || !problem || !solution || !audience) {
      console.log("❌ Missing required fields");
      return res.status(400).json({
        success: false,
        message: "ideaName, problem, solution, and audience are required"
      });
    }

    console.log(`🎤 Generating pitch for: ${ideaName}`);

    const prompt = `You are an expert startup pitch coach and investor relations specialist.

Generate a comprehensive startup pitch package in valid JSON format ONLY.

CRITICAL: Your response must be ONLY valid JSON, nothing else.

Return this exact JSON structure:

{
  "elevatorPitch": "A compelling 30-second pitch (approximately 75-85 words) that grabs attention and clearly explains the startup",
  "problemStatement": "A clear, concise problem statement (50-75 words) that defines the pain point and affected users",
  "solutionStatement": "A compelling solution statement (75-100 words) that explains how the startup solves the problem uniquely",
  "valueProposition": "A powerful value proposition (50-75 words) that articulates the unique benefits and competitive advantage",
  "investorPitchOutline": {
    "hook": "An engaging opening hook or attention-grabber (one compelling sentence)",
    "problemSection": "Problem narrative (100-150 words) with statistics and context",
    "solutionSection": "Solution narrative (100-150 words) explaining the approach and how it works",
    "marketOpportunity": "Market size and opportunity (75-100 words) with TAM/SAM breakdown",
    "competitiveAdvantage": "Why this startup wins against competitors (75-100 words)",
    "businessModel": "Revenue model and monetization strategy (75-100 words)",
    "teamRequirement": "What team/expertise is needed to execute (50-75 words)",
    "financialProjections": "Key metrics and growth targets (50-75 words)",
    "callToAction": "A compelling call-to-action for investors (one powerful sentence)"
  },
  "keyMessages": [
    "Key message 1",
    "Key message 2",
    "Key message 3",
    "Key message 4",
    "Key message 5"
  ],
  "pitchTips": [
    "Delivery tip 1 for presenting this pitch",
    "Delivery tip 2 for presenting this pitch",
    "Delivery tip 3 for presenting this pitch"
  ]
}

STARTUP DETAILS:
- Name: ${ideaName}
- Problem: ${problem}
- Solution: ${solution}
- Target Audience: ${audience}
- Unique Value: ${uniqueValue || "Not specified"}

Now generate the pitch package as valid JSON only. Start with { and end with }. No markdown, no code blocks, no extra text.`;

    console.log("📨 Sending to Groq AI...");
    const raw = await safeGenerate(prompt);

    if (!raw) {
      console.log("❌ Groq returned null");
      return res.status(500).json({
        success: false,
        message: "Failed to generate pitch from Groq"
      });
    }

    console.log("✅ Groq response received");
    console.log(`📊 Response length: ${raw.length} characters`);

    /* ---------- Clean AI Response ---------- */

    let cleaned = raw.trim();

    // Remove markdown code blocks
    if (cleaned.includes("```")) {
      cleaned = cleaned.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    }

    // Find JSON object
    const first = cleaned.indexOf("{");
    const last = cleaned.lastIndexOf("}");

    console.log(`📄 JSON brackets found at: ${first} - ${last}`);

    if (first === -1 || last === -1) {
      console.error("❌ No valid JSON brackets found in pitch response");
      console.error("Raw response sample:", raw.substring(0, 200));
      return res.status(500).json({
        success: false,
        message: "Invalid pitch response format from AI"
      });
    }

    const jsonString = cleaned.substring(first, last + 1);

    let parsed;

    try {
      console.log("🔍 Parsing JSON...");
      parsed = JSON.parse(jsonString);
      console.log("✅ JSON parsed successfully");

      // Validate required sections
      const requiredKeys = ["elevatorPitch", "problemStatement", "solutionStatement", "valueProposition", "investorPitchOutline", "keyMessages", "pitchTips"];
      const missingKeys = requiredKeys.filter(key => !parsed[key]);

      if (missingKeys.length > 0) {
        console.error("❌ Missing required pitch sections:", missingKeys);
        return res.status(500).json({
          success: false,
          message: "Incomplete pitch sections",
          missing: missingKeys
        });
      }

      console.log("✅ All required sections present");

    } catch (err) {
      console.error("❌ JSON parse error:", err.message);
      console.error("Attempted to parse:", jsonString.substring(0, 300));
      return res.status(500).json({
        success: false,
        message: "Failed to parse pitch response"
      });
    }

    latestPitch = parsed;

    console.log("✅ Pitch generated and stored successfully");
    console.log("🎤 ====== PITCH GENERATION COMPLETE ======\n");

    res.json({
      success: true,
      message: "Pitch generation completed",
      startupName: ideaName,
      sections: Object.keys(parsed),
      generatedAt: new Date().toISOString(),
      pitchData: parsed
    });

  } catch (err) {
    console.error("❌ Pitch Generator Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to generate pitch"
    });
  }
});

/* =================================================
   🎤 PITCH RETRIEVAL
================================================= */

app.get("/api/pitch-generator", (req, res) => {
  try {
    if (!latestPitch) {
      return res.status(400).json({
        success: false,
        message: "No pitch generated yet. Use POST /api/pitch-generator first"
      });
    }

    const { format } = req.query;

    if (format === "elevator") {
      return res.json({
        success: true,
        type: "Elevator Pitch",
        content: latestPitch.elevatorPitch
      });
    }

    if (format === "problem") {
      return res.json({
        success: true,
        type: "Problem Statement",
        content: latestPitch.problemStatement
      });
    }

    if (format === "solution") {
      return res.json({
        success: true,
        type: "Solution Statement",
        content: latestPitch.solutionStatement
      });
    }

    if (format === "investor") {
      return res.json({
        success: true,
        type: "Investor Pitch Outline",
        content: latestPitch.investorPitchOutline
      });
    }

    if (format === "keyMessages") {
      return res.json({
        success: true,
        type: "Key Messages",
        content: latestPitch.keyMessages
      });
    }

    if (format === "tips") {
      return res.json({
        success: true,
        type: "Pitch Tips",
        content: latestPitch.pitchTips
      });
    }

    // Return full pitch if no specific format requested
    res.json({
      success: true,
      message: "Full pitch data",
      pitchData: latestPitch
    });

  } catch (err) {
    console.error("❌ Pitch Retrieval Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve pitch"
    });
  }
});

/* =================================================
   🔧 ERROR HANDLING
================================================= */

app.use((req, res) => {
  console.log(`⚠️  Endpoint not found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    path: req.path,
    method: req.method,
    availableEndpoints: [
      "POST /analyze",
      "GET /section/:name",
      "GET /api/market-analysis?domain=...",
      "GET /api/startup-news?q=...",
      "GET /api/startup-competitors?q=...",
      "POST /api/problem-detector",
      "POST /api/pitch-generator",
      "GET /api/pitch-generator"
    ]
  });
});

app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err.message);
  console.error("Stack:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message
  });
});

/* =================================================
   🚀 START SERVER
================================================= */

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║     🚀 STARTUP SURVIVAL AI SERVER RUNNING        ║
║                                                   ║
║  Port: ${PORT}                                         ║
║  Host: 0.0.0.0 (All interfaces)                  ║
║  AI Model: Groq (Llama 3.3 70B Versatile)       ║
║  APIs: RapidAPI (News & Market Analysis)        ║
║                                                   ║
║  🔗 Local:   http://localhost:${PORT}                   ║
║  🔗 Network: http://0.0.0.0:${PORT}                     ║
║                                                   ║
║  ✅ Ready to analyze startups!                   ║
║  🎤 Ready to generate pitches!                   ║
║                                                   ║
║  Available endpoints:                             ║
║  - POST /analyze                                 ║
║  - GET /section/:name                            ║
║  - GET /api/market-analysis                      ║
║  - GET /api/startup-news                         ║
║  - GET /api/startup-competitors                  ║
║  - POST /api/problem-detector                    ║
║  - POST /api/pitch-generator                     ║
║  - GET /api/pitch-generator                      ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
  `);
});

/* Graceful shutdown */
process.on("SIGTERM", () => {
  console.log("📍 SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("📍 SIGINT received, shutting down gracefully");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

module.exports = app;
































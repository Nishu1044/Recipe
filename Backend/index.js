require("dotenv").config();
const express=require("express")
const connection = require("./config/db")
const user=require("./routes/UserRoute")
const recipeRoutes = require("./routes/recipes");
const userRecipeRoutes = require("./routes/userRecipes");
const savedRecipe=require("./routes/saved")
const app=express()
const cors = require("cors");



app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from Origin: ${req.headers.origin}`);
  next();
});
// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    console.log('Request from origin:', origin); // Log incoming origin
    const allowedOrigins = [
      "http://localhost:5173", // Local development
      "https://recipe-application-delta.vercel.app", // Production frontend
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Origin ${origin} not allowed by CORS`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Enable if you use cookies or auth tokens
}));
// Handle preflight OPTIONS requests
app.options('*', cors());
// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
 //to pass the form data from the frontend to the backend server

app.use(express.urlencoded({ extended: false }));

app.use("/user",user)
app.use("/recipes", recipeRoutes);
app.use("/userRecipe", userRecipeRoutes);
app.use("/saved",savedRecipe)

  app.get("/", (req, res) => {
    res.send("Recipe API is running...");
  });

const PORT=8181
app.listen(PORT,async()=>{
    try {
        
        console.log("Server running successfully on port", PORT)
        await connection()
    } catch (error) {
        console.log({error:error.message})
    }
})
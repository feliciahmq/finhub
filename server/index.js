import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";

// Config
dotenv.config()
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(
  {
    origin: ["https://finhub-peach.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
));

// Routes
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

// Mongoose
const PORT = process.env.PORT || 9000;
mongoose 
  .connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    const kpiCount = await KPI.countDocuments();
    if (kpiCount === 0) {
      await KPI.insertMany(kpis);
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(products);
    }

    const transactionCount = await Transaction.countDocuments();
    if (transactionCount === 0) {
      await Transaction.insertMany(transactions);
    }
  })
  .catch((error) => console.log(`${error} did not connect`));

export default app;
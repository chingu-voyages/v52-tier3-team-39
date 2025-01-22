import dotenv from "dotenv";
dotenv.config(); // load env vars from .env

// Env variables
export const port = process.env.PORT;
export const dbConnectStr = process.env.DATABASE_CONNECTION_STRING;
export const myTestDb = process.env.MY_TEST_DB;
export const mockEmailUser = process.env.MOCK_EMAIL_USER;
export const mockEmailPass = process.env.MOCK_EMAIL_PASS;
export const jwtKey = process.env.JWT_KEY;
export const graphHopperApiKey = process.env.GRAPH_HOPPER_API_KEY;

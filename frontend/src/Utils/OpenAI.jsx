import OpenAI from 'openai';
import {OPENAI_API_KEY} from "./firebase.jsx";

const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Directly use the key
});

export default client;
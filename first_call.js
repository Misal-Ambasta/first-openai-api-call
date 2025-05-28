require('dotenv').config();
const OpenAI = require('openai');
const prompt = require('prompt-sync')();

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Fixed system prompt
const systemPrompt = {
  role: 'system',
  content: 'You are a helpful assistant that answers clearly and concisely.',
};

// Get user input
const userInput = prompt('Enter your question: ');

async function callOpenAI() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        systemPrompt,
        { role: 'user', content: userInput },
      ],
    });

    const reply = response.choices[0].message.content;
    const usage = response.usage;

    console.log('\n🤖 Assistant Response:\n', reply);
    console.log('\n📊 Token Usage:');
    console.log('Prompt tokens:', usage.prompt_tokens);
    console.log('Completion tokens:', usage.completion_tokens);
    console.log('Total tokens:', usage.total_tokens);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

callOpenAI();

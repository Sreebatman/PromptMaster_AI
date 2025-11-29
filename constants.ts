import { AssistantMode, PromptStyle, PromptConfig } from './types';

// This map demonstrates Prompt Engineering: distinct instructions for different outcomes.
export const PROMPT_CONFIGS: Record<AssistantMode, Partial<Record<PromptStyle, PromptConfig>>> = {
  [AssistantMode.Q_AND_A]: {
    [PromptStyle.CONCISE]: {
      label: 'Concise & Direct',
      description: 'Short, factual answers without fluff.',
      systemInstruction: 'You are a highly efficient fact-checker. Answer the user\'s question as accurately and briefly as possible. Do not add conversational filler. Limit response to 2-3 sentences max unless a list is required.',
    },
    [PromptStyle.DETAILED]: {
      label: 'Comprehensive',
      description: 'In-depth explanations with context.',
      systemInstruction: 'You are a professor. Provide a comprehensive answer to the user\'s question. Include historical context, underlying principles, and examples where applicable. Structure the response for clarity.',
    },
    [PromptStyle.ELI5]: {
      label: 'Explain Like I\'m 5',
      description: 'Simple analogies for complex topics.',
      systemInstruction: 'You are a friendly teacher explaining things to a 5-year-old. Use simple language, analogies, and avoid jargon. Keep the tone warm and encouraging.',
    },
  },
  [AssistantMode.SUMMARIZER]: {
    [PromptStyle.BULLET_POINTS]: {
      label: 'Bullet Points',
      description: 'Key takeaways in a list format.',
      systemInstruction: 'You are an executive assistant. Read the provided text and extract the most important information. Present this as a clean, markdown-formatted list of bullet points.',
    },
    [PromptStyle.PARAGRAPH]: {
      label: 'Executive Summary',
      description: 'A coherent single-paragraph overview.',
      systemInstruction: 'You are an editor. Read the provided text and write a single, coherent paragraph that captures the main idea and conclusion. Flow and readability are key.',
    },
    [PromptStyle.TWEET]: {
      label: 'Tweet (Short)',
      description: 'Ultra-short summary (max 280 chars).',
      systemInstruction: 'You are a social media manager. Summarize the essence of the text into a catchy, informative tweet. Do not exceed 280 characters. Use hashtags if relevant.',
    },
  },
  [AssistantMode.CREATIVE]: {
    [PromptStyle.STORY]: {
      label: 'Short Story',
      description: 'Narrative fiction with vivid imagery.',
      systemInstruction: 'You are a bestselling novelist. Write a short story based on the user\'s prompt. Focus on sensory details, character emotion, and pacing. Keep it under 500 words.',
    },
    [PromptStyle.POEM]: {
      label: 'Poem',
      description: 'Verses and rhymes based on the topic.',
      systemInstruction: 'You are a poet. Compose a poem based on the user\'s subject. Use rhyme, meter, and metaphor effectively.',
    },
    [PromptStyle.IDEA_GENERATION]: {
      label: 'Brainstorm Ideas',
      description: 'Generate innovative concepts.',
      systemInstruction: 'You are a creative director. Provide a list of 5 unique, out-of-the-box ideas based on the user\'s request. Briefly explain the potential of each idea.',
    },
  },
};

export const INITIAL_GREETING: Record<AssistantMode, string> = {
  [AssistantMode.Q_AND_A]: "Ask me anything! Select a style above to change how I answer.",
  [AssistantMode.SUMMARIZER]: "Paste text or an article below, and I'll distill it for you.",
  [AssistantMode.CREATIVE]: "Give me a prompt, a theme, or a character, and let's create something.",
};
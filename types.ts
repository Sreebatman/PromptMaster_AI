export enum AssistantMode {
  Q_AND_A = 'Q_AND_A',
  SUMMARIZER = 'SUMMARIZER',
  CREATIVE = 'CREATIVE',
}

export enum PromptStyle {
  // Q&A Styles
  CONCISE = 'CONCISE',
  DETAILED = 'DETAILED',
  ELI5 = 'ELI5',
  
  // Summary Styles
  BULLET_POINTS = 'BULLET_POINTS',
  PARAGRAPH = 'PARAGRAPH',
  TWEET = 'TWEET',

  // Creative Styles
  STORY = 'STORY',
  POEM = 'POEM',
  IDEA_GENERATION = 'IDEA_GENERATION'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  feedback?: 'helpful' | 'unhelpful';
  mode?: AssistantMode;
  style?: PromptStyle;
}

export interface PromptConfig {
  systemInstruction: string;
  label: string;
  description: string;
}
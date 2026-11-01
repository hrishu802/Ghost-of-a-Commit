import type { VercelRequest, VercelResponse } from '@vercel/node';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL_NAME = 'nvidia/nemotron-3.5-lightning:free';

export interface GhostResponseData {
  spookyMessage: string;
  originalMessage: string;
  model: string;
}

export interface GhostErrorData {
  error: string;
  code?: string;
}

export async function generateSpookyCommit(
  commitMessage: string,
  apiKey?: string
): Promise<GhostResponseData> {
  const openrouterKey = apiKey || process.env.OPENROUTER_API_KEY;

  if (!openrouterKey || openrouterKey.trim() === '') {
    throw new Error(
      'OpenRouter API key (OPENROUTER_API_KEY) is not configured. Please add OPENROUTER_API_KEY to your environment variables (.env).'
    );
  }

  const trimmed = commitMessage?.trim();
  if (!trimmed) {
    throw new Error('Please provide a commit message to summon the ghost.');
  }

  if (trimmed.length > 500) {
    throw new Error('Commit message must not exceed 500 characters.');
  }

  let response: Response;
  try {
    response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openrouterKey.trim()}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ghost-of-a-commit.vercel.app',
        'X-Title': 'Ghost of a Commit',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: 'system',
            content:
              'You are a spectral, centuries-old ghost haunting a digital codebase. Your task is to transform ordinary Git commit messages into humorous, mysterious, Halloween-themed messages from an ancient spirit.\n\n' +
              'Rules:\n' +
              '1. Preserve the underlying technical intent and core action of the original commit (e.g., fixing a bug, updating docs, refactoring database queries, tweaking styles, adding tests, deleting dead code, initial commit).\n' +
              '2. Speak in the eerie, theatrical, cryptic, or mischievous voice of a ghost or poltergeist.\n' +
              '3. Keep the output punchy, creative, and concise (1 to 3 sentences maximum), suitable to be used as an actual git commit message.\n' +
              '4. Output ONLY the spooky commit message itself. Do NOT enclose in quotes. Do NOT add conversational preambles, titles, or explanations.',
          },
          {
            role: 'user',
            content: `Original commit message: "${trimmed}"`,
          },
        ],
        reasoning: {
          effort: 'none',
        },
        temperature: 0.85,
        max_tokens: 500,
      }),
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[Ghost API] Network connection to OpenRouter router failed:', errorMsg);
    throw new Error(
      `Failed to connect to OpenRouter API (${errorMsg}). Please verify network connectivity and ensure the server has internet access.`
    );
  }

  if (!response.ok) {
    let errorMessage = `OpenRouter API returned HTTP ${response.status}`;
    try {
      const errorJson = await response.json();
      if (errorJson?.error) {
        if (typeof errorJson.error === 'string') {
          errorMessage = errorJson.error;
        } else if (errorJson.error.message) {
          errorMessage = errorJson.error.message;
        }
      }
    } catch {
      const text = await response.text();
      if (text) errorMessage = text.slice(0, 300);
    }

    if (response.status === 401 || response.status === 403) {
      throw new Error(
        'Authentication failed: Invalid or missing OpenRouter API key. Please check your OPENROUTER_API_KEY in .env.'
      );
    }
    if (response.status === 429) {
      throw new Error(
        'The spirit realm is overwhelmed with requests (OpenRouter free tier rate limit reached). Please wait a moment and try again.'
      );
    }
    if (response.status === 404 || response.status === 503) {
      throw new Error(
        'The free NVIDIA Nemotron model is currently unavailable or asleep on OpenRouter. Please retry in a few moments.'
      );
    }

    throw new Error(`AI Summoning failed: ${errorMessage}`);
  }

  const data = await response.json();
  const choice = data?.choices?.[0];
  let rawContent = choice?.message?.content;

  if ((!rawContent || typeof rawContent !== 'string') && choice?.message?.reasoning) {
    const lines = choice.message.reasoning.trim().split('\n');
    rawContent = lines[lines.length - 1];
  }

  if (!rawContent || typeof rawContent !== 'string') {
    throw new Error('The ghost answered in an indecipherable whisper (empty or invalid response from model).');
  }

  // Clean quotes if model wrapped its output in quotation marks
  let spookyMessage = rawContent.trim();
  if (
    (spookyMessage.startsWith('"') && spookyMessage.endsWith('"')) ||
    (spookyMessage.startsWith("'") && spookyMessage.endsWith("'"))
  ) {
    spookyMessage = spookyMessage.slice(1, -1).trim();
  }

  const returnedModel = data?.model || MODEL_NAME;

  return {
    spookyMessage,
    originalMessage: trimmed,
    model: returnedModel,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS and headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed. Only POST requests are permitted.' });
    return;
  }

  try {
    const { commitMessage } = req.body || {};

    if (!commitMessage || typeof commitMessage !== 'string' || commitMessage.trim() === '') {
      res.status(400).json({ error: 'Missing or empty "commitMessage" in request body.' });
      return;
    }

    const result = await generateSpookyCommit(commitMessage);
    res.status(200).json(result);
  } catch (err: unknown) {
    console.error('[/api/ghost handler error]:', err);
    const message = err instanceof Error ? err.message : 'An unknown spectral anomaly occurred.';
    const status = message.includes('Missing or empty') ? 400 : 500;
    res.status(status).json({ error: message });
  }
}

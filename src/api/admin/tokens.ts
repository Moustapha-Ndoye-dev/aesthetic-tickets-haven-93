// Cette API serait implémentée côté serveur
// Exemple de structure des données pour les tokens
interface Token {
  token: string;
  eventId: string;
  isValid: boolean;
  createdAt: Date;
}

let tokens: Token[] = [];

// Route GET /api/admin/tokens
export const getTokens = async () => {
  return new Promise((resolve) => {
    resolve(tokens);
  });
};

// Route POST /api/admin/tokens/generate
export const generateToken = async (eventId: string) => {
  const token = `${eventId}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  const newToken: Token = {
    token,
    eventId,
    isValid: true,
    createdAt: new Date(),
  };
  tokens.push(newToken);
  return token;
};

// Route POST /api/admin/tokens/invalidate
export const invalidateToken = async (token: string) => {
  return new Promise((resolve) => {
    const tokenIndex = tokens.findIndex(t => t.token === token);
    if (tokenIndex !== -1) {
      tokens[tokenIndex].isValid = false;
      resolve(true);
    }
    resolve(false);
  });
};

// Route pour simuler une API REST
export const api = {
  get: async (url: string) => {
    if (url === '/api/admin/tokens') {
      return { json: async () => await getTokens() };
    }
    throw new Error('Route not found');
  },
  post: async (url: string, { body }: { body: string }) => {
    const data = JSON.parse(body);
    
    if (url === '/api/admin/tokens/generate') {
      const token = await generateToken(data.eventId);
      return { json: async () => ({ token }) };
    }
    
    if (url === '/api/admin/tokens/invalidate') {
      const result = await invalidateToken(data.token);
      return { json: async () => ({ success: result }) };
    }
    
    throw new Error('Route not found');
  }
};
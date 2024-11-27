// Cette API serait implémentée côté serveur
// Exemple de structure des données pour les tokens
interface Token {
  token: string;
  eventId: string;
  isValid: boolean;
  createdAt: Date;
}

let tokens: Token[] = [];

export const getTokens = () => {
  return tokens;
};

export const generateToken = (eventId: string) => {
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

export const invalidateToken = (token: string) => {
  const tokenIndex = tokens.findIndex(t => t.token === token);
  if (tokenIndex !== -1) {
    tokens[tokenIndex].isValid = false;
    return true;
  }
  return false;
};
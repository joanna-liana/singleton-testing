export type TokenValidator = (token: string) => Promise<boolean>;

export const validateToken: TokenValidator = async (token: string) => {
  return token === 'valid-token';
};

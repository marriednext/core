export const defaultCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: true,
  path: "/",
};

export const monthLongCookieOptions = {
  ...defaultCookieOptions,
  maxAge: 60 * 60 * 24 * 30,
};

export const deleteCookieOptions = {
  ...defaultCookieOptions,
  maxAge: 0,
};

export const authProviders = {
  password: "Email and Password",
  "google.com": "Google",
  "github.com": "GitHub",
};

export type AuthProviderType = keyof typeof authProviders;

import NextAuth, { Profile } from "next-auth";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";
import { OIDCConfig } from "next-auth/providers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    DuendeIDS6Provider({
      id: "id-server",
      clientId: "nextApp",
      clientSecret: "secret",
      issuer: "http://localhost:5001",
      authorization: { params: { scope: "openid profile productApp" } },
      idToken: true,
    } as OIDCConfig<Omit<Profile, "username">>),
  ],
  callbacks: {
    async jwt({ token, user, profile, account }) {
      if(account && account.access_token){
        token.accessToken = account.access_token;
        console.log('account', account);
      }
      if (profile) {
        token.username = profile.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async authorized({ auth }) {
     return !!auth;
    },
  },
});

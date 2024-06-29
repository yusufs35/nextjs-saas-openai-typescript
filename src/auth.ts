import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";

export const authOptions = {
	providers: [Auth0],
	callbacks: {
		session: async ({ session, token }) => {
			if (session?.user) {
				session.user.id = token.sub;
			}
			return session;
		},
		jwt: async ({ user, token }) => {
			if (user) {
				token.sub = user.id;
			}
			return token;
		},
	},
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

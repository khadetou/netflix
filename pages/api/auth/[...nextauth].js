import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "@/models/User";
import connectDB from "config/dbConnect";
import bcryptjs from "bcryptjs";

export default NextAuth({
  session: {
    jwt: {
      signingKey: process.env.JWT,
    },
  },

  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        connectDB();
        const { email, password } = credentials;

        //Check if email and password entered
        if (!email || !password) {
          throw new Error("Enter your credentials");
        }

        //Find use in database
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        //Check if password is correct or not
        const passwordMatch = await bcryptjs.compare(password, user.password);
        if (!passwordMatch) {
          throw new Error("Invalid Email or Password");
        }

        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      session.user = user.user;
      return Promise.resolve(session);
    },
  },
});

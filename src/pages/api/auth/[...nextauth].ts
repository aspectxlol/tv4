import NextAuth from "next-auth";

import { authOptions } from "@tv4/server/auth";

export default NextAuth(authOptions);

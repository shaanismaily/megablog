import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      if (!userAccount) return null;

      await this.login({ email, password }).catch(() => {
        console.warn("Account created, but login failed.");
      });
      return userAccount;

    } catch (error) {
      console.log("Signup failed ", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error in login: ", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (error) {
        console.log("User is not authenticated", error)
    }
    return null;
  }

  async logout() {
    try {
        return await this.account.deleteSessions();
    } catch (error) {
        console.log("appwrite service :: logout :: error", error);
    }
  }
}

const authService = new AuthService()

export default authService;
import conf from "../conf/conf";
import { Client, Account, ID ,Avatars,Databases} from "appwrite";



export class AuthService {
    client = new Client();
    account;
    avatars;
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.avatars = new Avatars(this.client);
        this.databases = new Databases(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                const avatarUrl = this.avatars.getInitials(name)
                // return (this.login({email, password}),avatarUrl);
                const newUser = await saveUserToDB({
                    accountId: userAccount.$id,
                    name: userAccount.name,
                    email: userAccount.email,
                    username: user.username,
                    imageUrl: avatarUrl,
                  });

                  return newUser;
            } else {
               return  userAccount;
            }
        } catch (error) {
             console.log("create Account Error : ",error);
            throw error;
           
        }
        

    }

    async saveUserToDB( {accountId,name,email,imageUrl,username}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                ID.unique(),
                accountId,
                name,
                email,
                imageUrl,
                username,
            )
            
        } catch (error) {
            console.log("SaveUserToDb error :: ",error)
            throw error
        }

    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
           
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
            
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
            
        }
    }
}

const authService = new AuthService();

export default authService


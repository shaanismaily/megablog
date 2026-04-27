import { Client, ID, Query, TablesDB } from "appwrite";
import conf from "../conf/conf";

export class AppwriteService {
    client = new Client();
    tablesDB
    
    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

    this.tablesDB = new TablesDB(this.client)
    }


    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.TablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug || ID.unique(),
                data: {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            })
        } catch (error) {
            console.log("Post not created", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            })
        } catch (error) {
            console.log("Error in appwrite UpdatePost", error);
        }
    }

    async deletePost({slug}) {
        try {
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            })
            return true;
        } catch (error) {
            console.log("appwrite Service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            })
        } catch (error) {
            console.log("getPost error:", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries
            })
        } catch (error) {
            console.log("getPosts error:", error);
            return false;
        }
    }
}
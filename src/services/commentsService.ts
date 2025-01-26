// import supabase from "@/database/supabase";

// class CommentsService {
// 	static async fetchComments(userUID: string, authorName: string;): Promise<Comment[]> {
// 		try {
// 			const {data, error} = await supabase.from("comments").select("*").eq("authorName", authorName).order("created_at", {ascending: false});

// 			if (error) throw error;
// 			return data;
// 		} catch (error) {
// 			this.handleError(error);
// 			return [];
// 		}
// 	}

	

// 	static async createComment(commentData: {userUID: string; authorName: string; rating: number; comment: string}): Promise<Comment | null> {
// 		try {
// 			const {data, error} = await supabase.from("comments").insert([commentData]);

// 			if (error) throw error;
// 			return data?.[0] || null;
// 		} catch (error) {
// 			this.handleError(error);
// 			return null;
// 		}
// 	}

// 	private static handleError(error: unknown): void {
// 		if (error instanceof Error) {
// 			console.error("API Error:", error.message);
// 		} else {
// 			console.error("Unknown API Error:", error);
// 		}
// 		throw error;
// 	}
// }

// export const commentsService = new CommentsService();

































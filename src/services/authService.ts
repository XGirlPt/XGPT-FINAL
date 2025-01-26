// services/auth.service.ts
import supabase from "@/database/supabase";

export interface AuthResponse {
	success: boolean;
	error?: string;
}

export interface PasswordChangeResponse extends AuthResponse {
	message?: string;
}

export class AuthService {
	static async getCurrentUser() {
		const {
			data: {user},
			error,
		} = await supabase.auth.getUser();
		if (error) {
			throw new Error("Error fetching user");
		}
		return user;
	}

	static async verifyCurrentPassword(email: string, password: string): Promise<AuthResponse> {
		const {error} = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		return {
			success: !error,
			error: error?.message,
		};
	}

	static async updatePassword(newPassword: string): Promise<AuthResponse> {
		const {error} = await supabase.auth.updateUser({
			password: newPassword,
		});

		return {
			success: !error,
			error: error?.message,
		};
	}

	static async changePassword(currentPassword: string, newPassword: string): Promise<PasswordChangeResponse> {
		try {
			// Get current user
			const user = await this.getCurrentUser();
			if (!user?.email) {
				return {
					success: false,
					error: "Usuário não encontrado",
				};
			}

			// Verify current password
			const verifyResponse = await this.verifyCurrentPassword(user.email, currentPassword);
			if (!verifyResponse.success) {
				return {
					success: false,
					error: "A palavra-passe atual está incorreta",
				};
			}

			// Update password
			const updateResponse = await this.updatePassword(newPassword);
			if (!updateResponse.success) {
				return {
					success: false,
					error: updateResponse.error,
				};
			}

			return {
				success: true,
				message: "Senha alterada com sucesso!",
			};
		} catch (error) {
			return {
				success: false,
				error: "Erro ao alterar a senha",
			};
		}
	}
}

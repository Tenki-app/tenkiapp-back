export interface IUserCreate {
	id: string;
	name: string;
	user_name: string;
	password?: string;
	email: string;
	accessToken: string;
	refreshToken?: string;
}

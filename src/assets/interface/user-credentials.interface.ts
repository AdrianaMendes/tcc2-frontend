import { EUserRole } from '../enum/user-role.enum';

export interface IUserCredentials {
	readonly fullName: string;
	readonly email: string;
	readonly role: EUserRole;
	readonly accessToken: string;
}

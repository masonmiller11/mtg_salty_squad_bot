import { client } from '../../index';
import { User } from "discord.js";

type getUser = (id: string) => Promise<User>;

/**
 * 
 * @param id 
 * @returns User
 */
export const getUser: getUser = async (id) => {
	return await client.users.fetch(id)
}
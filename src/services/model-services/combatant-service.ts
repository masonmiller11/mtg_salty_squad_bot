import { PlayerCommanderCombatant } from '../../models/PlayerCommanderCombatant';
import * as UserService from '../user-service';

type getPlayerNames = (playerCommanderCombatants: PlayerCommanderCombatant[]) => Promise<string[]>;

type getPlayerName = (playerCommanderCombatant: PlayerCommanderCombatant) => Promise<string>;

/**
 * Consumes an array of PlayerCommanderCombatants and returns an array of player names wrapped in a promise.
 * @param playerCommanderCombatants 
 * @returns 
 */
export const getPlayerNames: getPlayerNames = async (playerCommanderCombatants) => {

	const playerNames = playerCommanderCombatants.map(async (combatant) => {
		return getPlayerName(combatant);
	});

	return await Promise.all(playerNames);

}

export const getPlayerName: getPlayerName = async (playerCommanderCombatant) => {
	return (await UserService.getUser(playerCommanderCombatant.playerId)).username;
}
import {Commander} from './Commander';

export interface PlayerCommanderCombatant {
	playerId: string,
	commander: Commander|null
}
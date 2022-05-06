type getPercentage = (number: number, outOf: number) => string;


export const getPercentage: getPercentage = (number, outOf) =>
	(Math.round(100 * number) / outOf).toFixed(2);
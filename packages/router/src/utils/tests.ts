import { faker } from "@faker-js/faker";

export const getRandomEmails = () =>
	[...new Array(10)].map(() => faker.internet.email());

export const getRandomNames = () =>
	[...new Array(10)].map(() => faker.name.firstName());

export const getRandomEmailTuples = () =>
	[...new Array(10)].map(() => [
		faker.internet.email(),
		faker.internet.email(),
	]);

import { type, string, TypeOf } from "io-ts";
import { handler } from "serfun";
import { Nick, Email, Emoji, Password, Name } from "../brands";
import { checkIfPersonExists, createPerson } from "../queries";
import { create } from "njwt";
import { hash } from "argon2";

export const registerInput = type({
    nick: Nick,
    email: Email,
    emoji: Emoji,
    name: Name,
    password: Password,
});

export type RegisterInput = TypeOf<typeof registerInput>;

export const registerOutput = type({
    token: string
});

export type RegisterOutput = TypeOf<typeof registerOutput>;

export const register = handler(
    [registerInput, registerOutput],
    async (data) => {
        const { nick, password: plainPassword } = data;
        const exists = checkIfPersonExists({ nick });

        if(exists) throw new Error(`User "${nick}" already exists`);

        const token = create({ nick }, process.env.SECRET).compact();
        const password = await hash(plainPassword);

        createPerson({ ...data, password, token });

        return { token };
    });

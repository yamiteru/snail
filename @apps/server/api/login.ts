import { string, type, TypeOf } from "io-ts";
import { handler } from "serfun";
import { Nick, Password } from "../brands";
import { verify } from "argon2";
import { getPerson, updateToken } from "../queries";
import { create } from "njwt";

export const loginInput = type({
    nick: Nick,
    password: Password,
});

export type LoginInput = TypeOf<typeof loginInput>;

export const loginOutput = type({
    token: string
});

export type LoginOutput = TypeOf<typeof loginOutput>;

export const login = handler(
    [loginInput, loginOutput],
    async ({ nick, password }) => {
        const { password: hash } = getPerson({ nick });

        if(!(await verify(hash, password))) throw new Error("Password is wrong");

        const token = create({ nick }, process.env.SECRET).compact();

        updateToken({ nick, token });

        return { token };
    });

import { caller } from "@/router";
import { setEnv } from "@/utils";
import { mockLoginEmail } from "@/utils/mockFetch";
import { deleteUserByEmail } from "@/utils/seeds";
import { faker } from "@faker-js/faker";

setEnv();

let loginCode: string | null = null;

mockLoginEmail((v) => (loginCode = v));

describe.each<string>([...new Array(10)].map(() => faker.internet.email()))(
  "auth/login %s",
  (email) => {
    it("should login as an existing user", async () => {
      await deleteUserByEmail(email);
      await caller.register({ email });
      const loginResponse = await caller.login({
        email,
        loginCode: loginCode as string,
      });

      loginCode = null;

      expect(loginResponse.token).toBeDefined();
      expect(typeof loginResponse.token).toBe("string");
    });

    it("should reject on invalid email", async () => {
      await deleteUserByEmail(email);
      await caller.register({ email });
      const loginResponse = await caller.login({
        email,
        loginCode: loginCode as string,
      });

      loginCode = null;

      expect(loginResponse.token).toBeDefined();
      expect(typeof loginResponse.token).toBe("string");
    });

    it("should reject on invalid code", async () => {
      await deleteUserByEmail(email);
      await caller.register({ email });

      loginCode = null;

      expect(
        caller.login({
          email,
          loginCode: "______",
        }),
      ).rejects.toBeDefined();
    });
  },
);

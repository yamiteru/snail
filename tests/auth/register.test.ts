import { caller } from "@/router";
import { deleteUserByEmail } from "@/utils/seeds";
import { mockLoginEmail } from "@/utils/mockFetch";
import { faker } from "@faker-js/faker";
import { setEnv } from "@/utils";

setEnv();

let loginCode: string | null = null;

mockLoginEmail((v) => (loginCode = v));

describe.each<string>([...new Array(10)].map(() => faker.internet.email()))(
  "auth/register %s",
  (email) => {
    it("should register a new user", async () => {
      await deleteUserByEmail(email);
      await caller.register({ email });

      const code = loginCode;
      loginCode = null;

      expect(typeof code).toBe("string");
    });

    it("should reject duplicate email", async () => {
      await deleteUserByEmail(email);
      await caller.register({ email });

      expect(caller.register({ email })).rejects.toBeDefined();
    });
  },
);

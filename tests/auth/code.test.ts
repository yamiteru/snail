import { caller } from "@/router";
import { setEnv } from "@/utils";
import { mockLoginEmail } from "@/utils/mockFetch";
import { deleteUserByEmail } from "@/utils/seeds";
import { faker } from "@faker-js/faker";

setEnv();

let loginCode: string | null = null;

mockLoginEmail((v) => (loginCode = v));

describe.each<string>([...new Array(10)].map(() => faker.internet.email()))(
  "auth/code %s",
  (email) => {
    it("should send login code on email", async () => {
      await deleteUserByEmail(email);
      await caller.register({ email });

      loginCode = null;

      await caller.code({ email });

      const code = loginCode;

      loginCode = null;

      expect(typeof code).toBe("string");
    });
  },
);

export const mockFetch = (
  fn: (url: string, init: RequestInit) => Promise<unknown>,
) => {
  const _fetch = global.fetch;

  beforeAll(() => {
    global.fetch = jest.fn(fn) as never;
  });

  afterAll(() => {
    global.fetch = _fetch;
  });
};

export const mockLoginEmail = (set: (loginCode: string) => void) =>
  mockFetch((_, { body }) => {
    set(
      JSON.parse(body as string).personalizations[0].dynamic_template_data
        .loginCode,
    );

    return Promise.resolve();
  });

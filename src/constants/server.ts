const BASE_URL = 'http://fbofaj-ip-219-251-96-151.tunnelmole.net';
type StringLike = string | number | boolean | undefined | null | bigint;
const createEndpoint = (server: string) => (str: TemplateStringsArray, ...args: StringLike[]) => {
  const result = str.reduce((prev, curr, i) => prev + curr + (args[i] ?? ''), '');

  return `${server}/${result[0] === '/' ? result.slice(1) : result}`;
};

export const server = createEndpoint(BASE_URL);
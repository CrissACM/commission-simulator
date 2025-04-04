/* eslint-disable @typescript-eslint/no-unused-expressions */
export function getEnvVariable() {
  import.meta.env;

  return {
    ...import.meta.env,
  };
}

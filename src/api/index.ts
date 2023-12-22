const BASE_URL = 'https://farcaster-snap-api-production.up.railway.app';

export const getNonce = async () => {
  const response = await fetch(`${BASE_URL}/auth/nonce`);
  const { message, nonce } = await response.json();
  return {
    nonce,
    message,
  };
};

export const signIn = async (
  address: string,
  signature: string,
  nonce: number,
): Promise<boolean> => {
  const response = await fetch(`${BASE_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ address, signature, nonce }),
  });
  return response.status === 200;
};

export const authCheck = async (address: string) => {
  const response = await fetch(`${BASE_URL}/auth/check`, {
    headers: {
      'x-address': address,
    },
  });
  const { message } = await response.json();
  return message;
};

export const getFarcasterFollowsInCommon = async (
  addressA: string,
  addressB: string,
) => {
  console.log(
    `${BASE_URL}/airstack/farcaster-follows?addressA=${addressA}&addressB=${addressB}`,
  );
  const response = await fetch(
    `${BASE_URL}/airstack/farcaster-follows?addressA=${addressA}&addressB=${addressB}`,
    {
      headers: {
        'x-address': addressB,
      },
    },
  );
  const { message } = await response.json();
  return message;
};

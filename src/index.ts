import type {
  OnInstallHandler,
  OnTransactionHandler,
} from '@metamask/snaps-sdk';
import { divider, heading, panel, text } from '@metamask/snaps-ui';

import { getNonce, signIn, getFarcasterFollowsInCommon } from './api';
import { formatAddress } from './utils';
import { getFarcasterIdentity } from './web3-bio';

// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  const { from, to } = transaction;

  const farcasterIdentity = await getFarcasterIdentity(to);

  if (!farcasterIdentity) {
    return {
      content: panel([
        heading('Address not on Farcaster'),
        text(`${formatAddress(to)} is not on Farcaster.`),
      ]),
    };
  }

  const followings = await getFarcasterFollowsInCommon(to, from);

  return {
    content: panel([
      panel([
        heading(farcasterIdentity.identity),
        text(
          `[Check their Profile on Farcaster](https://warpcast.com/${farcasterIdentity.identity})`,
        ),
      ]),
      divider(),
      text(followings),
    ]),
  };
};

export const onInstall: OnInstallHandler = async () => {
  const { nonce, message } = await getNonce();
  const accounts: string[] = (await ethereum.request({
    method: 'eth_requestAccounts',
  })) as unknown as string[];
  let authenticated = false;
  if (accounts && accounts?.length > 0) {
    const signature = await ethereum.request({
      method: 'personal_sign',
      params: [message, accounts[0]],
    });
    await signIn(accounts[0] as string, signature as string, nonce);
    authenticated = true;
  }
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel(
        authenticated
          ? [
              heading('You are all set!'),
              text(
                "Everything is ready to go. You can now use the snap to check if the address you're sending to is on Farcaster.",
              ),
            ]
          : [
              heading('Something went wrong!'),
              text(
                "We weren't able to authenticate your wallet, so the snap will not work. Please click re-install and try again, or contact limone.eth for support.",
              ),
            ],
      ),
    },
  });
};

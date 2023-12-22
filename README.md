# Farcaster MetaMask Snap

this repository implements Farcaster social graph inside MetaMask with a Snap.

MetaMask Snaps is a system that allows anyone to safely expand the capabilities
of MetaMask. 

a _Snap_ is a program that we run in an isolated environment that
can customize the wallet experience.

this Snap allows you to check the Farcaster social graph of the address you are sending $$ to. 

you can double check if it's a know account in your Farcaster circle.

![gif](https://github.com/limone-eth/farcaster-snap-site/blob/main/packages/site/static/video.gif)

## Snaps is pre-release software

to interact with (your) Snaps, you will need to install [MetaMask Flask](https://metamask.io/flask/),
a canary distribution for developers that provides access to upcoming features.

## getting started

clone this repository repository and set up the development environment:

```shell
yarn install && yarn start
```

### testing and linting

run `yarn test` to run the tests once.

run `yarn lint` to run the linter, or run `yarn lint:fix` to run the linter and
fix any automatically fixable issues.

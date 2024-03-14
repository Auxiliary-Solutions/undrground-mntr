This is a [Next.js](https://nextjs.org/) project created by the [Undrground](https://undrground.app) Team

## Getting Started

First, install dependencies:

```bash
npm run install
# or
yarn install
# or
pnpm install
# or
bun install
```

You'll need atleast one environment variable called `SESSION_PASS` you can copy the example env to get started.

`cp .env.example .env`

Then run the local development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Customize Your App

**Configuration:**

- Most of the configuration for this boilerplate resides inside `src/config` from there you can edit the `site.ts` or `session.ts`

**Theme:**

- All components are built with the app theme, which can be edited in `src/style/globals.css`. Please note that all values are hsl values not rgb.

- To customized any ui component futher they are all located in `src/components/*`

- Replace `icon.png` and `opengraph-image.png` in the `src/app` directory to edit your favicon and og image.

**Functionality:**

- The authentication in this app is handled with cookies. This cookie is encrypted and stores the siwe message of a user. The session can be interacted with using some helper functions found in `src/app/server/session.ts` these functions are for initiating a session, fetching session data, and destroying a session in the case of logging out

- The mint function in `src/lib/mint.ts` is purly and example and you'll need to tweak it to make it work for your specific contract

**Customize:**

- The whole app is meant to be built how you want it to be, this is very bare bones and needs your tlc and flare. The hard part of authentication is handled so you can build your ui exactly as you wish, all components in the `src/components/minter` directory are purly for examples.

- New components can be added via [Shadcn UI](https://ui.shadcn.com/docs/components/accordion), we've included an easy script for you to add more `pnpm ui:add <component name>`. Refer to the shadcn docs for all pre-built components they provide, and tweak them from there in `src/components/ui`

## Deploy on Vercel

Before pushing to any deployment make sure that you've run

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

To build the project locally first. If it fails to build in local it will probably fail to build in prod.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out their [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

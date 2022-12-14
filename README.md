This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Todo List

- Wallet
  ```
  [x] Handle connect to wallet
  [x] Handle refetch balance when change wallet or network
  [x] Handle event switch network
  [x] Handle event change wallet
  ```
- Redux
  ```
  [x] Init store
  [x] Manager app global state
  [x] Manager wallet address, web3 provider, rpc provider, signer, network, balance
  [x] Manager contract
  [x] Manager tx
  ```
- DOM
  ```
  [x] Layout
  [x] Meta Seo
  [-] Header
  [-] Footer
  [-] Input, Checkbox, Range, Radio
  [x] Button
  [x] Select
  [x] Modal
  [x] Popover
  [x] Tooltip
  [x] Table
  [x] Pagination
  [-] Toast
  [-] Loading Global
  [-] Loading Placeholder
  ```
- Api
  ```
  [x] Get sign message
  [x] Sign In
  ```
- Hooks
  ```
  [x] App dispatch
  [x] App selector
  [x] Connect wallet
  [x] Disconnect wallet
  [-] Connect wallet with token
  [x] Sign message
  [x] Declare contract
  [x] Balance wallet
  [x] App global state
  [x] Allowance contract
  [x] Approve contract
  [x] Call api with catch error
  [x] Filter query api
  [x] Meta data response api
  [x] Outside click
  [x] Initial contract
  [x] Debounce change
  [x] Tab
  ```

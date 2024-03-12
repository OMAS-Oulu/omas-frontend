## How to run the application

1. Install [NodeJS](https://nodejs.org)

2. Create .env or .env.local file in the project root with the following content:
```
NEXT_PUBLIC_API_URL=https://localhost:8080/
```

3. Using a NodeJS package manager (e.g., npm) , install dependencies with the command:
```bash
npm install
```

4. Start the application
```bash
npm run dev
```





This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Creating a certificate for HTTPS

In the root folder of the project, create a "certificates" folder and generate a self-signed certificate of name: localhost.pem and localhost-key.pem

recommended tool for generating a certificate: [mkcert](https://github.com/FiloSottile/mkcert)

run the development server:

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

## Learn More

### Next.js
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

### Recommended Icon library
- [Heroicons](https://heroicons.com/)

### Tailwind CSS
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# Enefty
🚀 This is my project for the [thirdweb Learn](https://thirdweb.com/learn) first cohort in June 2023. Thirdweb Learn is a community initiative where a few of us with different coding experiences come together with thirdweb DevRel advocates to learn new concepts, ask them questions and be asked contextual questions about our ideas and how we use thirdweb to make a web 3 application.

🎯 The goal of this project is playing with Smart Contracts, Generative AI, the thirdweb SDK and templates to learn and feel comfortable with thirdweb offerings and web 3 blockchain concepts.  

## Features

- View all NFTs in a collection.
- View the name, description and how many are minted.
- Claim an NFT for now.
- NOTE: For learning purposes, the collection and NFTs are minted on the mumbai testnet.
- Stretch Goals - I wonder if I put any collection contract and view its NFTs without browsing Opensea?
I wonder if I can watch NFTs and save that to my account to bid on later?

## About Enefty

💡 This idea allows one to see an ERC1155 collection and its ERC721 NFTS.  I used AI tools such as ChatGPT to come up with a collection idea, descriptions and prompts for generative art from Scenario. These were useful to create smart contracts using the thirdweb Dashboard and coding with their CLI templates to get the initial coding framework.

The rest was pushing my coding experience because I was learning many new things such as next.js and TypeScript. 😜 🦄

👀 By the way, I did come up with the name, Enefty, while creating a game avatar, but with a little searching while writing this out, I was not surprised to find that there is already a web3 app with the name out of Berlin, but this is not affiliated. This is just a project to learn and I wanted a nifty name.😎 #gemütlichkeit

## Technologies I used

- [thirdweb React Documentation](https://docs.thirdweb.com/react) - React SDK and the only thing I had experience in. 😋
- [thirdweb TypeScript Documentation](https://docs.thirdweb.com/typescript) - TypeScript SDK.
- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API.
- [Chakra UI](https://chakra-ui.com/) - Component library that works well with React.
- [Chatgpt](https://chat.openai.com/) - Useful for Generative IA prompt ideation and writing marketing blurbs.  It's also great for coding QA when I'm stuck on an error.
- [Scenario](https://www.scenario.com/) - Generative IA for making gaming images.  I used this in a hackathon and kept on using it as its capability has grown.

## thirdweb template inspiration: NFT-Gallery

Create your own NFT gallery for any ERC721/ERC1155 NFT collection on [any EVM-compatible chain](https://blog.thirdweb.com/any-contract-any-evm-chain/).

View the metadata of all NFTs in the collection, including features such as pagination, filtering, and search.

To create your own version of the template, run this command from the terminal to clone thirdweb's project:

```bash
npx thirdweb create --template nft-gallery
```
### 1. Deploy or Import Your NFT Collection

If you haven't already deployed your contract, head over to the thirdweb dashboard and create your own [NFT collection](https://thirdweb.com/thirdweb.eth/TokenERC721) contract.

If you have an existing contract, use the [thirdweb dashboard](https://thirdweb.com/dashboard) to import it!

### 2. Configure Parameters

Go to the [`parameters.ts`](/src/consts/parameters.ts) and update the following values:

1. `contractAddress`: The smart contract address of your NFT collection.
2.  `chain`: The name of the chain that your smart contract is deployed to.
3.  `blockExplorer`: (Optional) - The block explorer to open when user's click on historical events of each NFT.

### 3. Good Luck and Have Fun!

💜 Love to see what you do in the web3 space, [please reach out to me](https://linktr.ee/haunanipao) and share your inspiration.
## More about thirdweb

- [thirdweb Website](https://thirdweb.com/) - A place to kickstart the web3 journey and understand their key value proposition - an open source platform of tools and solutions which help you develop apps that are owned by you without locking you into a vendor ecosystem.🤟🏽
- [thirdweb Dashboard](https://thirdweb.com/dashboard) - Great place to get started with smart contracts, just connect your wallet to see what you can do.
- [thirdweb Portal](https://docs.thirdweb.com) - All the thirdweb guides and development resources that are fit to print.
- [thirdweb Templates](https://thirdweb.com/templates) - An ever growing resource for templates to get those ideas started.
- [thirdweb GitHub organization](https://github.com/thirdweb-dev) - If you got a github account, great place to find their coding work.
- [thirdweb Youtube](https://www.youtube.com/@thirdweb_) - My gateway to learn about and try new things. I like it - 🔔 Subscribed ✔

## Join thirdweb's Community Discord

For learning more about thirdweb, join their discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb). They really like to engage their community.  This is something I like because as a User Experience and Product Designer, I find value in engaging with the people who use a product or service to understand how they use something and why.  This community helps me grow my coding skills and web3 knowledge on my learning journey.

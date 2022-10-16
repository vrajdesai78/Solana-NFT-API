import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import express, { response } from "express";

const app = express();

app.use(express.json());

app.post('/claim', async (req, res) => {
    const address = req.body.address;
    const sdk = ThirdwebSDK.fromPrivateKey("devnet", "5gbQAvWmVh3FKiqR1gG9H2mdRWNCopw2DsdP2cNJdGVaKJHtpSTWUgwm2k2e1N5mt87vcmZ3o24LvvsBUbqXnF1Z");
    const program = await sdk.getProgram("CSGNCbybDTaNU29R7Baf9CeM4wj48494jYKD6CL6gSjs", "nft-drop");

    const claimedAddresses = await program.claimTo(address, 1);
    res.send(claimedAddresses[0]);
});

app.get('/nft', async (req, res) => {
    const address = req.body.address;
    const sdk = ThirdwebSDK.fromPrivateKey("devnet", "5gbQAvWmVh3FKiqR1gG9H2mdRWNCopw2DsdP2cNJdGVaKJHtpSTWUgwm2k2e1N5mt87vcmZ3o24LvvsBUbqXnF1Z");
    const program = await sdk.getProgram("CSGNCbybDTaNU29R7Baf9CeM4wj48494jYKD6CL6gSjs", "nft-drop");
    const nfts = await program.get(address);
    res.send(nfts);
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
});
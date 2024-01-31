import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import "dotenv/config"

try {
    const suppliedPublicKey = process.argv[2] || process.env.PUBLIC_KEY;
    if (!suppliedPublicKey) {
        throw new Error("Provide a public key to check the balance of!");
    }

    const connection = new Connection(clusterApiUrl(process.env.WORK_NET), "confirmed");

    const publicKey = new PublicKey(suppliedPublicKey);

    if (!PublicKey.isOnCurve(publicKey.toString())) {
        throw new Error("You provided invalid wallet addresses");
    }

    const balanceInLamports = await connection.getBalance(publicKey);

    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(
    `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
    );
} catch (error) {
    console.log(error);   
}

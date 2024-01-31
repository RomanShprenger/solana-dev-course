import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment, requestAndConfirmAirdropIfRequired } from "@solana-developers/helpers";

try {
    const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

    const connection = new Connection(clusterApiUrl(process.env.WORK_NET), "confirmed");

    // const publicKey = new PublicKey("PUBLIC_KEY");

    await requestAndConfirmAirdropIfRequired(
        connection,
        senderKeypair.publicKey,
        1 * LAMPORTS_PER_SOL,
        0.5 * LAMPORTS_PER_SOL,
      );

    console.log(
    `✅ Finished! The balance for the wallet at address ${senderKeypair.publicKey} was topup!`
    );
} catch (error) {
    console.log(error);   
}

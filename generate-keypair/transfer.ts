import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    clusterApiUrl
} from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

const toPubkey = new PublicKey(suppliedToPubkey);

console.log(`FROM: ${senderKeypair.publicKey}`);
console.log(`TO: ${toPubkey}`);

const connection = new Connection(clusterApiUrl(process.env.WORK_NET), "confirmed");

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

const transaction = new Transaction();
const LAMPORTS_TO_SEND = 5000000;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
]);

console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
);
console.log(`Transaction signature is ${signature}!`);
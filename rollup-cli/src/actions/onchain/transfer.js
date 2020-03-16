/* eslint-disable no-restricted-syntax */
const ethers = require('ethers');
const { fix2float } = require('../../../../js/utils');
const { getGasPrice } = require('./utils');

/**
 * @dev transfer between two accounts already defined in tree leaf
 * @param nodeEth URL of the ethereum node
 * @param addressSC rollup address
 * @param amount initial balance on balance tree
 * @param tokenId token type identifier
 * @param walletRollup ethAddress and babyPubKey together
 * @param abi abi of rollup contract
 * @param idFrom sender
 * @param idTo receiver
 * @param gasLimit transaction gas limit
 * @param gasMultiplier multiply gas price
*/
async function transfer(nodeEth, addressSC, amount, tokenId, walletRollup,
    abi, idFrom, idTo, gasLimit = 5000000, gasMultiplier = 1) {
    let walletEth = walletRollup.ethWallet.wallet;
    const provider = new ethers.providers.JsonRpcProvider(nodeEth);
    walletEth = walletEth.connect(provider);
    const contractWithSigner = new ethers.Contract(addressSC, abi, walletEth);
    const feeOnchainTx = await contractWithSigner.FEE_ONCHAIN_TX();
    const overrides = {
        gasLimit,
        gasPrice: await getGasPrice(gasMultiplier, provider),
        value: feeOnchainTx,
    };

    const amountF = fix2float(amount);
    try {
        return contractWithSigner.transfer(idFrom, idTo, amountF, tokenId, overrides);
    } catch (error) {
        throw new Error(`Message error: ${error.message}`);
    }
}

module.exports = {
    transfer,
};

import { create } from 'ipfs-http-client'
import { ApiPromise, WsProvider } from '@polkadot/api';
import { typesBundleForPolkadot } from '@crustio/type-definitions';
import {
    web3Accounts,
    web3Enable,
    web3FromAddress,
    web3ListRpcProviders,
    web3UseRpcProvider,
    web3FromSource
} from '@polkadot/extension-dapp';
import { stringToHex } from '@polkadot/util';

export var uploadtoipfs = async (imgBuffer) => {
    const buffer = Buffer.from(imgBuffer);
    //启动钱包
    const allInjected = await web3Enable('my cool dapp');
    //启动签名
    const allAccounts = await web3Accounts();
    const account = allAccounts[0];
    const injector = await web3FromSource(account.meta.source);
    const signRaw = injector.signer.signRaw;
    console.log(account.address);

    if (!!signRaw) {

        const { signature } = await signRaw({
            address: account.address,
            data: stringToHex(account.address),
            type: 'bytes'
        });

        const authHeaderRaw = `sub-${account.address}:${signature}`;

        const authHeader = Buffer.from(authHeaderRaw).toString('base64');
        const ipfsW3GW = 'https://crustwebsites.net';

     
        const ipfs = create({
            url: ipfsW3GW+"/api/v0",
            headers: {
                authorization: "Basic "+authHeader
            }
        });


        
        const result = await ipfs.add(buffer);



        return result.path;

   


    }
}
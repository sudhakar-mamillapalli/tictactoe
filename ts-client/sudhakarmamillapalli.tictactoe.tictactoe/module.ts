// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgStartGame } from "./types/tictactoe/tictactoe/tx";
import { MsgClaimSquare } from "./types/tictactoe/tictactoe/tx";
import { MsgCreateGame } from "./types/tictactoe/tictactoe/tx";


export { MsgStartGame, MsgClaimSquare, MsgCreateGame };

type sendMsgStartGameParams = {
  value: MsgStartGame,
  fee?: StdFee,
  memo?: string
};

type sendMsgClaimSquareParams = {
  value: MsgClaimSquare,
  fee?: StdFee,
  memo?: string
};

type sendMsgCreateGameParams = {
  value: MsgCreateGame,
  fee?: StdFee,
  memo?: string
};


type msgStartGameParams = {
  value: MsgStartGame,
};

type msgClaimSquareParams = {
  value: MsgClaimSquare,
};

type msgCreateGameParams = {
  value: MsgCreateGame,
};


export const registry = new Registry(msgTypes);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgStartGame({ value, fee, memo }: sendMsgStartGameParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgStartGame: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgStartGame({ value: MsgStartGame.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgStartGame: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgClaimSquare({ value, fee, memo }: sendMsgClaimSquareParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgClaimSquare: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgClaimSquare({ value: MsgClaimSquare.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgClaimSquare: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgCreateGame({ value, fee, memo }: sendMsgCreateGameParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgCreateGame: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgCreateGame({ value: MsgCreateGame.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgCreateGame: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgStartGame({ value }: msgStartGameParams): EncodeObject {
			try {
				return { typeUrl: "/sudhakarmamillapalli.tictactoe.tictactoe.MsgStartGame", value: MsgStartGame.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgStartGame: Could not create message: ' + e.message)
			}
		},
		
		msgClaimSquare({ value }: msgClaimSquareParams): EncodeObject {
			try {
				return { typeUrl: "/sudhakarmamillapalli.tictactoe.tictactoe.MsgClaimSquare", value: MsgClaimSquare.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgClaimSquare: Could not create message: ' + e.message)
			}
		},
		
		msgCreateGame({ value }: msgCreateGameParams): EncodeObject {
			try {
				return { typeUrl: "/sudhakarmamillapalli.tictactoe.tictactoe.MsgCreateGame", value: MsgCreateGame.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgCreateGame: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			SudhakarmamillapalliTictactoeTictactoe: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;
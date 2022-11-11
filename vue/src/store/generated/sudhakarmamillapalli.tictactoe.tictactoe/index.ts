import { Client, registry, MissingWalletError } from 'sudhakar-mamillapalli-tictactoe-client-ts'

import { CompletedGame } from "sudhakar-mamillapalli-tictactoe-client-ts/sudhakarmamillapalli.tictactoe.tictactoe/types"
import { InitiateGame } from "sudhakar-mamillapalli-tictactoe-client-ts/sudhakarmamillapalli.tictactoe.tictactoe/types"
import { Params } from "sudhakar-mamillapalli-tictactoe-client-ts/sudhakarmamillapalli.tictactoe.tictactoe/types"
import { StoredGame } from "sudhakar-mamillapalli-tictactoe-client-ts/sudhakarmamillapalli.tictactoe.tictactoe/types"
import { SystemInfo } from "sudhakar-mamillapalli-tictactoe-client-ts/sudhakarmamillapalli.tictactoe.tictactoe/types"


export { CompletedGame, InitiateGame, Params, StoredGame, SystemInfo };

function initClient(vuexGetters) {
	return new Client(vuexGetters['common/env/getEnv'], vuexGetters['common/wallet/signer'])
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop]=[...value[prop], ...next_values[prop]]
		}else{
			value[prop]=next_values[prop]
		}
	}
	return value
}

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	let structure: {fields: Field[]} = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const getDefaultState = () => {
	return {
				Params: {},
				SystemInfo: {},
				StoredGame: {},
				StoredGameAll: {},
				CompletedGame: {},
				CompletedGameAll: {},
				InitiateGame: {},
				InitiateGameAll: {},
				
				_Structure: {
						CompletedGame: getStructure(CompletedGame.fromPartial({})),
						InitiateGame: getStructure(InitiateGame.fromPartial({})),
						Params: getStructure(Params.fromPartial({})),
						StoredGame: getStructure(StoredGame.fromPartial({})),
						SystemInfo: getStructure(SystemInfo.fromPartial({})),
						
		},
		_Registry: registry,
		_Subscriptions: new Set(),
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(JSON.stringify(subscription))
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(JSON.stringify(subscription))
		}
	},
	getters: {
				getParams: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Params[JSON.stringify(params)] ?? {}
		},
				getSystemInfo: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.SystemInfo[JSON.stringify(params)] ?? {}
		},
				getStoredGame: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.StoredGame[JSON.stringify(params)] ?? {}
		},
				getStoredGameAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.StoredGameAll[JSON.stringify(params)] ?? {}
		},
				getCompletedGame: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.CompletedGame[JSON.stringify(params)] ?? {}
		},
				getCompletedGameAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.CompletedGameAll[JSON.stringify(params)] ?? {}
		},
				getInitiateGame: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.InitiateGame[JSON.stringify(params)] ?? {}
		},
				getInitiateGameAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.InitiateGameAll[JSON.stringify(params)] ?? {}
		},
				
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: sudhakarmamillapalli.tictactoe.tictactoe initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					const sub=JSON.parse(subscription)
					await dispatch(sub.action, sub.payload)
				}catch(e) {
					throw new Error('Subscriptions: ' + e.message)
				}
			})
		},
		
		
		
		 		
		
		
		async QueryParams({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SudhakarmamillapalliTictactoeTictactoe.query.queryParams()).data
				
					
				commit('QUERY', { query: 'Params', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryParams', payload: { options: { all }, params: {...key},query }})
				return getters['getParams']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryParams API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QuerySystemInfo({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SudhakarmamillapalliTictactoeTictactoe.query.querySystemInfo()).data
				
					
				commit('QUERY', { query: 'SystemInfo', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QuerySystemInfo', payload: { options: { all }, params: {...key},query }})
				return getters['getSystemInfo']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QuerySystemInfo API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryStoredGame({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SudhakarmamillapalliTictactoeTictactoe.query.queryStoredGame( key.index)).data
				
					
				commit('QUERY', { query: 'StoredGame', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryStoredGame', payload: { options: { all }, params: {...key},query }})
				return getters['getStoredGame']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryStoredGame API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryStoredGameAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SudhakarmamillapalliTictactoeTictactoe.query.queryStoredGameAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.SudhakarmamillapalliTictactoeTictactoe.query.queryStoredGameAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'StoredGameAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryStoredGameAll', payload: { options: { all }, params: {...key},query }})
				return getters['getStoredGameAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryStoredGameAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryCompletedGame({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SudhakarmamillapalliTictactoeTictactoe.query.queryCompletedGame( key.index)).data
				
					
				commit('QUERY', { query: 'CompletedGame', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryCompletedGame', payload: { options: { all }, params: {...key},query }})
				return getters['getCompletedGame']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryCompletedGame API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryCompletedGameAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SudhakarmamillapalliTictactoeTictactoe.query.queryCompletedGameAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.SudhakarmamillapalliTictactoeTictactoe.query.queryCompletedGameAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'CompletedGameAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryCompletedGameAll', payload: { options: { all }, params: {...key},query }})
				return getters['getCompletedGameAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryCompletedGameAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryInitiateGame({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SudhakarmamillapalliTictactoeTictactoe.query.queryInitiateGame( key.index)).data
				
					
				commit('QUERY', { query: 'InitiateGame', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryInitiateGame', payload: { options: { all }, params: {...key},query }})
				return getters['getInitiateGame']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryInitiateGame API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryInitiateGameAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SudhakarmamillapalliTictactoeTictactoe.query.queryInitiateGameAll(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.SudhakarmamillapalliTictactoeTictactoe.query.queryInitiateGameAll({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'InitiateGameAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryInitiateGameAll', payload: { options: { all }, params: {...key},query }})
				return getters['getInitiateGameAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryInitiateGameAll API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgStartGame({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.SudhakarmamillapalliTictactoeTictactoe.tx.sendMsgStartGame({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgStartGame:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgStartGame:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgClaimSquare({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.SudhakarmamillapalliTictactoeTictactoe.tx.sendMsgClaimSquare({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgClaimSquare:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgClaimSquare:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateGame({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.SudhakarmamillapalliTictactoeTictactoe.tx.sendMsgCreateGame({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateGame:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateGame:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgStartGame({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.SudhakarmamillapalliTictactoeTictactoe.tx.msgStartGame({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgStartGame:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgStartGame:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgClaimSquare({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.SudhakarmamillapalliTictactoeTictactoe.tx.msgClaimSquare({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgClaimSquare:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgClaimSquare:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateGame({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.SudhakarmamillapalliTictactoeTictactoe.tx.msgCreateGame({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateGame:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateGame:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}

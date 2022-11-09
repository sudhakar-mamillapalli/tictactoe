package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
)

// SetInitiateGame set a specific initiateGame in the store from its index
func (k Keeper) SetInitiateGame(ctx sdk.Context, initiateGame types.InitiateGame) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.InitiateGameKeyPrefix))
	b := k.cdc.MustMarshal(&initiateGame)
	store.Set(types.InitiateGameKey(
		initiateGame.Index,
	), b)
}

// GetInitiateGame returns a initiateGame from its index
func (k Keeper) GetInitiateGame(
	ctx sdk.Context,
	index string,

) (val types.InitiateGame, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.InitiateGameKeyPrefix))

	b := store.Get(types.InitiateGameKey(
		index,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveInitiateGame removes a initiateGame from the store
func (k Keeper) RemoveInitiateGame(
	ctx sdk.Context,
	index string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.InitiateGameKeyPrefix))
	store.Delete(types.InitiateGameKey(
		index,
	))
}

// GetAllInitiateGame returns all initiateGame
func (k Keeper) GetAllInitiateGame(ctx sdk.Context) (list []types.InitiateGame) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.InitiateGameKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.InitiateGame
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
)

// SetCompletedGame set a specific completedGame in the store from its index
func (k Keeper) SetCompletedGame(ctx sdk.Context, completedGame types.CompletedGame) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CompletedGameKeyPrefix))
	b := k.cdc.MustMarshal(&completedGame)
	store.Set(types.CompletedGameKey(
		completedGame.Index,
	), b)
}

// GetCompletedGame returns a completedGame from its index
func (k Keeper) GetCompletedGame(
	ctx sdk.Context,
	index string,

) (val types.CompletedGame, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CompletedGameKeyPrefix))

	b := store.Get(types.CompletedGameKey(
		index,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveCompletedGame removes a completedGame from the store
func (k Keeper) RemoveCompletedGame(
	ctx sdk.Context,
	index string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CompletedGameKeyPrefix))
	store.Delete(types.CompletedGameKey(
		index,
	))
}

// GetAllCompletedGame returns all completedGame
func (k Keeper) GetAllCompletedGame(ctx sdk.Context) (list []types.CompletedGame) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CompletedGameKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.CompletedGame
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

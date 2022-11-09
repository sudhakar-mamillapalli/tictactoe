package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) InitiateGameAll(c context.Context, req *types.QueryAllInitiateGameRequest) (*types.QueryAllInitiateGameResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var initiateGames []types.InitiateGame
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	initiateGameStore := prefix.NewStore(store, types.KeyPrefix(types.InitiateGameKeyPrefix))

	pageRes, err := query.Paginate(initiateGameStore, req.Pagination, func(key []byte, value []byte) error {
		var initiateGame types.InitiateGame
		if err := k.cdc.Unmarshal(value, &initiateGame); err != nil {
			return err
		}

		initiateGames = append(initiateGames, initiateGame)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllInitiateGameResponse{InitiateGame: initiateGames, Pagination: pageRes}, nil
}

func (k Keeper) InitiateGame(c context.Context, req *types.QueryGetInitiateGameRequest) (*types.QueryGetInitiateGameResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetInitiateGame(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetInitiateGameResponse{InitiateGame: val}, nil
}

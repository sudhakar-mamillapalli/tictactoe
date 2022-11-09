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

func (k Keeper) CompletedGameAll(c context.Context, req *types.QueryAllCompletedGameRequest) (*types.QueryAllCompletedGameResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var completedGames []types.CompletedGame
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	completedGameStore := prefix.NewStore(store, types.KeyPrefix(types.CompletedGameKeyPrefix))

	pageRes, err := query.Paginate(completedGameStore, req.Pagination, func(key []byte, value []byte) error {
		var completedGame types.CompletedGame
		if err := k.cdc.Unmarshal(value, &completedGame); err != nil {
			return err
		}

		completedGames = append(completedGames, completedGame)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllCompletedGameResponse{CompletedGame: completedGames, Pagination: pageRes}, nil
}

func (k Keeper) CompletedGame(c context.Context, req *types.QueryGetCompletedGameRequest) (*types.QueryGetCompletedGameResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetCompletedGame(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetCompletedGameResponse{CompletedGame: val}, nil
}

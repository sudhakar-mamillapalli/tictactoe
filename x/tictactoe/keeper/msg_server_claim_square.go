package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
)

func (k msgServer) ClaimSquare(goCtx context.Context, msg *types.MsgClaimSquare) (*types.MsgClaimSquareResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgClaimSquareResponse{}, nil
}

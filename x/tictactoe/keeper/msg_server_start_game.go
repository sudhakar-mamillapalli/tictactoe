package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
)

func (k msgServer) StartGame(goCtx context.Context, msg *types.MsgStartGame) (*types.MsgStartGameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgStartGameResponse{}, nil
}

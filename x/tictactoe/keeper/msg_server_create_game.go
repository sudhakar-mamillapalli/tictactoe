package keeper

import (
	"context"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/rules"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
)

func (k msgServer) CreateGame(goCtx context.Context, msg *types.MsgCreateGame) (*types.MsgCreateGameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	// 1. Get the current Id
	systemInfo, found := k.Keeper.GetSystemInfo(ctx)
	if !found {
		panic("SystemInfo not found")
	}
	newIndex := strconv.FormatUint(systemInfo.NextId, 10)

	// Create the object to be stored
	newGame := rules.NewGame()
	createdGame := types.InitiateGame{
		Index:   newIndex,
		Creator: msg.Creator,
		Board:   string(newGame.Serialize()),
	}

	// save the StoredGame object. keeper/msg_server.go has MsgServer def
	k.Keeper.SetInitiateGame(ctx, createdGame)

	// update systemInfo
	systemInfo.NextId++
	k.Keeper.SetSystemInfo(ctx, systemInfo)

	return &types.MsgCreateGameResponse{
		GameIndex: newIndex,
	}, nil
}

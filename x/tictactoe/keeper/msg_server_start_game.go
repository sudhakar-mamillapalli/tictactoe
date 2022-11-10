package keeper

import (
	"context"
	"crypto/sha256"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
)

func (k msgServer) StartGame(goCtx context.Context, msg *types.MsgStartGame) (*types.MsgStartGameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	//1. Find the initiated game
	iGame, found := k.Keeper.GetInitiateGame(ctx, msg.GameIndex)
	if !found {
		return nil, sdkerrors.Wrapf(types.ErrGameNotFound, "%s", msg.GameIndex)
	}

	// Now the person who initiated/created the game (iGame.Creator) will be
	// one player and the one who sends this startGame message (msg.Creator)
	// will be the second player One will be playerX and the other playerO. Who
	// will be what? Concatenate keys and take hash of it.  If first bit is 0
	// then game initiator plays "O" and the second player plays "X" or vice
	// versa X will have the first move
	temp := sha256.Sum256([]byte(iGame.Creator + msg.Creator))
	first_bit := (temp[0] & 0x80) >> 7 // most significant bit
	playerX := iGame.Creator
	playerO := msg.Creator
	if first_bit == 0 {
		playerX, playerO = playerO, playerX
	}

	// Create the object to be stored
	storedGame := types.StoredGame{
		Index:   msg.GameIndex,
		Board:   iGame.Board,
		PlayerX: playerX,
		PlayerO: playerO,
	}

	/*
	 * .PlayerX, and .PlayerO need to be checked because they were copied as strings.
	 * You do not need to check .Creator because at this stage the message's
	 * signatures have been verified, and the creator is the signer.
	 */
	// This is helper function we wrote in full_game.go
	err := storedGame.Validate()
	if err != nil {
		// error instead of panic since players cannot stall the blockchain.
		// They can spam but they will have to pay gas fee to to this point
		return nil, err
	}

	// save the StoredGame object. keeper/msg_server.go has MsgServer def
	k.Keeper.SetStoredGame(ctx, storedGame)

	// Remove the game from InitiatedGames list
	k.Keeper.RemoveInitiateGame(ctx, msg.GameIndex)

	// Useless. Makes no sense returning gameIndex as response. FIX
	return &types.MsgStartGameResponse{
		GameIndex: msg.GameIndex,
	}, nil
}

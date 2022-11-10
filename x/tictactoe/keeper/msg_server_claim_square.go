package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/rules"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
)

func (k msgServer) ClaimSquare(goCtx context.Context, msg *types.MsgClaimSquare) (*types.MsgClaimSquareResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message

	// 1. Find the game.
	storedGame, found := k.Keeper.GetStoredGame(ctx, msg.GameIndex)
	if !found {
		return nil, sdkerrors.Wrapf(types.ErrGameNotFound, "%s", msg.GameIndex)
	}

	// 2. check player legitimate
	// Note This uses the certainty that the MsgPlayMove.Creator has been
	// verified by its signature.  Create is the creator if this message, so
	// it must be either playerX or playerO of this game
	isX := storedGame.PlayerX == msg.Creator
	isO := storedGame.PlayerO == msg.Creator
	var player rules.Player
	if !isX && !isO {
		return nil, sdkerrors.Wrapf(types.ErrCreatorNotPlayer, "%s", msg.Creator)
	} else if isX && isO {
		// The case when both X and O are same player
		// i.e. playing themselves.
		player = rules.PlayerX
	} else if isX {
		player = rules.PlayerX
	} else {
		player = rules.PlayerO
	}

	// 3. Instantiate the board in order to implement the rules
	// ParseGame in full_game
	game, err := rules.DeSerialize([]byte(storedGame.Board))
	if err != nil {
		panic(err.Error())
	}

	//4. Claim the square.
	ownErr := game.OwnSquare(player, int(msg.Row), int(msg.Col))
	if ownErr != nil {
		return nil, sdkerrors.Wrapf(types.ErrWrongClaim, ownErr.Error())
	}

	//5. Stored updated board
	storedGame.Board = string(game.Serialize())
	k.Keeper.SetStoredGame(ctx, storedGame)

	//6. Was there a winner. If so move game to closed games list
	winner := game.CheckWinner()
	var winnerString string
	if winner == rules.PlayerX {
		winnerString = "X"
	} else if winner == rules.PlayerO {
		winnerString = "O"
	} else {
		winnerString = ""
	}
	if winner != rules.PlayerU {
		// Remove the game from in-progress (named stored) games list
		// and add to completed list
		k.Keeper.RemoveStoredGame(ctx, msg.GameIndex)
		cmplGame := types.CompletedGame{
			Index:   msg.GameIndex,
			Board:   storedGame.Board,
			PlayerX: storedGame.PlayerX,
			PlayerO: storedGame.PlayerO,
			Winner:  winnerString,
		}
		k.Keeper.SetCompletedGame(ctx, cmplGame)
	}

	//7. Return result basically the winner if any
	return &types.MsgClaimSquareResponse{
		Winner: winnerString,
	}, nil

}

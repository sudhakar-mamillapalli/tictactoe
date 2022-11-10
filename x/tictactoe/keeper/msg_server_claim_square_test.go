package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	keepertest "github.com/sudhakar-mamillapalli/tictactoe/testutil/keeper"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/keeper"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
)

func setupMsgServerCmplGame(t testing.TB) (types.MsgServer, keeper.Keeper, context.Context) {
	// Keeper has to be initialized with default genesis. Doing that here.
	k, ctx := keepertest.TictactoeKeeper(t)
	// tictactoe.InitGenesis in tictactoe/x/tictactoe/genesis.go
	tictactoe.InitGenesis(ctx, *k, *types.DefaultGenesis())
	return keeper.NewMsgServerImpl(*k), *k, sdk.WrapSDKContext(ctx)
}
func TestCompleteGame(t *testing.T) {
	msgServer, keeper, context := setupMsgServerCmplGame(t)
	_, err := msgServer.CreateGame(context, &types.MsgCreateGame{
		Creator: alice,
	})
	// now that we have created the game let bob start the game
	startResponse, err := msgServer.StartGame(context, &types.MsgStartGame{
		GameIndex: "1",
		Creator:   bob,
	})
	require.Nil(t, err)
	require.EqualValues(t, types.MsgStartGameResponse{
		GameIndex: "1",
	}, *startResponse)

	game1, found1 := keeper.GetStoredGame(sdk.UnwrapSDKContext(context), "1")
	require.True(t, found1)
	// Based on requirements, this time game creator ends up as PlayerX and
	// the player accepting the challenge as PlayerO
	require.EqualValues(t, types.StoredGame{
		Index:   "1",
		Board:   string([]byte{0x1, 0x0, 0x0, 0x0}),
		PlayerX: alice,
		PlayerO: bob,
	}, game1)

	// Now make moves and see reflected in stored game
	response, err := msgServer.ClaimSquare(context, &types.MsgClaimSquare{
		GameIndex: "1",
		Creator:   alice,
		Row:       0,
		Col:       0,
	})
	require.Nil(t, err)
	require.EqualValues(t, types.MsgClaimSquareResponse{
		Winner: "",
	}, *response)
	_, err = msgServer.ClaimSquare(context, &types.MsgClaimSquare{
		GameIndex: "1",
		Creator:   bob,
		Row:       1,
		Col:       0,
	})
	require.Nil(t, err)
	_, err = msgServer.ClaimSquare(context, &types.MsgClaimSquare{
		GameIndex: "1",
		Creator:   alice,
		Row:       0,
		Col:       2,
	})
	require.Nil(t, err)
	_, err = msgServer.ClaimSquare(context, &types.MsgClaimSquare{
		GameIndex: "1",
		Creator:   bob,
		Row:       1,
		Col:       1,
	})
	require.Nil(t, err)
	_, err = msgServer.ClaimSquare(context, &types.MsgClaimSquare{
		GameIndex: "1",
		Creator:   alice,
		Row:       2,
		Col:       0,
	})
	require.Nil(t, err)
	response, err = msgServer.ClaimSquare(context, &types.MsgClaimSquare{
		GameIndex: "1",
		Creator:   bob,
		Row:       1,
		Col:       2,
	})
	require.Nil(t, err)
	require.EqualValues(t, types.MsgClaimSquareResponse{
		Winner: "O",
	}, *response)

	// make sure completed game removed from in-progress (storegames) list
	_, found1 = keeper.GetStoredGame(sdk.UnwrapSDKContext(context), "1")
	require.False(t, found1)

	// completed game should have been moved to completed games list
	cmplGame, found1 := keeper.GetCompletedGame(sdk.UnwrapSDKContext(context), "1")
	require.True(t, found1)
	require.EqualValues(t, types.CompletedGame{
		Index:   "1",
		Board:   string([]byte{0x1, 0x11, 0x2a, 0x1}),
		PlayerX: alice,
		PlayerO: bob,
		Winner:  "O",
	}, cmplGame)

}

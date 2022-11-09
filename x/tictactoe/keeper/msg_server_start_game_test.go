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

/*
func setupMsgServerCreateGame(t testing.TB) (types.MsgServer, keeper.Keeper, context.Context) {
	// Keeper has to be initialized with default genesis. Doing that here.
	k, ctx := keepertest.TictactoeKeeper(t)
	// tictactoe.InitGenesis in tictactoe/x/tictactoe/genesis.go
	tictactoe.InitGenesis(ctx, *k, *types.DefaultGenesis())
	return keeper.NewMsgServerImpl(*k), *k, sdk.WrapSDKContext(ctx)
}
*/

func setupMsgServerStartGame(t testing.TB) (types.MsgServer, keeper.Keeper, context.Context) {
	// Keeper has to be initialized with default genesis. Doing that here.
	k, ctx := keepertest.TictactoeKeeper(t)
	// tictactoe.InitGenesis in tictactoe/x/tictactoe/genesis.go
	tictactoe.InitGenesis(ctx, *k, *types.DefaultGenesis())
	return keeper.NewMsgServerImpl(*k), *k, sdk.WrapSDKContext(ctx)
}
func TestStartGame(t *testing.T) {
	msgServer, keeper, context := setupMsgServerCreateGame(t)
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
}

func TestStartGame2(t *testing.T) {
	msgServer, keeper, context := setupMsgServerCreateGame(t)
	_, err := msgServer.CreateGame(context, &types.MsgCreateGame{
		Creator: carol,
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
	// Based on requirements, this time game creator ends up as PlayerO and
	// the game accepting the challenge as PlayerX
	game1, found1 := keeper.GetStoredGame(sdk.UnwrapSDKContext(context), "1")
	require.True(t, found1)
	require.EqualValues(t, types.StoredGame{
		Index:   "1",
		Board:   string([]byte{0x1, 0x0, 0x0, 0x0}),
		PlayerX: bob,
		PlayerO: carol,
	}, game1)
}

func TestStartGameUsingBadIndex(t *testing.T) {
	msgServer, _, context := setupMsgServerCreateGame(t)
	_, err := msgServer.CreateGame(context, &types.MsgCreateGame{
		Creator: carol,
	})
	startResponse, err := msgServer.StartGame(context, &types.MsgStartGame{
		GameIndex: "2",
		Creator:   bob,
	})
	require.Nil(t, startResponse)
	require.Equal(t, "2: bad game index", err.Error())
}

func TestStart3Games(t *testing.T) {
	msgServer, keeper, context := setupMsgServerCreateGame(t)
	// Create three games
	_, err := msgServer.CreateGame(context, &types.MsgCreateGame{
		Creator: alice,
	})
	require.Nil(t, err)
	_, err = msgServer.CreateGame(context, &types.MsgCreateGame{
		Creator: bob,
	})
	require.Nil(t, err)
	_, err = msgServer.CreateGame(context, &types.MsgCreateGame{
		Creator: carol,
	})
	require.Nil(t, err)

	// Now start the games and see that start ok and also game stored on
	// chain
	startResponse, err := msgServer.StartGame(context, &types.MsgStartGame{
		GameIndex: "1",
		Creator:   bob,
	})
	require.Nil(t, err)
	require.EqualValues(t, types.MsgStartGameResponse{
		GameIndex: "1",
	}, *startResponse)
	_, found1 := keeper.GetStoredGame(sdk.UnwrapSDKContext(context), "1")
	require.True(t, found1)

	startResponse, err = msgServer.StartGame(context, &types.MsgStartGame{
		GameIndex: "2",
		Creator:   carol,
	})
	require.Nil(t, err)
	require.EqualValues(t, types.MsgStartGameResponse{
		GameIndex: "2",
	}, *startResponse)
	_, found1 = keeper.GetStoredGame(sdk.UnwrapSDKContext(context), "2")
	require.True(t, found1)

	startResponse, err = msgServer.StartGame(context, &types.MsgStartGame{
		GameIndex: "3",
		Creator:   alice,
	})
	require.Nil(t, err)
	require.EqualValues(t, types.MsgStartGameResponse{
		GameIndex: "3",
	}, *startResponse)
	_, found1 = keeper.GetStoredGame(sdk.UnwrapSDKContext(context), "3")
	require.True(t, found1)
}

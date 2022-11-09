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

const (
	alice = "cosmos1jmjfq0tplp9tmx4v9uemw72y4d2wa5nr3xn9d3"
	bob   = "cosmos1xyxs3skf3f4jfqeuv89yyaqvjc6lffavxqhc8g"
	carol = "cosmos1e0w5t53nrq7p66fye6c8p0ynyhf6y24l4yuxd7"
)

func setupMsgServerCreateGame(t testing.TB) (types.MsgServer, keeper.Keeper, context.Context) {
	// Keeper has to be initialized with default genesis. Doing that here.
	k, ctx := keepertest.TictactoeKeeper(t)
	// tictactoe.InitGenesis in tictactoe/x/tictactoe/genesis.go
	tictactoe.InitGenesis(ctx, *k, *types.DefaultGenesis())
	return keeper.NewMsgServerImpl(*k), *k, sdk.WrapSDKContext(ctx)
}

func TestCreateGame(t *testing.T) {
	msgServer, _, context := setupMsgServerCreateGame(t)
	createResponse, err := msgServer.CreateGame(context, &types.MsgCreateGame{
		Creator: alice,
	})
	require.Nil(t, err)
	require.EqualValues(t, types.MsgCreateGameResponse{
		GameIndex: "1",
	}, *createResponse)
}

func TestCreate1GameHasSaved(t *testing.T) {
	msgSrvr, keeper, context := setupMsgServerCreateGame(t)
	msgSrvr.CreateGame(context, &types.MsgCreateGame{
		Creator: alice,
	})
	systemInfo, found := keeper.GetSystemInfo(sdk.UnwrapSDKContext(context))
	require.True(t, found)
	require.EqualValues(t, types.SystemInfo{
		NextId: 2,
	}, systemInfo)
	game1, found1 := keeper.GetInitiateGame(sdk.UnwrapSDKContext(context), "1")
	require.True(t, found1)
	require.EqualValues(t, types.InitiateGame{
		Index:   "1",
		Board:   string([]byte{0x1, 0x0, 0x0, 0x0}),
		Creator: alice,
	}, game1)
}

func TestCreate3Games(t *testing.T) {
	msgSrvr, _, context := setupMsgServerCreateGame(t)
	msgSrvr.CreateGame(context, &types.MsgCreateGame{
		Creator: alice,
	})
	createResponse2, err2 := msgSrvr.CreateGame(context, &types.MsgCreateGame{
		Creator: bob,
	})
	require.Nil(t, err2)
	require.EqualValues(t, types.MsgCreateGameResponse{
		GameIndex: "2",
	}, *createResponse2)
	createResponse3, err3 := msgSrvr.CreateGame(context, &types.MsgCreateGame{
		Creator: carol,
	})
	require.Nil(t, err3)
	require.EqualValues(t, types.MsgCreateGameResponse{
		GameIndex: "3",
	}, *createResponse3)
}

func TestCreate3GamesHasSaved(t *testing.T) {
	msgSrvr, keeper, context := setupMsgServerCreateGame(t)
	ctx := sdk.UnwrapSDKContext(context)
	msgSrvr.CreateGame(context, &types.MsgCreateGame{
		Creator: alice,
	})
	msgSrvr.CreateGame(context, &types.MsgCreateGame{
		Creator: bob,
	})
	msgSrvr.CreateGame(context, &types.MsgCreateGame{
		Creator: carol,
	})
	systemInfo, found := keeper.GetSystemInfo(ctx)
	require.True(t, found)
	require.EqualValues(t, types.SystemInfo{
		NextId: 4,
	}, systemInfo)
	game1, found1 := keeper.GetInitiateGame(ctx, "1")
	require.True(t, found1)
	require.EqualValues(t, types.InitiateGame{
		Index:   "1",
		Creator: alice,
		Board:   string([]byte{0x1, 0x0, 0x0, 0x0}),
	}, game1)
	game2, found2 := keeper.GetInitiateGame(ctx, "2")
	require.True(t, found2)
	require.EqualValues(t, types.InitiateGame{
		Index:   "2",
		Creator: bob,
		Board:   string([]byte{0x1, 0x0, 0x0, 0x0}),
	}, game2)
	game3, found3 := keeper.GetInitiateGame(ctx, "3")
	require.True(t, found3)
	require.EqualValues(t, types.InitiateGame{
		Index:   "3",
		Creator: carol,
		Board:   string([]byte{0x1, 0x0, 0x0, 0x0}),
	}, game3)
}

func TestCreate3GamesGetAll(t *testing.T) {
	msgSrvr, keeper, context := setupMsgServerCreateGame(t)
	msgSrvr.CreateGame(context, &types.MsgCreateGame{
		Creator: alice,
	})
	msgSrvr.CreateGame(context, &types.MsgCreateGame{
		Creator: bob,
	})
	msgSrvr.CreateGame(context, &types.MsgCreateGame{
		Creator: carol,
	})
	games := keeper.GetAllInitiateGame(sdk.UnwrapSDKContext(context))
	require.Len(t, games, 3)
	require.EqualValues(t, types.InitiateGame{
		Index:   "1",
		Creator: alice,
		Board:   string([]byte{0x1, 0x0, 0x0, 0x0}),
	}, games[0])
	require.EqualValues(t, types.InitiateGame{
		Index:   "2",
		Creator: bob,
		Board:   string([]byte{0x1, 0x0, 0x0, 0x0}),
	}, games[1])
	require.EqualValues(t, types.InitiateGame{
		Index:   "3",
		Creator: carol,
		Board:   string([]byte{0x1, 0x0, 0x0, 0x0}),
	}, games[2])
}

func TestCreateGameFarFuture(t *testing.T) {
	msgSrvr, keeper, context := setupMsgServerCreateGame(t)
	ctx := sdk.UnwrapSDKContext(context)
	systemInfo, found := keeper.GetSystemInfo(ctx)
	systemInfo.NextId = 1024
	keeper.SetSystemInfo(ctx, systemInfo)
	createResponse, err := msgSrvr.CreateGame(context, &types.MsgCreateGame{
		Creator: alice,
	})
	require.Nil(t, err)
	require.EqualValues(t, types.MsgCreateGameResponse{
		GameIndex: "1024",
	}, *createResponse)
	systemInfo, found = keeper.GetSystemInfo(ctx)
	require.True(t, found)
	require.EqualValues(t, types.SystemInfo{
		NextId: 1025,
	}, systemInfo)
	game1, found1 := keeper.GetInitiateGame(ctx, "1024")
	require.True(t, found1)
	require.EqualValues(t, types.InitiateGame{
		Index:   "1024",
		Creator: alice,
		Board:   string([]byte{0x1, 0x0, 0x0, 0x0}),
	}, game1)
}

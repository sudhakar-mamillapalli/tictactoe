package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	keepertest "github.com/sudhakar-mamillapalli/tictactoe/testutil/keeper"
	"github.com/sudhakar-mamillapalli/tictactoe/testutil/nullify"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/keeper"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNInitiateGame(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.InitiateGame {
	items := make([]types.InitiateGame, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)

		keeper.SetInitiateGame(ctx, items[i])
	}
	return items
}

func TestInitiateGameGet(t *testing.T) {
	keeper, ctx := keepertest.TictactoeKeeper(t)
	items := createNInitiateGame(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetInitiateGame(ctx,
			item.Index,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestInitiateGameRemove(t *testing.T) {
	keeper, ctx := keepertest.TictactoeKeeper(t)
	items := createNInitiateGame(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveInitiateGame(ctx,
			item.Index,
		)
		_, found := keeper.GetInitiateGame(ctx,
			item.Index,
		)
		require.False(t, found)
	}
}

func TestInitiateGameGetAll(t *testing.T) {
	keeper, ctx := keepertest.TictactoeKeeper(t)
	items := createNInitiateGame(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllInitiateGame(ctx)),
	)
}

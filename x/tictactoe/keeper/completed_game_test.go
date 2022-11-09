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

func createNCompletedGame(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.CompletedGame {
	items := make([]types.CompletedGame, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)

		keeper.SetCompletedGame(ctx, items[i])
	}
	return items
}

func TestCompletedGameGet(t *testing.T) {
	keeper, ctx := keepertest.TictactoeKeeper(t)
	items := createNCompletedGame(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetCompletedGame(ctx,
			item.Index,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestCompletedGameRemove(t *testing.T) {
	keeper, ctx := keepertest.TictactoeKeeper(t)
	items := createNCompletedGame(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveCompletedGame(ctx,
			item.Index,
		)
		_, found := keeper.GetCompletedGame(ctx,
			item.Index,
		)
		require.False(t, found)
	}
}

func TestCompletedGameGetAll(t *testing.T) {
	keeper, ctx := keepertest.TictactoeKeeper(t)
	items := createNCompletedGame(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllCompletedGame(ctx)),
	)
}

package keeper

import (
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
)

var _ types.QueryServer = Keeper{}

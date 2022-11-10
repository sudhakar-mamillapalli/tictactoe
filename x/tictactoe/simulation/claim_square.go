package simulation

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/keeper"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
)

func SimulateMsgClaimSquare(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgClaimSquare{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the ClaimSquare simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "ClaimSquare simulation not implemented"), nil, nil
	}
}

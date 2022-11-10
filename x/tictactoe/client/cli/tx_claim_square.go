package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
)

var _ = strconv.Itoa(0)

func CmdClaimSquare() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "claim-square [game-index] [row] [col]",
		Short: "Broadcast message claimSquare",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argGameIndex := args[0]
			argRow, err := cast.ToUint64E(args[1])
			if err != nil {
				return err
			}
			argCol, err := cast.ToUint64E(args[2])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgClaimSquare(
				clientCtx.GetFromAddress().String(),
				argGameIndex,
				argRow,
				argCol,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
)

func CmdListInitiateGame() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-initiate-game",
		Short: "list all initiateGame",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllInitiateGameRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.InitiateGameAll(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddPaginationFlagsToCmd(cmd, cmd.Use)
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

func CmdShowInitiateGame() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-initiate-game [index]",
		Short: "shows a initiateGame",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			argIndex := args[0]

			params := &types.QueryGetInitiateGameRequest{
				Index: argIndex,
			}

			res, err := queryClient.InitiateGame(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/rules"
)

//
func (storedGame StoredGame) GetPlayerXAddress() (black sdk.AccAddress, err error) {
	playerX, errPlayerX := sdk.AccAddressFromBech32(storedGame.PlayerX)
	return playerX, sdkerrors.Wrapf(errPlayerX, ErrInvalidPlayerX.Error(), storedGame.PlayerX)
}

func (storedGame StoredGame) GetPlayerOAddress() (red sdk.AccAddress, err error) {
	playerO, errPlayerO := sdk.AccAddressFromBech32(storedGame.PlayerO)
	return playerO, sdkerrors.Wrapf(errPlayerO, ErrInvalidPlayerO.Error(), storedGame.PlayerO)
}

func (storedGame StoredGame) ParseGame() (game *rules.Game, err error) {
	board, errBoard := rules.DeSerialize([]byte(storedGame.Board))
	if errBoard != nil {
		return nil, sdkerrors.Wrapf(errBoard, ErrGameNotParseable.Error())
	}
	return board, nil
}

func (storedGame StoredGame) Validate() (err error) {
	_, err = storedGame.GetPlayerXAddress()
	if err != nil {
		return err
	}
	_, err = storedGame.GetPlayerOAddress()
	if err != nil {
		return err
	}
	_, err = storedGame.ParseGame()
	return err
}

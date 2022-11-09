package types

import (
	"errors"
	"strings"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/rules"
)

//
func (storedGame StoredGame) GetPlayerXAddress() (playerX sdk.AccAddress, err error) {
	playerX, errPlayerX := sdk.AccAddressFromBech32(storedGame.PlayerX)
	return playerX, sdkerrors.Wrapf(errPlayerX, ErrInvalidPlayerX.Error(), storedGame.PlayerX)
}

func (storedGame StoredGame) GetPlayerOAddress() (playerO sdk.AccAddress, err error) {
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

func (completedGame CompletedGame) GetPlayerXAddress() (playerX sdk.AccAddress, err error) {
	playerX, errPlayerX := sdk.AccAddressFromBech32(completedGame.PlayerX)
	return playerX, sdkerrors.Wrapf(errPlayerX, ErrInvalidPlayerX.Error(), completedGame.PlayerX)
}

func (completedGame CompletedGame) GetPlayerOAddress() (playerO sdk.AccAddress, err error) {
	playerO, errPlayerO := sdk.AccAddressFromBech32(completedGame.PlayerO)
	return playerO, sdkerrors.Wrapf(errPlayerO, ErrInvalidPlayerO.Error(), completedGame.PlayerO)
}

func (completedGame CompletedGame) GetWinnerAddress() (red sdk.AccAddress, err error) {
	winner, errPlayerO := sdk.AccAddressFromBech32(completedGame.Winner)
	return winner, sdkerrors.Wrapf(errPlayerO, ErrInvalidPlayerO.Error(), completedGame.Winner)
}

func (completedGame CompletedGame) ParseGame() (game *rules.Game, err error) {
	board, errBoard := rules.DeSerialize([]byte(completedGame.Board))
	if errBoard != nil {
		return nil, sdkerrors.Wrapf(errBoard, ErrGameNotParseable.Error())
	}
	return board, nil
}

func (completedGame CompletedGame) Validate() (err error) {
	_, err = completedGame.GetPlayerXAddress()
	if err != nil {
		return err
	}
	_, err = completedGame.GetPlayerOAddress()
	if err != nil {
		return err
	}
	_, err = completedGame.GetWinnerAddress()
	if err != nil {
		return err
	}
	if strings.Compare(completedGame.PlayerX, completedGame.Winner) != 0 && strings.Compare(completedGame.PlayerO, completedGame.Winner) != 0 {
		return errors.New("Invalid winner")
	}
	_, err = completedGame.ParseGame()
	return err
}

func (initiateGame InitiateGame) GetCreatorAddress() (creator sdk.AccAddress, err error) {
	creator, errCreator := sdk.AccAddressFromBech32(initiateGame.Creator)
	return creator, sdkerrors.Wrapf(errCreator, ErrInvalidCreator.Error(), initiateGame.Creator)
}

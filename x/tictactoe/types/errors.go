package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/tictactoe module sentinel errors
var (
	ErrInvalidPlayerX   = sdkerrors.Register(ModuleName, 1100, "player X address is invalid: %s")
	ErrInvalidPlayerO   = sdkerrors.Register(ModuleName, 1101, "player O address is invalid: %s")
	ErrGameNotParseable = sdkerrors.Register(ModuleName, 1102, "game cannot be parsed")
	ErrInvalidCreator   = sdkerrors.Register(ModuleName, 1104, "initiator address is invalid: %s")
	ErrGameNotFound     = sdkerrors.Register(ModuleName, 1105, "bad game index")
    ErrCreatorNotPlayer = sdkerrors.Register(ModuleName, 1106, "message creator is not a player")
    ErrWrongClaim       = sdkerrors.Register(ModuleName, 1107, "wrong claim")
)

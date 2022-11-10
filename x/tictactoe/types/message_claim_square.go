package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgClaimSquare = "claim_square"

var _ sdk.Msg = &MsgClaimSquare{}

func NewMsgClaimSquare(creator string, gameIndex string, row uint64, col uint64) *MsgClaimSquare {
	return &MsgClaimSquare{
		Creator:   creator,
		GameIndex: gameIndex,
		Row:       row,
		Col:       col,
	}
}

func (msg *MsgClaimSquare) Route() string {
	return RouterKey
}

func (msg *MsgClaimSquare) Type() string {
	return TypeMsgClaimSquare
}

func (msg *MsgClaimSquare) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgClaimSquare) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgClaimSquare) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

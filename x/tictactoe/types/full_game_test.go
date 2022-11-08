package types_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/rules"
	"github.com/sudhakar-mamillapalli/tictactoe/x/tictactoe/types"
)

const (
	alice = "cosmos1jmjfq0tplp9tmx4v9uemw72y4d2wa5nr3xn9d3"
	bob   = "cosmos1xyxs3skf3f4jfqeuv89yyaqvjc6lffavxqhc8g"
	carol = "cosmos1e0w5t53nrq7p66fye6c8p0ynyhf6y24l4yuxd7"
)

func GetStoredGame1() types.StoredGame {
	return types.StoredGame{
		PlayerX: alice,
		PlayerO: bob,
		Index:   "1",
		Board:   string(rules.NewGame().Serialize()),
	}
}

func TestCanGetAddressPlayerX(t *testing.T) {
	aliceAddress, err1 := sdk.AccAddressFromBech32(alice)
	playerX, err2 := GetStoredGame1().GetPlayerXAddress()
	require.Equal(t, aliceAddress, playerX)
	require.Nil(t, err2)
	require.Nil(t, err1)
}

func TestGetAddressWrongPlayerX(t *testing.T) {
	storedGame := GetStoredGame1()
	storedGame.PlayerX = "cosmos1jmjfq0tplp9tmx4v9uemw72y4d2wa5nr3xn9d4" // Bad last digit
	playerX, err := storedGame.GetPlayerXAddress()
	require.Nil(t, playerX)
	require.EqualError(t,
		err,
		"player X address is invalid: cosmos1jmjfq0tplp9tmx4v9uemw72y4d2wa5nr3xn9d4: decoding bech32 failed: invalid checksum (expected 3xn9d3 got 3xn9d4)")
	require.EqualError(t, storedGame.Validate(), err.Error())
}

func TestCanGetAddressPlayerO(t *testing.T) {
	bobAddress, err1 := sdk.AccAddressFromBech32(bob)
	red, err2 := GetStoredGame1().GetPlayerOAddress()
	require.Equal(t, bobAddress, red)
	require.Nil(t, err1)
	require.Nil(t, err2)
}

func TestGetAddressWrongPlayerO(t *testing.T) {
	storedGame := GetStoredGame1()
	storedGame.PlayerO = "cosmos1xyxs3skf3f4jfqeuv89yyaqvjc6lffavxqhc8h" // Bad last digit
	red, err := storedGame.GetPlayerOAddress()
	require.Nil(t, red)
	require.EqualError(t,
		err,
		"player O address is invalid: cosmos1xyxs3skf3f4jfqeuv89yyaqvjc6lffavxqhc8h: decoding bech32 failed: invalid checksum (expected xqhc8g got xqhc8h)")
	require.EqualError(t, storedGame.Validate(), err.Error())
}

func TestParseGameCorrect(t *testing.T) {
	game, err := GetStoredGame1().ParseGame()
	require.EqualValues(t, rules.NewGame(), game)
	require.Nil(t, err)
}

func TestParseGameWrongPlayer(t *testing.T) {
	storedGame := GetStoredGame1()
	// 0x3 is invalid player.
	sb := []byte(storedGame.Board)
	// byte 3 has last row of the board in the serialized game
	sb[3] |= 0x3
	storedGame.Board = string(sb)
	game, err := storedGame.ParseGame()
	require.Nil(t, game)
	require.EqualError(t, err, "game cannot be parsed: Cannot deserialize game.")
	require.EqualError(t, storedGame.Validate(), err.Error())
}

func TestParseGameWrongTurn(t *testing.T) {
	storedGame := GetStoredGame1()
	// turn stored at byte 0, in 4 byte serialized game structure
	// Valid players are only 1 and 2 (O or X)
	sb := []byte(storedGame.Board)
	sb[0] = 0
	storedGame.Board = string(sb)
	game, err := storedGame.ParseGame()
	require.Nil(t, game)
	require.EqualError(t, err, "game cannot be parsed: Cannot deserialize game.")
	require.EqualError(t, storedGame.Validate(), err.Error())
}

func TestGameValidateOk(t *testing.T) {
	storedGame := GetStoredGame1()
	require.NoError(t, storedGame.Validate())
}

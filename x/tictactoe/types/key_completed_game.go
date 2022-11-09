package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// CompletedGameKeyPrefix is the prefix to retrieve all CompletedGame
	CompletedGameKeyPrefix = "CompletedGame/value/"
)

// CompletedGameKey returns the store key to retrieve a CompletedGame from the index fields
func CompletedGameKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}

package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// InitiateGameKeyPrefix is the prefix to retrieve all InitiateGame
	InitiateGameKeyPrefix = "InitiateGame/value/"
)

// InitiateGameKey returns the store key to retrieve a InitiateGame from the index fields
func InitiateGameKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}

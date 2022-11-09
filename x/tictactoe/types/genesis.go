package types

import (
	"fmt"
)

// DefaultIndex is the default global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		SystemInfo: SystemInfo{
			NextId: uint64(DefaultIndex),
		},
		StoredGameList:    []StoredGame{},
		CompletedGameList: []CompletedGame{},
		InitiateGameList:  []InitiateGame{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated index in storedGame
	storedGameIndexMap := make(map[string]struct{})

	for _, elem := range gs.StoredGameList {
		index := string(StoredGameKey(elem.Index))
		if _, ok := storedGameIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for storedGame")
		}
		storedGameIndexMap[index] = struct{}{}
	}
	// Check for duplicated index in completedGame
	completedGameIndexMap := make(map[string]struct{})

	for _, elem := range gs.CompletedGameList {
		index := string(CompletedGameKey(elem.Index))
		if _, ok := completedGameIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for completedGame")
		}
		completedGameIndexMap[index] = struct{}{}
	}
	// Check for duplicated index in initiateGame
	initiateGameIndexMap := make(map[string]struct{})

	for _, elem := range gs.InitiateGameList {
		index := string(InitiateGameKey(elem.Index))
		if _, ok := initiateGameIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for initiateGame")
		}
		initiateGameIndexMap[index] = struct{}{}
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}

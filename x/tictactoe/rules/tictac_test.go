package rules

import "testing"


func TestNewGame(t *testing.T) {
    g := NewGame()
    if g.turn != playerX {
        t.Log("Wrong player turn")
        t.Fail()
    }
}



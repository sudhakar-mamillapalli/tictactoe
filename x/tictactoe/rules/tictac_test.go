package rules

import "testing"

func TestNewGame(t *testing.T) {
	g := NewGame()
	if g.turn != playerX {
		t.Fatal("Wrong player turn")
	}
}

func TestNewGameSerializeDeSerialize(t *testing.T) {
	// serialize/deserailize and check we get consistent game
	g := NewGame()
	sg := g.Serialize()
	dg, err := DeSerialize(sg)
	if err != nil {
		t.Fatal("Deserailization failure")
	}
	if *dg != *g {
		t.Fatalf("Inconsistency in serialize/deserialize. Expected %v Got %v ", *g, *dg)
	}
}

func TestPlayerMove(t *testing.T) {
	g := NewGame()
	err := g.OwnSquare(playerX, 0, 0)
	if err != nil {
		t.Fatalf("Valid player move resulted in error %v", err)
	}
	err = g.OwnSquare(playerO, 1, 0)
	if err != nil {
		t.Fatalf("Valid player move resulted in error %v %v", err, g)
	}
	// serialize/deserailize and check we get consistent game
	sg := g.Serialize()
	dg, err := DeSerialize(sg)
	if *dg != *g {
		t.Fatalf("Inconsistency in serialize/deserialize %x %v -> %v ", sg, *dg, *g)
	}
}

func TestWrongTurn(t *testing.T) {
	g := NewGame()
	err := g.OwnSquare(playerX, 0, 0)
	if err != nil {
		t.Fatalf("Valid player move resulted in error %v", err)
	}
	err = g.OwnSquare(playerX, 0, 1)
	if err == nil {
		// should fail since it player O's turn now
		t.Fatalf("Move by wrong player suceeded ")
	}
}

func TestBadMove(t *testing.T) {
	// try to own a invalid square
	g := NewGame()
	err := g.OwnSquare(playerX, 5, 5)
	if err == nil {
		t.Fatalf("Bad move succeeded")
	}
}

func TestWinner(t *testing.T) {
	g := NewGame()
	g.OwnSquare(playerX, 0, 0)
	g.OwnSquare(playerO, 1, 0)
	g.OwnSquare(playerX, 0, 2)
	g.OwnSquare(playerO, 1, 1)
	g.OwnSquare(playerX, 2, 0)
	if g.winner != playerU {
		t.Fatalf("Wrong winner %v", g)
	}
	g.OwnSquare(playerO, 1, 2)
	// playerO should have won now
	if g.winner != playerO {
		t.Fatalf("Wrong winner %v", g)
	}
	// serialize/deserailize
	sg := g.Serialize()
	dg, _ := DeSerialize(sg)
	if *dg != *g {
		t.Fatalf("Inconsistency in serialize/deserialize. Expected: %v Got: %v ", *g, *dg)
	}
}

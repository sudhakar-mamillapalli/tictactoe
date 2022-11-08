package rules

import "fmt"
import "errors"
import "strings"
import "bytes"

type Player byte

const (
	playerU Player = iota // used to demarcate no player claimed a square
	playerX
	playerO
)

func (p Player) String() string {

	switch p {
	case playerX:
		return "X"

	case playerO:
		return "O"

	case playerU:
		return "U"

	default:
		return "Bad Player"
	}
}

type Game struct {
	board  [3][3]Player
	turn   Player
	winner Player
}

func (g Game) String() string {

	var b strings.Builder

	b.WriteString(fmt.Sprintf("Turn: %v\n", g.turn))
	b.WriteString(fmt.Sprintf("Board: \n"))
	for i := 0; i < len(g.board[0]); i++ {
		for j := 0; j < len(g.board[0]); j++ {
			b.WriteString(fmt.Sprintf("%v ", g.board[i][j]))
		}
		b.WriteString(fmt.Sprintf("\n"))
	}
	return b.String()
}

func NewGame() *Game {
	g := Game{}
	g.turn = playerX // playerX has first move by default
	return &g
}

func (g *Game) Serialize() []byte {

	var b bytes.Buffer

	// store turn in first byte and the board itself in next three bytes
	if g.turn == playerX {
		b.WriteByte(1)
	} else {
		b.WriteByte(0)
	}
	for i := 0; i < len(g.board[0]); i++ {
		var x byte
		for j := 0; j < len(g.board[0]); j++ {
			// 2 bits store if box in board is owned by X ('b01),
			// O ('bl0') or not claimed by anyone U ('b00')
			x |= (byte(g.board[i][j]) << (j * 2))
		}
		b.WriteByte(x)
	}
	return b.Bytes()
}

func DeSerialize(buf []byte) (*Game, error) {

	g := NewGame()

	b := bytes.NewBuffer(buf)
	x, _ := b.ReadByte()
    turn := Player(x)
	if turn != playerX && turn != playerO {
		return nil, errors.New("Cannot deserialize game.")
	}
	g.turn = turn

	for i := 0; i < len(g.board[0]); i++ {
		x, _ = b.ReadByte()
		for j := 0; j < len(g.board[0]); j++ {
            player := Player((x >> (2*j)) & 0x3)
			if player != playerX && player != playerO && player != playerU {
				return nil, errors.New("Cannot deserialize game.")
			}
			g.board[i][j] = player
		}
	}
	g.winner = g.checkWinner()
	return g, nil
}

func (g *Game) OwnSquare(p Player, x int, y int) error {

	if g.winner != playerU {
		// already some player won the game.
		return errors.New("Game over  ")
	}

	if p != playerX && p != playerO {
		return errors.New("Bad Player")
	}

	if g.turn != p {
		return errors.New("Not your turn ")
	}

	if x < 0 || y < 0 || x > len(g.board[0]) || y > len(g.board[0]) {
		return errors.New("Bad x or y ")
	}

	if g.board[x][y] != playerU {
		return errors.New("Already claimed square ")
	}

	g.board[x][y] = p
	g.winner = g.checkWinner()
	if g.turn == playerX {
		g.turn = playerO
	} else {
		g.turn = playerX
	}
	return nil
}

func (g *Game) checkWinner() Player {

	b := &g.board

	// check rows for winner
	for i := 0; i < len(b[0]); i++ {
		if b[i][0] != playerU && b[i][0] == b[i][1] && b[i][0] == b[i][2] {
			return b[i][0]
		}
	}
	// check columns
	for i := 0; i < len(b[0]); i++ {
		if b[0][i] != playerU && b[0][i] == b[1][i] && b[0][i] == b[2][i] {
			return b[0][i]
		}
	}
	// check diagonals
	if b[0][0] != playerU && b[0][0] == b[1][1] && b[0][0] == b[2][2] {
		return b[0][0]
	}
	if b[0][2] != playerU && b[0][2] == b[1][1] && b[0][0] == b[2][0] {
		return b[0][0]
	}
	return playerU
}

/*
func main() {
	g := NewGame()
	fmt.Println(g)
	err := g.OwnSquare(playerX, 5, 7)
	if err != nil {
		log.Printf("%v ", err)
	}
	err = g.OwnSquare(playerX, 0, 0)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(g)
	x := g.Serialize()
	fmt.Printf("%v \n", DeSerialize(x))
}
*/

package rules

import "fmt"
import "errors"
import "log"
import "strings"
import "bytes"

type Player uint

const (
    playerU Player = iota // unknown player
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

type game struct {
    board [3][3]Player
    turn Player
    winner Player
}

func (g game) String() string {

    var b strings.Builder

    // Write turn first
    b.WriteString(fmt.Sprintf("%v\n", g.turn))
    for i := 0 ; i < len(g.board[0]); i++ {
        for j := 0 ; j < len(g.board[0]); j++ {
            b.WriteString(fmt.Sprintf("%v", g.board[i][j]))
        }
        b.WriteString(fmt.Sprintf("\n"))
    }
    return b.String()
}

func NewGame() *game {
    g := game{}
    g.turn = playerX
    return &g
}

func (g *game) Serialize() []byte {

    var b bytes.Buffer

    // turn in first byte and the board itself in next three bytes
    if g.turn == playerX {
        b.WriteByte(1)
    } else {
        b.WriteByte(0)
    }
    for i := 0 ; i < len(g.board[0]); i++ {
        var x byte
        for j := 0 ; j < len(g.board[0]); j++ {
            if g.board[i][j] == playerX {
                x |= (1 << j)
            }
        }
        b.WriteByte(x)
    }
    return b.Bytes()
}

func DeSerialize(buf []byte) *game {

    g := NewGame()

    b := bytes.NewBuffer(buf)
    x, _ := b.ReadByte()
    if x == 1 {
        g.turn = playerX
    } else {
        g.turn = playerO
    }
    for i := 0 ; i < len(g.board[0]); i++ {
        x, _  = b.ReadByte()
        for j := 0 ; j < len(g.board[0]); j++ {
            if x & (0x1 << j) != 0 {
                g.board[i][j] = playerX
            } else {
                g.board[i][j] = playerO
            }
        }
    }
    fmt.Println(g)
    return g
}

func (g *game) OwnSquare(p Player, x int, y int) error {

    if g.winner != playerU {
        // already some player won the game.
        return errors.New("Game over  ")
    }

    if g.turn != p {
        return errors.New("Not your turn ")
    }

    if x > len(g.board[0]) || y > len(g.board[0]) {
        return errors.New("Bad x or y ")

    }

    if p != playerX && p != playerU {
        return errors.New("Bad Player")
    }

    if g.board[x][y] != playerU {
        return errors.New("Already used up square ")
    }

    g.board[x][y] = p
    g.winner = g.checkWinner()
    if g.turn == playerX  {
        g.turn = playerO
    } else {
        g.turn = playerX
    }
    return nil
}

func (g *game) checkWinner() Player {

    b := &g.board

    // check rows for winner
    for i := 0 ; i < len(b[0]); i++ {
        if b[i][0] != playerU && b[i][0] == b[i][1] && b[i][0] == b[i][2] {
            return b[i][0]
        }
    }
    // check columns
    for i := 0 ; i < len(b[0]); i++ {
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



func main () {
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
# tictactoe
**tictactoe** is a blockchain built using Cosmos SDK and Tendermint and created with [Ignite CLI](https://ignite.com/cli).

 Implement a Cosmos module for a tic-tac-toe game.

## Rules for tic-tac-toe:

* All state of the game should live on-chain. State includes open games, games currently in progress and completed games.

* Any user can submit a transaction to the network to invite others to start a game (i.e. create an open game).

* Other users may submit transactions to accept invitations. When an invitation is accepted, the game starts.

* The roles of “X” and “O” are decided as follows. The user's public keys are concatenated and the result is hashed. If the first bit of the output is 0, then the game's initiator (whoever posted the invitation) plays "O" and the second player plays "X" and vice versa. “X” has the first move.

* Both users submit transactions to the network to make their moves until the game is complete.

* The game needs to support multiple concurrent games sessions/players.

## Basic Design

Based on https://tutorials.cosmos.network/hands-on-exercise/1-ignite-cli/.

Games come into existence and are played in three steps.

1. create-game - This creates a new name which is assigned a unique integer ID.
   The creator of this transaction puts his game on the blockchain and waits
   for other account holders to accept the challenge. The game is stored in
   initiated game list on the blockchain.

2. start-game - Next account holders can looks up created games, and then can
   start them using the games ID.  The account which created the game and the account
   which started the game become the two players.  The game is also moved to
   stored-game list on the blockchain.

3. claim-square - The two players above each in turn can claim a square using this transcation.
   Once one of the player wins the game it is  moved to the completed games list on the blockchain

## Usage

### Relevant versions:

OS: Fedora 36

Arch: amd64

SDK version: v0.46.3

Ignite CLI version: v0.25.1

### Build

>git clone https://github.com/sudhakar-mamillapalli/tictactoe.git tictactoe
>
>cd tictactoe
>
>ignite chain serve

### Sample commands to create and play games on the blockchain

0. Get hold of $alice and bob's addresses

> export alice=$(tictactoed keys show alice -a)
>
> export bob=$(tictactoed keys show bob -a)


1. Create two games. One by alice and one by bob

>tictactoed tx tictactoe create-game --from $alice
>
>tictactoed tx tictactoe create-game --from $bob


2. Check they show up in initiated games list

> tictactoed query tictactoe list-initiate-game


3. Bob accepts challenge on game 1 and starts it

> tictactoed tx tictactoe start-game 1 --from $bob

4. Game 1 now moves to stored game list

> tictactoed query tictactoe list-stored-game

5. Make moves till Bob gets to be the winner

> tictactoed tx tictactoe claim-square 1 0 0 --from $alice

> tictactoed tx tictactoe claim-square 1 1 0 --from $bob

> tictactoed tx tictactoe claim-square 1 0 2 --from $alice

> tictactoed tx tictactoe claim-square 1 1 1 --from $bob

> tictactoed tx tictactoe claim-square 1 2 0 --from $alice

> tictactoed tx tictactoe claim-square 1 1 2 --from $bob


5.  Check that completed game (1) is in completed games list and game 2 is still in initiated game list

> tictactoed query tictactoe list-completed-game

> tictactoed query tictactoe list-initiate-game



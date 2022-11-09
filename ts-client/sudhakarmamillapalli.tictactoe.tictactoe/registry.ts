import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateGame } from "./types/tictactoe/tictactoe/tx";
import { MsgStartGame } from "./types/tictactoe/tictactoe/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/sudhakarmamillapalli.tictactoe.tictactoe.MsgCreateGame", MsgCreateGame],
    ["/sudhakarmamillapalli.tictactoe.tictactoe.MsgStartGame", MsgStartGame],
    
];

export { msgTypes }
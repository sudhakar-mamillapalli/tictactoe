import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgStartGame } from "./types/tictactoe/tictactoe/tx";
import { MsgClaimSquare } from "./types/tictactoe/tictactoe/tx";
import { MsgCreateGame } from "./types/tictactoe/tictactoe/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/sudhakarmamillapalli.tictactoe.tictactoe.MsgStartGame", MsgStartGame],
    ["/sudhakarmamillapalli.tictactoe.tictactoe.MsgClaimSquare", MsgClaimSquare],
    ["/sudhakarmamillapalli.tictactoe.tictactoe.MsgCreateGame", MsgCreateGame],
    
];

export { msgTypes }
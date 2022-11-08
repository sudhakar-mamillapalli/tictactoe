/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "sudhakarmamillapalli.tictactoe.tictactoe";

export interface StoredGame {
  index: string;
  board: string;
  playerX: string;
  playerO: string;
}

function createBaseStoredGame(): StoredGame {
  return { index: "", board: "", playerX: "", playerO: "" };
}

export const StoredGame = {
  encode(message: StoredGame, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    if (message.board !== "") {
      writer.uint32(18).string(message.board);
    }
    if (message.playerX !== "") {
      writer.uint32(26).string(message.playerX);
    }
    if (message.playerO !== "") {
      writer.uint32(34).string(message.playerO);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoredGame {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoredGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        case 2:
          message.board = reader.string();
          break;
        case 3:
          message.playerX = reader.string();
          break;
        case 4:
          message.playerO = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StoredGame {
    return {
      index: isSet(object.index) ? String(object.index) : "",
      board: isSet(object.board) ? String(object.board) : "",
      playerX: isSet(object.playerX) ? String(object.playerX) : "",
      playerO: isSet(object.playerO) ? String(object.playerO) : "",
    };
  },

  toJSON(message: StoredGame): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.board !== undefined && (obj.board = message.board);
    message.playerX !== undefined && (obj.playerX = message.playerX);
    message.playerO !== undefined && (obj.playerO = message.playerO);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoredGame>, I>>(object: I): StoredGame {
    const message = createBaseStoredGame();
    message.index = object.index ?? "";
    message.board = object.board ?? "";
    message.playerX = object.playerX ?? "";
    message.playerO = object.playerO ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

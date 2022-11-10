/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "sudhakarmamillapalli.tictactoe.tictactoe";

export interface MsgCreateGame {
  creator: string;
}

export interface MsgCreateGameResponse {
  gameIndex: string;
}

export interface MsgStartGame {
  creator: string;
  gameIndex: string;
}

export interface MsgStartGameResponse {
  gameIndex: string;
}

export interface MsgClaimSquare {
  creator: string;
  gameIndex: string;
  row: number;
  col: number;
}

export interface MsgClaimSquareResponse {
  winner: string;
}

function createBaseMsgCreateGame(): MsgCreateGame {
  return { creator: "" };
}

export const MsgCreateGame = {
  encode(message: MsgCreateGame, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGame {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGame {
    return { creator: isSet(object.creator) ? String(object.creator) : "" };
  },

  toJSON(message: MsgCreateGame): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateGame>, I>>(object: I): MsgCreateGame {
    const message = createBaseMsgCreateGame();
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseMsgCreateGameResponse(): MsgCreateGameResponse {
  return { gameIndex: "" };
}

export const MsgCreateGameResponse = {
  encode(message: MsgCreateGameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameIndex !== "") {
      writer.uint32(10).string(message.gameIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gameIndex = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGameResponse {
    return { gameIndex: isSet(object.gameIndex) ? String(object.gameIndex) : "" };
  },

  toJSON(message: MsgCreateGameResponse): unknown {
    const obj: any = {};
    message.gameIndex !== undefined && (obj.gameIndex = message.gameIndex);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateGameResponse>, I>>(object: I): MsgCreateGameResponse {
    const message = createBaseMsgCreateGameResponse();
    message.gameIndex = object.gameIndex ?? "";
    return message;
  },
};

function createBaseMsgStartGame(): MsgStartGame {
  return { creator: "", gameIndex: "" };
}

export const MsgStartGame = {
  encode(message: MsgStartGame, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.gameIndex !== "") {
      writer.uint32(18).string(message.gameIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStartGame {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStartGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.gameIndex = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStartGame {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      gameIndex: isSet(object.gameIndex) ? String(object.gameIndex) : "",
    };
  },

  toJSON(message: MsgStartGame): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.gameIndex !== undefined && (obj.gameIndex = message.gameIndex);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStartGame>, I>>(object: I): MsgStartGame {
    const message = createBaseMsgStartGame();
    message.creator = object.creator ?? "";
    message.gameIndex = object.gameIndex ?? "";
    return message;
  },
};

function createBaseMsgStartGameResponse(): MsgStartGameResponse {
  return { gameIndex: "" };
}

export const MsgStartGameResponse = {
  encode(message: MsgStartGameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameIndex !== "") {
      writer.uint32(10).string(message.gameIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStartGameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStartGameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gameIndex = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStartGameResponse {
    return { gameIndex: isSet(object.gameIndex) ? String(object.gameIndex) : "" };
  },

  toJSON(message: MsgStartGameResponse): unknown {
    const obj: any = {};
    message.gameIndex !== undefined && (obj.gameIndex = message.gameIndex);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStartGameResponse>, I>>(object: I): MsgStartGameResponse {
    const message = createBaseMsgStartGameResponse();
    message.gameIndex = object.gameIndex ?? "";
    return message;
  },
};

function createBaseMsgClaimSquare(): MsgClaimSquare {
  return { creator: "", gameIndex: "", row: 0, col: 0 };
}

export const MsgClaimSquare = {
  encode(message: MsgClaimSquare, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.gameIndex !== "") {
      writer.uint32(18).string(message.gameIndex);
    }
    if (message.row !== 0) {
      writer.uint32(24).uint64(message.row);
    }
    if (message.col !== 0) {
      writer.uint32(32).uint64(message.col);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimSquare {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimSquare();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.gameIndex = reader.string();
          break;
        case 3:
          message.row = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.col = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimSquare {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      gameIndex: isSet(object.gameIndex) ? String(object.gameIndex) : "",
      row: isSet(object.row) ? Number(object.row) : 0,
      col: isSet(object.col) ? Number(object.col) : 0,
    };
  },

  toJSON(message: MsgClaimSquare): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.gameIndex !== undefined && (obj.gameIndex = message.gameIndex);
    message.row !== undefined && (obj.row = Math.round(message.row));
    message.col !== undefined && (obj.col = Math.round(message.col));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimSquare>, I>>(object: I): MsgClaimSquare {
    const message = createBaseMsgClaimSquare();
    message.creator = object.creator ?? "";
    message.gameIndex = object.gameIndex ?? "";
    message.row = object.row ?? 0;
    message.col = object.col ?? 0;
    return message;
  },
};

function createBaseMsgClaimSquareResponse(): MsgClaimSquareResponse {
  return { winner: "" };
}

export const MsgClaimSquareResponse = {
  encode(message: MsgClaimSquareResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.winner !== "") {
      writer.uint32(10).string(message.winner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimSquareResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimSquareResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.winner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimSquareResponse {
    return { winner: isSet(object.winner) ? String(object.winner) : "" };
  },

  toJSON(message: MsgClaimSquareResponse): unknown {
    const obj: any = {};
    message.winner !== undefined && (obj.winner = message.winner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgClaimSquareResponse>, I>>(object: I): MsgClaimSquareResponse {
    const message = createBaseMsgClaimSquareResponse();
    message.winner = object.winner ?? "";
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateGame(request: MsgCreateGame): Promise<MsgCreateGameResponse>;
  StartGame(request: MsgStartGame): Promise<MsgStartGameResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  ClaimSquare(request: MsgClaimSquare): Promise<MsgClaimSquareResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateGame = this.CreateGame.bind(this);
    this.StartGame = this.StartGame.bind(this);
    this.ClaimSquare = this.ClaimSquare.bind(this);
  }
  CreateGame(request: MsgCreateGame): Promise<MsgCreateGameResponse> {
    const data = MsgCreateGame.encode(request).finish();
    const promise = this.rpc.request("sudhakarmamillapalli.tictactoe.tictactoe.Msg", "CreateGame", data);
    return promise.then((data) => MsgCreateGameResponse.decode(new _m0.Reader(data)));
  }

  StartGame(request: MsgStartGame): Promise<MsgStartGameResponse> {
    const data = MsgStartGame.encode(request).finish();
    const promise = this.rpc.request("sudhakarmamillapalli.tictactoe.tictactoe.Msg", "StartGame", data);
    return promise.then((data) => MsgStartGameResponse.decode(new _m0.Reader(data)));
  }

  ClaimSquare(request: MsgClaimSquare): Promise<MsgClaimSquareResponse> {
    const data = MsgClaimSquare.encode(request).finish();
    const promise = this.rpc.request("sudhakarmamillapalli.tictactoe.tictactoe.Msg", "ClaimSquare", data);
    return promise.then((data) => MsgClaimSquareResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

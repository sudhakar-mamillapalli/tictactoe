/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { CompletedGame } from "./completed_game";
import { InitiateGame } from "./initiate_game";
import { Params } from "./params";
import { StoredGame } from "./stored_game";
import { SystemInfo } from "./system_info";

export const protobufPackage = "sudhakarmamillapalli.tictactoe.tictactoe";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetSystemInfoRequest {
}

export interface QueryGetSystemInfoResponse {
  SystemInfo: SystemInfo | undefined;
}

export interface QueryGetStoredGameRequest {
  index: string;
}

export interface QueryGetStoredGameResponse {
  storedGame: StoredGame | undefined;
}

export interface QueryAllStoredGameRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllStoredGameResponse {
  storedGame: StoredGame[];
  pagination: PageResponse | undefined;
}

export interface QueryGetCompletedGameRequest {
  index: string;
}

export interface QueryGetCompletedGameResponse {
  completedGame: CompletedGame | undefined;
}

export interface QueryAllCompletedGameRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllCompletedGameResponse {
  completedGame: CompletedGame[];
  pagination: PageResponse | undefined;
}

export interface QueryGetInitiateGameRequest {
  index: string;
}

export interface QueryGetInitiateGameResponse {
  initiateGame: InitiateGame | undefined;
}

export interface QueryAllInitiateGameRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllInitiateGameResponse {
  initiateGame: InitiateGame[];
  pagination: PageResponse | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryGetSystemInfoRequest(): QueryGetSystemInfoRequest {
  return {};
}

export const QueryGetSystemInfoRequest = {
  encode(_: QueryGetSystemInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSystemInfoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSystemInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryGetSystemInfoRequest {
    return {};
  },

  toJSON(_: QueryGetSystemInfoRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetSystemInfoRequest>, I>>(_: I): QueryGetSystemInfoRequest {
    const message = createBaseQueryGetSystemInfoRequest();
    return message;
  },
};

function createBaseQueryGetSystemInfoResponse(): QueryGetSystemInfoResponse {
  return { SystemInfo: undefined };
}

export const QueryGetSystemInfoResponse = {
  encode(message: QueryGetSystemInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.SystemInfo !== undefined) {
      SystemInfo.encode(message.SystemInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSystemInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSystemInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.SystemInfo = SystemInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetSystemInfoResponse {
    return { SystemInfo: isSet(object.SystemInfo) ? SystemInfo.fromJSON(object.SystemInfo) : undefined };
  },

  toJSON(message: QueryGetSystemInfoResponse): unknown {
    const obj: any = {};
    message.SystemInfo !== undefined
      && (obj.SystemInfo = message.SystemInfo ? SystemInfo.toJSON(message.SystemInfo) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetSystemInfoResponse>, I>>(object: I): QueryGetSystemInfoResponse {
    const message = createBaseQueryGetSystemInfoResponse();
    message.SystemInfo = (object.SystemInfo !== undefined && object.SystemInfo !== null)
      ? SystemInfo.fromPartial(object.SystemInfo)
      : undefined;
    return message;
  },
};

function createBaseQueryGetStoredGameRequest(): QueryGetStoredGameRequest {
  return { index: "" };
}

export const QueryGetStoredGameRequest = {
  encode(message: QueryGetStoredGameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetStoredGameRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetStoredGameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetStoredGameRequest {
    return { index: isSet(object.index) ? String(object.index) : "" };
  },

  toJSON(message: QueryGetStoredGameRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetStoredGameRequest>, I>>(object: I): QueryGetStoredGameRequest {
    const message = createBaseQueryGetStoredGameRequest();
    message.index = object.index ?? "";
    return message;
  },
};

function createBaseQueryGetStoredGameResponse(): QueryGetStoredGameResponse {
  return { storedGame: undefined };
}

export const QueryGetStoredGameResponse = {
  encode(message: QueryGetStoredGameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.storedGame !== undefined) {
      StoredGame.encode(message.storedGame, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetStoredGameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetStoredGameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.storedGame = StoredGame.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetStoredGameResponse {
    return { storedGame: isSet(object.storedGame) ? StoredGame.fromJSON(object.storedGame) : undefined };
  },

  toJSON(message: QueryGetStoredGameResponse): unknown {
    const obj: any = {};
    message.storedGame !== undefined
      && (obj.storedGame = message.storedGame ? StoredGame.toJSON(message.storedGame) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetStoredGameResponse>, I>>(object: I): QueryGetStoredGameResponse {
    const message = createBaseQueryGetStoredGameResponse();
    message.storedGame = (object.storedGame !== undefined && object.storedGame !== null)
      ? StoredGame.fromPartial(object.storedGame)
      : undefined;
    return message;
  },
};

function createBaseQueryAllStoredGameRequest(): QueryAllStoredGameRequest {
  return { pagination: undefined };
}

export const QueryAllStoredGameRequest = {
  encode(message: QueryAllStoredGameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllStoredGameRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllStoredGameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllStoredGameRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllStoredGameRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllStoredGameRequest>, I>>(object: I): QueryAllStoredGameRequest {
    const message = createBaseQueryAllStoredGameRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllStoredGameResponse(): QueryAllStoredGameResponse {
  return { storedGame: [], pagination: undefined };
}

export const QueryAllStoredGameResponse = {
  encode(message: QueryAllStoredGameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.storedGame) {
      StoredGame.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllStoredGameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllStoredGameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.storedGame.push(StoredGame.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllStoredGameResponse {
    return {
      storedGame: Array.isArray(object?.storedGame) ? object.storedGame.map((e: any) => StoredGame.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllStoredGameResponse): unknown {
    const obj: any = {};
    if (message.storedGame) {
      obj.storedGame = message.storedGame.map((e) => e ? StoredGame.toJSON(e) : undefined);
    } else {
      obj.storedGame = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllStoredGameResponse>, I>>(object: I): QueryAllStoredGameResponse {
    const message = createBaseQueryAllStoredGameResponse();
    message.storedGame = object.storedGame?.map((e) => StoredGame.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetCompletedGameRequest(): QueryGetCompletedGameRequest {
  return { index: "" };
}

export const QueryGetCompletedGameRequest = {
  encode(message: QueryGetCompletedGameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetCompletedGameRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetCompletedGameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetCompletedGameRequest {
    return { index: isSet(object.index) ? String(object.index) : "" };
  },

  toJSON(message: QueryGetCompletedGameRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetCompletedGameRequest>, I>>(object: I): QueryGetCompletedGameRequest {
    const message = createBaseQueryGetCompletedGameRequest();
    message.index = object.index ?? "";
    return message;
  },
};

function createBaseQueryGetCompletedGameResponse(): QueryGetCompletedGameResponse {
  return { completedGame: undefined };
}

export const QueryGetCompletedGameResponse = {
  encode(message: QueryGetCompletedGameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.completedGame !== undefined) {
      CompletedGame.encode(message.completedGame, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetCompletedGameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetCompletedGameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.completedGame = CompletedGame.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetCompletedGameResponse {
    return { completedGame: isSet(object.completedGame) ? CompletedGame.fromJSON(object.completedGame) : undefined };
  },

  toJSON(message: QueryGetCompletedGameResponse): unknown {
    const obj: any = {};
    message.completedGame !== undefined
      && (obj.completedGame = message.completedGame ? CompletedGame.toJSON(message.completedGame) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetCompletedGameResponse>, I>>(
    object: I,
  ): QueryGetCompletedGameResponse {
    const message = createBaseQueryGetCompletedGameResponse();
    message.completedGame = (object.completedGame !== undefined && object.completedGame !== null)
      ? CompletedGame.fromPartial(object.completedGame)
      : undefined;
    return message;
  },
};

function createBaseQueryAllCompletedGameRequest(): QueryAllCompletedGameRequest {
  return { pagination: undefined };
}

export const QueryAllCompletedGameRequest = {
  encode(message: QueryAllCompletedGameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllCompletedGameRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllCompletedGameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllCompletedGameRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllCompletedGameRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllCompletedGameRequest>, I>>(object: I): QueryAllCompletedGameRequest {
    const message = createBaseQueryAllCompletedGameRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllCompletedGameResponse(): QueryAllCompletedGameResponse {
  return { completedGame: [], pagination: undefined };
}

export const QueryAllCompletedGameResponse = {
  encode(message: QueryAllCompletedGameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.completedGame) {
      CompletedGame.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllCompletedGameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllCompletedGameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.completedGame.push(CompletedGame.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllCompletedGameResponse {
    return {
      completedGame: Array.isArray(object?.completedGame)
        ? object.completedGame.map((e: any) => CompletedGame.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllCompletedGameResponse): unknown {
    const obj: any = {};
    if (message.completedGame) {
      obj.completedGame = message.completedGame.map((e) => e ? CompletedGame.toJSON(e) : undefined);
    } else {
      obj.completedGame = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllCompletedGameResponse>, I>>(
    object: I,
  ): QueryAllCompletedGameResponse {
    const message = createBaseQueryAllCompletedGameResponse();
    message.completedGame = object.completedGame?.map((e) => CompletedGame.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetInitiateGameRequest(): QueryGetInitiateGameRequest {
  return { index: "" };
}

export const QueryGetInitiateGameRequest = {
  encode(message: QueryGetInitiateGameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetInitiateGameRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetInitiateGameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetInitiateGameRequest {
    return { index: isSet(object.index) ? String(object.index) : "" };
  },

  toJSON(message: QueryGetInitiateGameRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetInitiateGameRequest>, I>>(object: I): QueryGetInitiateGameRequest {
    const message = createBaseQueryGetInitiateGameRequest();
    message.index = object.index ?? "";
    return message;
  },
};

function createBaseQueryGetInitiateGameResponse(): QueryGetInitiateGameResponse {
  return { initiateGame: undefined };
}

export const QueryGetInitiateGameResponse = {
  encode(message: QueryGetInitiateGameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.initiateGame !== undefined) {
      InitiateGame.encode(message.initiateGame, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetInitiateGameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetInitiateGameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.initiateGame = InitiateGame.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetInitiateGameResponse {
    return { initiateGame: isSet(object.initiateGame) ? InitiateGame.fromJSON(object.initiateGame) : undefined };
  },

  toJSON(message: QueryGetInitiateGameResponse): unknown {
    const obj: any = {};
    message.initiateGame !== undefined
      && (obj.initiateGame = message.initiateGame ? InitiateGame.toJSON(message.initiateGame) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetInitiateGameResponse>, I>>(object: I): QueryGetInitiateGameResponse {
    const message = createBaseQueryGetInitiateGameResponse();
    message.initiateGame = (object.initiateGame !== undefined && object.initiateGame !== null)
      ? InitiateGame.fromPartial(object.initiateGame)
      : undefined;
    return message;
  },
};

function createBaseQueryAllInitiateGameRequest(): QueryAllInitiateGameRequest {
  return { pagination: undefined };
}

export const QueryAllInitiateGameRequest = {
  encode(message: QueryAllInitiateGameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllInitiateGameRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllInitiateGameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllInitiateGameRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllInitiateGameRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllInitiateGameRequest>, I>>(object: I): QueryAllInitiateGameRequest {
    const message = createBaseQueryAllInitiateGameRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllInitiateGameResponse(): QueryAllInitiateGameResponse {
  return { initiateGame: [], pagination: undefined };
}

export const QueryAllInitiateGameResponse = {
  encode(message: QueryAllInitiateGameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.initiateGame) {
      InitiateGame.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllInitiateGameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllInitiateGameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.initiateGame.push(InitiateGame.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllInitiateGameResponse {
    return {
      initiateGame: Array.isArray(object?.initiateGame)
        ? object.initiateGame.map((e: any) => InitiateGame.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllInitiateGameResponse): unknown {
    const obj: any = {};
    if (message.initiateGame) {
      obj.initiateGame = message.initiateGame.map((e) => e ? InitiateGame.toJSON(e) : undefined);
    } else {
      obj.initiateGame = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllInitiateGameResponse>, I>>(object: I): QueryAllInitiateGameResponse {
    const message = createBaseQueryAllInitiateGameResponse();
    message.initiateGame = object.initiateGame?.map((e) => InitiateGame.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a SystemInfo by index. */
  SystemInfo(request: QueryGetSystemInfoRequest): Promise<QueryGetSystemInfoResponse>;
  /** Queries a StoredGame by index. */
  StoredGame(request: QueryGetStoredGameRequest): Promise<QueryGetStoredGameResponse>;
  /** Queries a list of StoredGame items. */
  StoredGameAll(request: QueryAllStoredGameRequest): Promise<QueryAllStoredGameResponse>;
  /** Queries a CompletedGame by index. */
  CompletedGame(request: QueryGetCompletedGameRequest): Promise<QueryGetCompletedGameResponse>;
  /** Queries a list of CompletedGame items. */
  CompletedGameAll(request: QueryAllCompletedGameRequest): Promise<QueryAllCompletedGameResponse>;
  /** Queries a InitiateGame by index. */
  InitiateGame(request: QueryGetInitiateGameRequest): Promise<QueryGetInitiateGameResponse>;
  /** Queries a list of InitiateGame items. */
  InitiateGameAll(request: QueryAllInitiateGameRequest): Promise<QueryAllInitiateGameResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.SystemInfo = this.SystemInfo.bind(this);
    this.StoredGame = this.StoredGame.bind(this);
    this.StoredGameAll = this.StoredGameAll.bind(this);
    this.CompletedGame = this.CompletedGame.bind(this);
    this.CompletedGameAll = this.CompletedGameAll.bind(this);
    this.InitiateGame = this.InitiateGame.bind(this);
    this.InitiateGameAll = this.InitiateGameAll.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("sudhakarmamillapalli.tictactoe.tictactoe.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  SystemInfo(request: QueryGetSystemInfoRequest): Promise<QueryGetSystemInfoResponse> {
    const data = QueryGetSystemInfoRequest.encode(request).finish();
    const promise = this.rpc.request("sudhakarmamillapalli.tictactoe.tictactoe.Query", "SystemInfo", data);
    return promise.then((data) => QueryGetSystemInfoResponse.decode(new _m0.Reader(data)));
  }

  StoredGame(request: QueryGetStoredGameRequest): Promise<QueryGetStoredGameResponse> {
    const data = QueryGetStoredGameRequest.encode(request).finish();
    const promise = this.rpc.request("sudhakarmamillapalli.tictactoe.tictactoe.Query", "StoredGame", data);
    return promise.then((data) => QueryGetStoredGameResponse.decode(new _m0.Reader(data)));
  }

  StoredGameAll(request: QueryAllStoredGameRequest): Promise<QueryAllStoredGameResponse> {
    const data = QueryAllStoredGameRequest.encode(request).finish();
    const promise = this.rpc.request("sudhakarmamillapalli.tictactoe.tictactoe.Query", "StoredGameAll", data);
    return promise.then((data) => QueryAllStoredGameResponse.decode(new _m0.Reader(data)));
  }

  CompletedGame(request: QueryGetCompletedGameRequest): Promise<QueryGetCompletedGameResponse> {
    const data = QueryGetCompletedGameRequest.encode(request).finish();
    const promise = this.rpc.request("sudhakarmamillapalli.tictactoe.tictactoe.Query", "CompletedGame", data);
    return promise.then((data) => QueryGetCompletedGameResponse.decode(new _m0.Reader(data)));
  }

  CompletedGameAll(request: QueryAllCompletedGameRequest): Promise<QueryAllCompletedGameResponse> {
    const data = QueryAllCompletedGameRequest.encode(request).finish();
    const promise = this.rpc.request("sudhakarmamillapalli.tictactoe.tictactoe.Query", "CompletedGameAll", data);
    return promise.then((data) => QueryAllCompletedGameResponse.decode(new _m0.Reader(data)));
  }

  InitiateGame(request: QueryGetInitiateGameRequest): Promise<QueryGetInitiateGameResponse> {
    const data = QueryGetInitiateGameRequest.encode(request).finish();
    const promise = this.rpc.request("sudhakarmamillapalli.tictactoe.tictactoe.Query", "InitiateGame", data);
    return promise.then((data) => QueryGetInitiateGameResponse.decode(new _m0.Reader(data)));
  }

  InitiateGameAll(request: QueryAllInitiateGameRequest): Promise<QueryAllInitiateGameResponse> {
    const data = QueryAllInitiateGameRequest.encode(request).finish();
    const promise = this.rpc.request("sudhakarmamillapalli.tictactoe.tictactoe.Query", "InitiateGameAll", data);
    return promise.then((data) => QueryAllInitiateGameResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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

// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: tictactoe/tictactoe/tx.proto

package types

import (
	context "context"
	fmt "fmt"
	grpc1 "github.com/gogo/protobuf/grpc"
	proto "github.com/gogo/protobuf/proto"
	grpc "google.golang.org/grpc"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

func init() { proto.RegisterFile("tictactoe/tictactoe/tx.proto", fileDescriptor_b88d547b90797a08) }

var fileDescriptor_b88d547b90797a08 = []byte{
	// 139 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x92, 0x29, 0xc9, 0x4c, 0x2e,
	0x49, 0x4c, 0x2e, 0xc9, 0x4f, 0xd5, 0x47, 0x62, 0x55, 0xe8, 0x15, 0x14, 0xe5, 0x97, 0xe4, 0x0b,
	0x69, 0x14, 0x97, 0xa6, 0x64, 0x24, 0x66, 0x27, 0x16, 0xe5, 0x26, 0xe6, 0x66, 0xe6, 0xe4, 0x24,
	0x16, 0x24, 0xe6, 0xe4, 0x64, 0xea, 0xc1, 0x15, 0x22, 0x58, 0x46, 0xac, 0x5c, 0xcc, 0xbe, 0xc5,
	0xe9, 0x4e, 0x61, 0x27, 0x1e, 0xc9, 0x31, 0x5e, 0x78, 0x24, 0xc7, 0xf8, 0xe0, 0x91, 0x1c, 0xe3,
	0x84, 0xc7, 0x72, 0x0c, 0x17, 0x1e, 0xcb, 0x31, 0xdc, 0x78, 0x2c, 0xc7, 0x10, 0x65, 0x93, 0x9e,
	0x59, 0x92, 0x51, 0x9a, 0xa4, 0x97, 0x9c, 0x9f, 0xab, 0x0f, 0x33, 0x55, 0x17, 0xd9, 0x58, 0x24,
	0xfb, 0x2b, 0x90, 0xdd, 0x52, 0x59, 0x90, 0x5a, 0x9c, 0xc4, 0x06, 0x76, 0x8f, 0x31, 0x20, 0x00,
	0x00, 0xff, 0xff, 0x82, 0x84, 0x3c, 0x38, 0xaf, 0x00, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// MsgClient is the client API for Msg service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type MsgClient interface {
}

type msgClient struct {
	cc grpc1.ClientConn
}

func NewMsgClient(cc grpc1.ClientConn) MsgClient {
	return &msgClient{cc}
}

// MsgServer is the server API for Msg service.
type MsgServer interface {
}

// UnimplementedMsgServer can be embedded to have forward compatible implementations.
type UnimplementedMsgServer struct {
}

func RegisterMsgServer(s grpc1.Server, srv MsgServer) {
	s.RegisterService(&_Msg_serviceDesc, srv)
}

var _Msg_serviceDesc = grpc.ServiceDesc{
	ServiceName: "sudhakarmamillapalli.tictactoe.tictactoe.Msg",
	HandlerType: (*MsgServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams:     []grpc.StreamDesc{},
	Metadata:    "tictactoe/tictactoe/tx.proto",
}

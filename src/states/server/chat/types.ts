import type { ProfileAllDataRow } from "../profile";
import type { Table } from "../server.types";

export type ChatRoomTable = Table["chatRooms"];
export type ChatRoomRow = ChatRoomTable["Row"];

export type ChatMessageTable = Table["chatMessages"];
export type ChatMessageRow = ChatMessageTable["Row"];
export type ChatMessageInsert = ChatMessageTable["Insert"];

export type ChatRequestMemberTable = Table["chatRequestMember"];
export type ChatRequestMemberRow = ChatRequestMemberTable["Row"];
export type ChatRequestMemberInsert = ChatRequestMemberTable["Insert"];

export type ChatRequestOwnerRow = Table["chatRequestOwner"]["Row"];
export type ChatRequestOwnerInsert = Table["chatRequestOwner"]["Insert"];

export interface ChatRoomAllData {
  id: number;
  members: ProfileAllDataRow[];
  messages: (Pick<ChatMessageRow, "id" | "message" | "createdAt" | "state" | "type"> & {
    sender: ProfileAllDataRow;
  })[];
}

export interface ChatRequestOwnerAllData extends Pick<ChatRequestOwnerRow, "id" | "state"> {
  requesterProfile: ProfileAllDataRow;
}

export interface ChatRequestMemberAllData extends Pick<ChatRequestMemberRow, "id" | "state"> {
  requesterProfile: ProfileAllDataRow;
}

export interface ChatMessageData {
  id: number;
  type: "MESSAGE" | "EMOJI" | "REPOSITORY" | "NOTICE";
  message: string;
  createdAt: Date;
  sender: ProfileAllDataRow;
}

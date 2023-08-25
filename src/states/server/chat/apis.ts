import { supabase } from "../config";
import { PROFILE_ALL_DATA_QUERY } from "../profile/constants";

export const insertChatRequest = async (chatRequest: {
  requesterId: string;
  receiverId: string;
}) => {
  const { error } = await supabase.from("chatRequest").insert(chatRequest);

  if (error) throw Error("채팅 요청에 실패하였습니다.");
};

export const selectChatRequests = async ({
  requesterId,
  state
}: {
  requesterId: string;
  state: "PENDING" | "GRANT" | "DENIED" | "ALL";
}) => {
  let query = supabase
    .from("chatRequest")
    .select(`id, state, receiverProfile:receiverId(${PROFILE_ALL_DATA_QUERY})`)
    .eq("requesterId", requesterId);

  if (state !== "ALL") {
    query = query.eq("state", state);
  }

  const { data, error } = await query;

  if (error) throw Error("채팅 요청 목록을 불러오는데 실패하였습니다.");

  return data;
};

export const insertChatMessage = async (message: {
  roomId: number;
  senderId: string;
  message: string;
}) => {
  const { error } = await supabase.from("chatMessages").insert(message);

  if (error) throw Error("메세지 전송에 실패하였습니다.");
};

export const selectChatMessages = async (roomId: number) => {
  const { data, error } = await supabase.from("chatMessages").select("*").eq("roomId", roomId);

  if (error) throw Error("메세지 목록을 불러오는데 실패하였습니다.");

  return data;
};
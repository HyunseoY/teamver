import router from "next/router";
import { routes } from "~/constants/routes";
import { useSelectChatRoomsQuery } from "~/states/server/chat";
import { useSelectProjectInvitesQuery } from "~/states/server/project";

export const useSelectChatRooms = (userId: string) => {
  const { data } = useSelectChatRoomsQuery(userId);
  const { data: invites } = useSelectProjectInvitesQuery(userId);

  const rooms = data?.map((room) => ({
    roomId: room.id,
    memberName: room.members[0]?.name || "",
    memberImageUrl: room.members[0]?.imageUrl || "",
    lastMessage: room.messages[0]?.message || ""
  }));

  const handleRoomClick = (roomId: number) => {
    router.push({
      pathname: routes.chatRoom(roomId)
    });
  };

  const handleRequestClick = () => {
    router.push({
      pathname: routes.chatRequest
    });
  };

  return { rooms, invites, handleRoomClick, handleRequestClick };
};
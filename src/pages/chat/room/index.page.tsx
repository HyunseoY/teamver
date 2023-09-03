import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { chatKeys, selectChatRoom } from "~/states/server/chat";
import { profileKeys, selectProfile, useSelectProfileQuery } from "~/states/server/profile";

import { ChatRoomMember, ChatRoomOwner } from "~/components/Chat";
import { requireAuthentication } from "~/utils";

const ChatRoom = () => {
  const user = useUser() as User;
  const { data: profile } = useSelectProfileQuery(user.id);

  return profile.role.id === 1 ? <ChatRoomOwner /> : <ChatRoomMember />;
};

export default ChatRoom;

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context, session) => {
    const queryClient = new QueryClient();

    const roomId = context.query.roomId as string;

    const profile = queryClient.prefetchQuery(profileKeys.selectProfile(session.user.id), () =>
      selectProfile(session.user.id)
    );

    const room = queryClient.prefetchQuery(
      chatKeys.selectChatRoom({ roomId, userId: session.user.id }),
      () => selectChatRoom({ roomId, userId: session.user.id })
    );

    await Promise.all([profile, room]);

    return {
      props: {
        session,
        dehydratedState: dehydrate(queryClient),
        ...(await serverSideTranslations(context.locale as string, ["common", "chat"]))
      }
    };
  }
);

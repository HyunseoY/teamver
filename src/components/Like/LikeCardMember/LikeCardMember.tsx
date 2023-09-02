import { Avatar, Button, IconButton, ProjectDetail } from "~/components/Commons";

import { FlexCenter, Text } from "~/styles/mixins";
import * as Styled from "../Like.styles";
import { useLikeCardMember } from "./LikeCardMember.hooks";
import type { LikeCardMemberProps } from "./LikeCardMember.types";

export const LikeCardMember = ({ data, userId }: LikeCardMemberProps) => {
  const app = useLikeCardMember({ data, userId });

  return (
    <Styled.Card>
      <FlexCenter
        as="button"
        gap={10}
        onClick={() =>
          app.mount(<ProjectDetail profile={app.profile} project={data.project} />, {
            id: "LIKE_OWNER",
            type: "bottom"
          })
        }
      >
        <Avatar src={data.project.imageUrl} size="medium" />

        <Text>{data.project.name}</Text>
      </FlexCenter>

      <FlexCenter gap={10}>
        <Button
          size="small"
          disabled={data.chatRequest[data.chatRequest.length - 1]?.state === "GRANT"}
          onClick={app.handleRequest}
        >
          {app.requestState()}
        </Button>

        <IconButton
          type="button"
          name="bookmark"
          color="primary"
          onClick={app.handleDeleteFollowProject}
        />
      </FlexCenter>
    </Styled.Card>
  );
};
import { IconButton, Input } from "~/components/Commons";
import { Flex, FlexColumn } from "~/styles/mixins";
import { useChatMessageSend } from "./ChatMessageSend.hooks";
import { EmojiSend } from "./EmojiSend";

export const ChatMessageSend = () => {
  const app = useChatMessageSend();

  return (
    <FlexColumn>
      <Flex
        as="form"
        align="center"
        justify="between"
        gap={10}
        padding="7px 16px"
        onSubmit={app.handleSendMessage}
      >
        <IconButton type="button" name="add" />

        <FlexColumn flex={1}>
          <Input
            color="gray5"
            rightElement={
              <IconButton type="button" name="smile" onClick={app.setIsOpenEmoji.toggle} />
            }
            disableSubmit={false}
            {...app.register("message", { required: true })}
          />
        </FlexColumn>

        <IconButton name="send" />
      </Flex>

      {app.isOpenEmoji && <EmojiSend />}
    </FlexColumn>
  );
};
import { Avatar, Button, IconButton } from "~/components/Commons";
import { type ProjectAllDataRow } from "~/states/server/project";
import { Flex, FlexCenter, FlexColumn, Text } from "~/styles/mixins";
import { useProjectCard } from "./ProjectCard.hooks";
import * as Styled from "./ProjectCard.styles";

export const ProjectCard = ({
  project,
  isMine
}: {
  project: ProjectAllDataRow;
  isMine?: boolean;
}) => {
  const app = useProjectCard({ project, isMine });

  return (
    <Styled.Container>
      <Avatar src={project.imageUrl} size="medium" shape="square" />

      <Styled.Content>
        <Text size="paragraph3" ellipsis>
          {project.name}
        </Text>

        <Flex>
          <Button size="small" color="white" bgColor="backgroundSecondary">
            팀원보기
          </Button>
        </Flex>
      </Styled.Content>

      {isMine && (
        <FlexCenter>
          <IconButton
            name="more"
            onClick={() => {
              if (project.state === "IN_RECRUIT") {
                app.mount(
                  <FlexColumn gap={26} align="center" style={{ padding: "30px 0" }}>
                    <Text onClick={app.handleEditProject}>프로젝트 수정</Text>

                    <Text onClick={() => app.handleStateChange("DONE_RECRUIT")}>
                      팀원 모집 마감
                    </Text>

                    <Text onClick={() => app.handleStateChange("DONE_PROJECT")}>
                      진행상태 완료로 변경
                    </Text>

                    <Text onClick={app.handleDeleteProject}>프로젝트 삭제</Text>
                  </FlexColumn>,
                  {
                    id: "projectStateChangeModal",
                    type: "bottom"
                  }
                );
              } else if (project.state === "DONE_RECRUIT") {
                app.mount(
                  <FlexColumn gap={26} align="center" style={{ padding: "30px 0" }}>
                    <Text onClick={app.handleEditProject}>프로젝트 수정</Text>

                    <Text onClick={() => app.handleStateChange("IN_RECRUIT")}>팀원 모집 받기</Text>

                    <Text onClick={() => app.handleStateChange("DONE_PROJECT")}>
                      진행상태 완료로 변경
                    </Text>

                    <Text onClick={app.handleDeleteProject}>프로젝트 삭제</Text>
                  </FlexColumn>,
                  { id: "projectStateChangeModal", type: "bottom" }
                );
              } else if (project.state === "DONE_PROJECT") {
                app.mount(
                  <FlexColumn gap={26} align="center" style={{ padding: "30px 0" }}>
                    <Text onClick={app.handleDeleteProject}>프로젝트 삭제</Text>
                  </FlexColumn>,
                  {
                    id: "projectStateChangeModal",
                    type: "bottom"
                  }
                );
              }
            }}
          />
        </FlexCenter>
      )}
    </Styled.Container>
  );
};
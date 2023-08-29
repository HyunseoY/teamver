import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import type { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Calendar from "react-calendar";
import { Controller } from "react-hook-form";
import {
  Button,
  ImageUploader,
  Input,
  PreviousButton,
  SelectChip,
  Textarea
} from "~/components/Commons";
import type { ProjectAllDataRow } from "~/states/server/project";
import { PROJECT_ALL_DATA_QUERY } from "~/states/server/project/constants";
import { Flex, FlexColumn, SizeBox, Text } from "~/styles/mixins";
import type { OneOfLanguage } from "~/types";
import { useEdit } from "./edit.hooks";
import * as Styled from "./edit.styles";

const Edit = (props: { user: User; project: ProjectAllDataRow }) => {
  const app = useEdit(props);
  console.log(props.project);

  const { t, i18n } = useTranslation("projectCreate");

  const currentLanguage = i18n.language as OneOfLanguage;
  return (
    <>
      <Head>
        <title>{t("프로젝트 수정")}</title>
      </Head>

      <Styled.Header>
        <PreviousButton />
        <Text>프로젝트 생성하기</Text>
      </Styled.Header>

      <Styled.Container as="form" gap={32} onSubmit={app.handleSubmit(app.handleEditProject)}>
        <FlexColumn gap={16}>
          <Text size="heading4">프로젝트 이미지</Text>

          <Flex>
            <Controller
              name="imageUrl"
              control={app.control}
              render={({ field: { onChange } }) => (
                <Styled.ImageContainer>
                  <ImageUploader onChange={onChange}>
                    {app.watch("imageUrl") ? (
                      <Styled.ImagePreview
                        fill
                        sizes="100%"
                        src={URL.createObjectURL(app.watch("imageUrl"))}
                        alt="project img"
                      />
                    ) : (
                      <Styled.ImagePreview
                        fill
                        sizes="100%"
                        src={props.project.imageUrl}
                        alt="project img"
                      />
                    )}
                  </ImageUploader>
                </Styled.ImageContainer>
              )}
            />
          </Flex>
        </FlexColumn>

        <FlexColumn gap={16}>
          <Text size="heading4">프로젝트 이름</Text>

          <FlexColumn gap={8}>
            <Input
              placeholder="프로젝트 이름"
              maxLength={16}
              defaultValue={props.project.name}
              {...app.register("name", { required: true, maxLength: 16 })}
            />

            <Styled.Desc size="paragraph3" color="gray4">
              최대 16자
            </Styled.Desc>
          </FlexColumn>
        </FlexColumn>

        <FlexColumn gap={16}>
          <Text size="heading4">프로젝트 타입</Text>
          <Text size="paragraph3">여러개 선택 가능해요.</Text>

          <Flex gap={12} wrap="wrap">
            {app.constants.projectTypes.map((projectType) => (
              <SelectChip
                type="radio"
                key={projectType.id}
                value={projectType.id}
                {...app.register("projectType", { required: true })}
              >
                {projectType[currentLanguage]}
              </SelectChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn gap={16}>
          <Text size="heading4">프로젝트 소개</Text>

          <FlexColumn gap={8}>
            <Textarea
              placeholder="프로젝트 소개"
              maxLength={500}
              defaultValue={props.project.description}
              {...app.register("description", { required: true, maxLength: 500 })}
            />

            <Styled.Desc size="paragraph3" color="gray4">
              최대 500자
            </Styled.Desc>
          </FlexColumn>
        </FlexColumn>

        <FlexColumn gap={16}>
          <Text size="heading4">모집 포지션</Text>

          <Flex gap={12} wrap="wrap">
            {app.constants.positions.map((position) => (
              <SelectChip
                key={position.id}
                value={position.id}
                {...app.register("positions", { required: true })}
              >
                {position[currentLanguage]}
              </SelectChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn gap={16}>
          <Text size="heading4">모집 인원</Text>

          <Flex gap={12} align="center" wrap="wrap">
            <Input
              placeholder="모집 인원"
              type="string"
              maxLength={5}
              defaultValue={props.project.recruitCount}
              {...app.register("recruitCount", { required: true, maxLength: 5 })}
            />
            <Text>명</Text>
          </Flex>
        </FlexColumn>

        <FlexColumn gap={16}>
          <Text size="heading4">프로젝트 기간</Text>

          <Flex justify="between">
            <FlexColumn gap={12} style={{ width: "48%" }}>
              <Text>Start Date</Text>

              <FlexColumn gap={12}>
                <Input
                  placeholder="시작일"
                  readOnly
                  value={
                    app.watch("startDate")
                      ? dayjs(app.watch("startDate")).format("DD. MM. YYYY")
                      : dayjs(props.project.startDate).format("DD. MM. YYYY")
                  }
                  onClick={app.setStartDateIsOpen.toggle}
                />
              </FlexColumn>
            </FlexColumn>

            <FlexColumn gap={12} style={{ width: "48%" }}>
              <Text>Due Date</Text>

              <FlexColumn gap={12}>
                <Input
                  placeholder="종료일"
                  readOnly
                  value={
                    app.watch("endDate")
                      ? dayjs(app.watch("endDate")).format("DD. MM. YYYY")
                      : dayjs(props.project.endDate).format("DD. MM. YYYY")
                  }
                  onClick={app.setEndDateIsOpen.toggle}
                />
              </FlexColumn>
            </FlexColumn>
          </Flex>

          {app.startDateIsOpen && (
            <Controller
              name="startDate"
              control={app.control}
              render={({ field: { onChange } }) => (
                <Styled.CalendarWrapper>
                  <Calendar
                    locale="en-EN"
                    nextLabel=">"
                    prevLabel="<"
                    next2Label={null}
                    prev2Label={null}
                    formatDay={(locale, date) => dayjs(date).format("D")}
                    onChange={(date) => {
                      app.setStartDateIsOpen.off();
                      onChange(date);
                    }}
                  />
                </Styled.CalendarWrapper>
              )}
            />
          )}
          {app.endDateIsOpen && (
            <Controller
              name="endDate"
              control={app.control}
              render={({ field: { onChange } }) => (
                <Styled.CalendarWrapper>
                  <Calendar
                    locale="en-EN"
                    nextLabel=">"
                    prevLabel="<"
                    next2Label={null}
                    prev2Label={null}
                    onChange={(date) => {
                      app.setEndDateIsOpen.off();
                      onChange(date);
                    }}
                  />
                </Styled.CalendarWrapper>
              )}
            />
          )}
        </FlexColumn>

        <FlexColumn gap={16}>
          <FlexColumn gap={12}>
            <Text size="heading4">주요 언어</Text>
            <Text size="paragraph3">프로젝트에 필요한 주요 언어를 선택해주세요!</Text>
          </FlexColumn>

          <Flex gap={12} wrap="wrap">
            {app.constants.languages.map((language) => (
              <SelectChip
                key={language.id}
                value={language.id}
                {...app.register("languages", { required: true })}
              >
                {language.name}
              </SelectChip>
            ))}
          </Flex>
        </FlexColumn>

        <FlexColumn gap={16}>
          <FlexColumn gap={12}>
            <Text size="heading4">기술 스택</Text>
            <Text size="paragraph3">프로젝트를 수행함에 있어 필요한 기술 스택을 선택해주세요!</Text>
          </FlexColumn>

          <Flex gap={12} wrap="wrap">
            {app.constants.skills.map((skill) => (
              <SelectChip
                key={skill.id}
                value={skill.id}
                {...app.register("skills", { required: true })}
              >
                {skill.name}
              </SelectChip>
            ))}
          </Flex>
        </FlexColumn>
        <FlexColumn gap={16}>
          <FlexColumn gap={12}>
            <Text size="heading4">활동 지역</Text>
            <Text size="paragraph3">프로젝트 활동 지역을 선택해주세요! 여러개 선택 가능해요.</Text>
          </FlexColumn>

          <Flex gap={12} wrap="wrap">
            {app.constants.areas.map((area) => (
              <SelectChip
                key={area.id}
                value={area.id}
                {...app.register("areas", { required: true })}
              >
                {area[currentLanguage]}
              </SelectChip>
            ))}
          </Flex>
        </FlexColumn>

        <SizeBox height={32} />

        <Button type="submit" disabled={!app.formState.isValid}>
          저장
        </Button>
      </Styled.Container>
    </>
  );
};

export default Edit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabaseServer = createPagesServerClient(context);

  const {
    data: { session }
  } = await supabaseServer.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }
  const { projectId } = context.params;

  const { data: project, error } = await supabaseServer
    .from("projects")
    .select(`${PROJECT_ALL_DATA_QUERY}`)
    .eq("id", projectId)
    .returns<ProjectAllDataRow[]>()
    .single();

  if (error || !project) {
    console.error("Failed to fetch project:", error);
    return;
  }
  console.log(project);

  return {
    props: {
      user: session.user,
      project,
      ...(await serverSideTranslations(context.locale, ["projectCreate"]))
    }
  };
};
import { supabase } from "../config";
import type {
  ConstantAreaRow,
  ConstantLanguageRow,
  ConstantPositionRow,
  ConstantSkillRow
} from "../constant";

import { PROFILE_ALL_DATA_QUERY } from "./constants";
import type {
  FollowsAllDataRow,
  ProfileAllDataInsert,
  ProfileAllDataRow,
  ProfileAllDataUpdate
} from "./types";

export const insertProfile = async ({
  skills,
  projectTypes,
  positions,
  personalities,
  languages,
  areas,
  ...profile
}: ProfileAllDataInsert) => {
  const { error } = await supabase.from("profiles").insert(profile);

  if (error) throw error;

  const mappings = {
    profileLanguages: languages.map((languageId) => ({ languageId, userId: profile.id })),
    profileSkills: skills.map((skillId) => ({ skillId, userId: profile.id })),
    profileAreas: areas.map((areaId) => ({ areaId, userId: profile.id })),
    profileProjectTypes: projectTypes.map((projectTypeId) => ({
      projectTypeId,
      userId: profile.id
    })),
    profilePersonalities: personalities.map((personalityId) => ({
      personalityId,
      userId: profile.id
    })),
    profilePositions: positions.map((positionId) => ({ positionId, userId: profile.id }))
  };

  const tasks = Object.entries(mappings).map(async ([table, data]) => {
    const { error } = await supabase.from(table).insert(data);

    if (error) throw Error("프로필 생성 실패");
  });

  await Promise.all(tasks);
};

export const selectProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(PROFILE_ALL_DATA_QUERY)
    .eq("id", userId)
    .returns<ProfileAllDataRow[]>();

  if (error) throw error;

  return data[0];
};

export const updateProfile = async ({
  skills,
  projectTypes,
  positions,
  personalities,
  languages,
  areas,
  ...profile
}: ProfileAllDataUpdate) => {
  const { error } = await supabase.from("profiles").update(profile).eq("id", profile.id);

  if (error) throw error;

  const mappings = {
    profileLanguages: languages.map((languageId) => ({ languageId, userId: profile.id })),
    profileSkills: skills.map((skillId) => ({ skillId, userId: profile.id })),
    profileAreas: areas.map((areaId) => ({ areaId, userId: profile.id })),
    profileProjectTypes: projectTypes.map((projectTypeId) => ({
      projectTypeId,
      userId: profile.id
    })),
    profilePersonalities: personalities.map((personalityId) => ({
      personalityId,
      userId: profile.id
    })),
    profilePositions: positions.map((positionId) => ({ positionId, userId: profile.id }))
  };

  const tasks = Object.entries(mappings).map(async ([table, data]) => {
    const { error: clearError } = await supabase.from(table).delete().eq("userId", profile.id);
    const { error: insertError } = await supabase.from(table).insert(data);

    if (clearError || insertError) throw Error("프로필 업데이트 실패");
  });

  await Promise.all(tasks);
};

export const insertFollow = async ({ myId, opponentId }: { myId: string; opponentId: string }) => {
  const { error } = await supabase.from("follow").insert({ myId, opponentId });

  if (error) throw Error("팔로우 실패");
};

export const selectFollows = async (myId: string) => {
  const { error, data } = await supabase
    .from("follow")
    .select(
      `id, follow:opponentId!inner(${PROFILE_ALL_DATA_QUERY}), chatRequest:chatRequestOwner(*)`
    )
    .eq("myId", myId)
    .returns<FollowsAllDataRow[]>();

  if (error) throw Error("내가 찜한 사용자를 불러올 수 없습니다.");

  return data;
};

export const deleteFollow = async (followId: number) => {
  const { error } = await supabase.from("follow").delete().eq("id", followId);

  if (error) throw error;
};

export const checkNameValidation = async (nickname: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("name", nickname)
    .maybeSingle();

  if (error) throw Error("이름 중복 검사에 실패하였습니다.");

  return !data;
};

export const selectRecommendedProfiles = async ({
  pageParam = 0,
  limit = 10,
  ...filter
}: {
  skills: ConstantSkillRow["id"][];
  languages: ConstantLanguageRow["id"][];
  positions: ConstantPositionRow["id"][];
  areas: ConstantAreaRow["id"][];
  seedValue: number;
  userId: string;
  pageParam?: number;
  limit?: number;
}) => {
  const query = supabase.rpc("select_recommended_members", filter).neq("id", filter.userId);

  const { data, error } = await query
    .range(pageParam * limit, (pageParam + 1) * limit - 1)
    .select(`*, ${PROFILE_ALL_DATA_QUERY}`)
    .returns<ProfileAllDataRow[]>();

  if (error) throw error;

  return { data, nextPage: data.length === limit ? pageParam + 1 : undefined };
};

export const updateRole = async ({ id, role }: { id: string; role: number }) => {
  const { error } = await supabase.from("profiles").update({ role }).eq("id", id);

  if (error) throw error;
};

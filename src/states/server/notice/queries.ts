import { useQuery } from "@tanstack/react-query";
import type { NoticeMemberAllDataRow, NoticeOwnerAllDataRow } from ".";
import { selectNoticeMember, selectNoticeOwner } from "./apis";
import { noticeKeys } from "./keys";

export const useSelectNoticeMemberQuery = (myId: string) => {
  return useQuery({
    queryKey: noticeKeys.selectNoticeMember(myId),
    queryFn: () => selectNoticeMember(myId),
    initialData: []
  });
};

type NoticeMemberKeyType = ReturnType<typeof noticeKeys.selectNoticeMember>;
type NoticeOwnerKeyType = ReturnType<typeof noticeKeys.selectNoticeOwner>;

type QueryConfigType =
  | { queryKey: NoticeMemberKeyType; queryFn: () => Promise<NoticeMemberAllDataRow[]> }
  | { queryKey: NoticeOwnerKeyType; queryFn: () => Promise<NoticeOwnerAllDataRow[]> };

export const useSelectNoticeQuery = ({ myId, role }: { myId: string; role: number }) => {
  const queryConfig: QueryConfigType =
    role === 1
      ? { queryKey: noticeKeys.selectNoticeOwner(myId), queryFn: () => selectNoticeOwner(myId) }
      : { queryKey: noticeKeys.selectNoticeMember(myId), queryFn: () => selectNoticeMember(myId) };

  return useQuery<NoticeOwnerAllDataRow[] | NoticeMemberAllDataRow[]>({
    ...queryConfig,
    initialData: []
  });
};

export const useSelectNoticeOwnerQuery = (myId: string) => {
  return useQuery({
    queryKey: noticeKeys.selectNoticeOwner(myId),
    queryFn: () => selectNoticeOwner(myId),
    initialData: []
  });
};

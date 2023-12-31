import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { routes } from "~/constants/routes";
import { useSelectOwnerProjectsQuery } from "~/states/server/project";

export const useOwner = () => {
  const [selectedTab, setSelectedTab] = useState("IN_PROJECT");

  const user = useUser() as User;
  const router = useRouter();

  const userId = router.query.userId as string;

  const { data: projects } = useSelectOwnerProjectsQuery(userId);

  const isMine = userId === user.id;

  const handleProjectCreate = () => {
    router.push(routes.projectCreate);
  };

  const inRecruit = projects.filter((project) => project.state === "IN_RECRUIT");
  const doneRecruit = projects.filter((project) => project.state === "DONE_RECRUIT");
  const doneProjects = projects.filter((project) => project.state === "DONE_PROJECT");
  const inProjects = projects.filter((project) => project.state !== "DONE_PROJECT");

  return {
    projects,
    inRecruit,
    doneRecruit,
    doneProjects,
    inProjects,
    isMine,
    selectedTab,
    setSelectedTab,
    handleProjectCreate
  };
};

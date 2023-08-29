import { useState } from "react";
import { useSelectProfileQuery } from "~/states/server/profile";
import { useSelectMemberProjectsQuery } from "~/states/server/project";

export const useMyPage = (userId: string) => {
  const { data: projects } = useSelectMemberProjectsQuery(userId);
  const { data: user } = useSelectProfileQuery(userId);

  const [tabState, setTabState] = useState<number>(0);
  const [isInProgressSelected, setIsInProgressSelected] = useState(true);

  const handleCategoryClick = (category: string) => {
    setIsInProgressSelected(category === "진행중인 프로젝트");
  };

  const proceedProjects = projects.filter((project) => project.state !== "DONE_PROJECT");
  const doneProjects = projects.filter((project) => project.state === "DONE_PROJECT");

  return {
    proceedProjects,
    doneProjects,
    user,
    tabState,
    setTabState,
    isInProgressSelected,
    handleCategoryClick
  };
};
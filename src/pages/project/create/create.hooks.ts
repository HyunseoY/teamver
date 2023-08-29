import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { ComponentProps } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDialog } from "~/components/Commons";
import { useModal } from "~/components/Commons/Modal";
import { useBoolean } from "~/hooks";
import { useGetConstantQuery } from "~/states/server/constant";
import { projectsKey, useInsertProjectMutate } from "~/states/server/project";
import { useUploadProjectImageMutate } from "~/states/server/storage";
import type { ProjectCreatorForm } from "./create.types";
import type Create from "./index.page";

export const useCreate = ({ user }: ComponentProps<typeof Create>) => {
  const queryClient = useQueryClient();

  const { mount, unmount } = useModal();
  const { toast } = useDialog();

  const [startDateIsOpen, setStartDateIsOpen] = useBoolean();
  const [endDateIsOpen, setEndDateIsOpen] = useBoolean();

  const { mutate: insertProjectMutate } = useInsertProjectMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectOwnerProjects());
    }
  });
  const { mutateAsync: uploadProjectImageMutateAsync } = useUploadProjectImageMutate();

  const { register, handleSubmit, watch, control, setValue, formState } =
    useForm<ProjectCreatorForm>({
      defaultValues: { startDate: null, endDate: null },
      mode: "all"
    });

  const { data: constants } = useGetConstantQuery([
    "projectTypes",
    "positions",
    "languages",
    "skills",
    "areas"
  ]);

  const handleCreateProject = handleSubmit(
    async ({ imageUrl: imageFile, startDate, endDate, ...rest }) => {
      const { publicUrl: imageUrl } = await uploadProjectImageMutateAsync({
        file: imageFile,
        name: `${user.id}_${new Date().getTime()}`
      });

      insertProjectMutate({
        ownerId: user.id,
        startDate: startDate?.toDateString(),
        endDate: endDate?.toDateString(),
        imageUrl,
        ...rest
      });
    }
  );

  useEffect(() => {
    watch(({ startDate, endDate }) => {
      if (startDate && endDate) {
        const diff = dayjs(startDate).diff(endDate, "ms");

        if (diff > 0) {
          toast({ type: "warning", message: "종료일은 시작일보다 빠를 수 없습니다." });
          setValue("endDate", null);
        }
      }
    });
  }, [watch, setValue, toast]);

  return {
    control,
    constants,
    formState,
    register,
    handleSubmit,
    handleCreateProject,
    watch,
    mount,
    unmount,
    setValue,
    startDateIsOpen,
    setStartDateIsOpen,
    endDateIsOpen,
    setEndDateIsOpen
  };
};

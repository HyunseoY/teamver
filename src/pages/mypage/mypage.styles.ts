import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Text, flex, grid, position, size } from "~/styles/mixins";

// export const Container = styled.div`
//   ${flex.column({ gap: 15, align: "center" })};

//   ${size({ width: "100%", minHeight: "100vh" })};
//   margin: 0 auto;
//   padding-top: 15px;
// `;

export const ProjectContainer = styled.div`
  ${flex.column({ gap: 26, align: "start" })}

  ${size({ width: "100%" })}

  padding: 33px;
`;

export const TabButtonContainer = styled.div`
  position: relative;
  ${grid({ column: 2, autoColumnSize: false })}

  ${size({ width: "100%" })};

  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.gray3};
  `}

  .submenu {
    ${({ theme: { colors } }) => css`
      padding: 10px;
      color: ${colors.gray3};
    `}
  }

  .clicked {
    ${({ theme: { colors } }) => css`
      padding: 10px;
      color: ${colors.white};
    `}
  }
`;

export const SelectedBorder = styled(Text)`
  ${position.absolute({ bottom: "calc(0% - 2px)" })};

  ${size({ width: "50%", height: "3px" })};

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
  `}

  transition: 0.2s transform;
  transform: ${({ tabState }: { tabState: number }) => `translateX(${tabState * 100}%)`};
`;

export const SectionDisplay = styled.div`
  width: 100%;

  overflow: hidden;
`;
export const SectionContainer = styled.div<{ isInProgressSelected: boolean }>`
  ${flex({ gap: 100 })};

  /* display: flex; */

  height: 100%;

  ${({ isInProgressSelected }) => css`
    transition: 300ms;
    transform: translateX(${isInProgressSelected ? "0%" : "-100%"});
  `}
`;
export const Section = styled.div<{ isGrid?: boolean }>`
  flex-shrink: 0;

  width: 100%;
`;
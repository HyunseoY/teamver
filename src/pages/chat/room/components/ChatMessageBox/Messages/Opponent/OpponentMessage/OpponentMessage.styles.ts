import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { text } from "~/styles/mixins";

export const Bubble = styled.div`
  padding: 12px 16px;

  ${({ theme: { colors } }) => css`
    border: 1px solid ${colors.backgroundSecondary};
    border-radius: 16px;

    ${text("textMedium")};
    color: ${colors.content1};
  `}
`;

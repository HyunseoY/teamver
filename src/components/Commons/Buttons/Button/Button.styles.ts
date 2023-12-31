import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { selector, size, text } from "~/styles/mixins";
import type { WithTheme } from "~/types";
import type { ButtonProps } from "./Button.types";

const sizeMap = {
  small: 26,
  medium: 34,
  large: 54
} as const;

export const buttonStyle = ({
  theme: { sizes, colors },
  size: _size = "large",
  color = "gray2",
  bgColor = "secondary"
}: WithTheme<ButtonProps>) => css`
  ${size({ minHeight: sizeMap[_size] })}

  background-color: ${colors[bgColor]};
  ${selector("backgroundColor", { disabled: colors.gray5 })};

  border-radius: 30px;

  padding: 0 16px;

  ${text(sizes.button[_size])};
  color: ${colors[color]};
  white-space: nowrap;
`;

export const Button = styled.button<ButtonProps>`
  ${(props) => buttonStyle(props)};
`;

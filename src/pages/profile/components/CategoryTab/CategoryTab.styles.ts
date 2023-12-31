import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { grid, size, text } from "~/styles/mixins";

export const Container = styled.div`
  position: relative;

  ${({ theme: { colors } }) => css`
    box-shadow: inset 0 -1px 0 ${colors.gray2};
  `}
`;

export const ItemContainer = styled.div<{ size: number }>`
  ${({ size }) => css`
    ${grid({ column: size, align: "center", justify: "center" })}
  `}
`;

export const Item = styled.button<{ selected: boolean }>`
  padding: 12px 0;

  ${size({ width: "100%", height: "100%" })};

  ${text("textLarge")};

  ${({ theme: { colors }, selected }) => css`
    color: ${colors[selected ? "content2" : "gray4"]};
  `}

  transition: 300ms;
`;

export const FloatingBar = styled.div<{ size: number; selectedIndex: number }>`
  ${({ theme: { colors }, size: _size, selectedIndex }) => css`
    ${size({ width: `calc(${100 / _size}%)`, height: 1 })}

    background-color: ${colors.gray6};

    transform: translateX(${selectedIndex * 100}%);
  `}

  transition: 300ms;
`;

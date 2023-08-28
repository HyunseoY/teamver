import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { FlexColumn, Text, flex, size } from "~/styles/mixins";

export const Header = styled.header`
  ${flex.center()};

  ${({ theme: { sizes } }) => css`
    height: ${sizes.height.header}px;
  `}
`;

export const Container = styled(FlexColumn)`
  padding: 32px;
`;

export const Desc = styled(Text)`
  margin-left: 18px;
`;

export const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;

  ${size({ width: 100, height: 140 })};

  ${({ theme: { colors } }) => css`
    background-color: ${colors.backgroundSecondary};

    border-radius: 20px;
  `}
`;

export const ImagePreview = styled(Image)`
  object-fit: cover;
  object-position: center;
`;

export const ImageUploadBox = styled.div`
  ${flex.center()};

  ${size({ width: "100%", height: "100%" })};

  ${({ theme: { colors } }) => css`
    border: 1px dashed ${colors.gray4};
    border-radius: 20px;
  `}
`;

export const ImageUploadButton = styled.div`
  ${flex.center()};

  ${size({ width: 44, height: 44 })};

  ${({ theme: { colors } }) => css`
    background-color: ${colors.black};
  `}

  border-radius: 50%;
`;
export const CalendarWrapper = styled.div`
  ${flex.column({ align: "center" })};

  padding: 10px 0;

  .react-calendar {
    ${size({ width: "85%" })};
    /* width: 100%;
    max-width: 100%; */
    ${({ theme: { colors } }) => css`
      background-color: ${colors.black};
    `} /* your custom styles here */
    border: none;
  }
  .react-calendar__navigation__label > span {
    ${({ theme: { colors } }) => css`
      color: ${colors.white};
    `}

    font-size: 1rem;
  }
  .react-calendar__navigation button {
    ${({ theme: { colors } }) => css`
      color: ${colors.white};
    `}
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    ${({ theme: { colors } }) => css`
      background-color: ${colors.black};
    `}
  }

  .react-calendar__month-view__weekdays {
    abbr {
      ${({ theme: { colors } }) => css`
        color: ${colors.gray1};
      `}

      /* font-size: 1rem; */
      font-weight: 300;
    }
  }

  .react-calendar__tile--now {
    ${({ theme: { colors } }) => css`
      background-color: ${colors.black};
    `}
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    ${({ theme: { colors } }) => css`
      color: ${colors.black};
    `}
  }
  .react-calendar__tile {
    ${({ theme: { colors } }) => css`
      color: ${colors.gray3};
      background-color: ${colors.black};
    `}
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    ${({ theme: { colors } }) => css`
      color: ${colors.black};
      background-color: ${colors.primary};
    `}
    border-radius: 10px;
  }
`;

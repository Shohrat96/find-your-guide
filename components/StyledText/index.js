import { Text } from "react-native";
import styled from "styled-components/native";

export const ExtraBoldText = styled(Text)`
  font-size: 16px;
  font-family: SatoshiExtrabold;
`;

export const BoldText = styled(Text)`
  font-size: 16px;
  font-family: SatoshiBold;
`;

export const RegularText = styled(Text)`
  font-size: 16px;
  font-family: SatoshiRegular;
`;

export const RegularTextSmall = styled(Text)`
  font-size: 14px;
  font-family: SatoshiRegular;
`;

export const ErrorText = styled(Text)`
  font-size: 14px;
  font-family: SatoshiRegular;
  color: crimson;
`;

export const MediumText = styled(Text)`
  font-size: 16px;
  font-family: SatoshiMedium;
`;

export const HeadingText = styled(Text)`
  font-family: SatoshiExtrabold;
  font-size: 24px;
`;

export const SecondaryText = styled(Text)`
  font-size: 16px;
  font-family: SatoshiMedium;
  color: #545454;
`;

export const TitleText = styled(Text)`
  font-family: SatoshiExtrabold;
  font-size: 24px;
  line-height: 24px;
`;

export const BoldMedium = styled(Text)`
  font-family: SatoshiBold;
  font-size: 20px;
`;

export const BoldTextUnderline = styled(Text)`
  font-size: 16px;
  font-family: SatoshiBold;
  text-decoration: underline;
`;

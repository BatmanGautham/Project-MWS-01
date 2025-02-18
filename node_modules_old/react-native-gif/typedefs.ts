import { NativeModules, ImageSourcePropType, ImageStyle } from "react-native";

export interface RNFLCoverModes {
  ScaleToFill: number;
  ScaleAspectFit: number;
  ScaleAspectFill: number;
}

const {
  ScaleToFill,
  ScaleAspectFit,
  ScaleAspectFill
} = (NativeModules.RNFLAnimatedImageManager || {}) as RNFLCoverModes;

export const MODES = {
  stretch: ScaleToFill,
  contain: ScaleAspectFit,
  cover: ScaleAspectFill
};

export interface FLAnimatedImageProps {
  contentMode?: number;
  source: ImageSourcePropType;
  resizeMode?: keyof typeof MODES;
  style?: ImageStyle;
  onFrameChange?: () => void;
  onLoadEnd?: () => void;
}

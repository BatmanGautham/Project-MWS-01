import React, { Component } from "react";
import { Platform, Image, requireNativeComponent } from "react-native";
import { FLAnimatedImageProps, MODES } from "./typedefs";

class FLAnimatedImage extends Component<FLAnimatedImageProps> {
  static defaultProps = {
    resizeMode: "contain"
  };

  render() {
    if (Platform.OS === "android") return <Image {...this.props} />;
    const contentMode = MODES[this.props.resizeMode || "contain"];
    const source = Image.resolveAssetSource(this.props.source) || {
      uri: undefined,
      width: undefined,
      height: undefined
    };
    const src = source.uri;
    return (
      <RNFLAnimatedImage {...this.props} src={src} contentMode={contentMode} />
    );
  }
}

const RNFLAnimatedImage = requireNativeComponent("RNFLAnimatedImage");

export default FLAnimatedImage;

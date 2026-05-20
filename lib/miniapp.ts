import { APP_NAME, SPLASH_COLOR, absoluteUrl } from "@/lib/app";

export type MiniAppEmbed = {
  version: "1";
  imageUrl: string;
  button: {
    title: string;
    action: {
      type: "launch_miniapp" | "launch_frame";
      url: string;
      name: string;
      splashImageUrl: string;
      splashBackgroundColor: string;
    };
  };
};

type EmbedOptions = {
  path: string;
  title?: string;
  imageTitle?: string;
};

export function createMiniAppEmbed({
  path,
  title = "Open SwapCast",
  imageTitle
}: EmbedOptions): MiniAppEmbed {
  const imageSearch = imageTitle
    ? `?title=${encodeURIComponent(imageTitle)}`
    : "";

  return {
    version: "1",
    imageUrl: absoluteUrl(`/api/og${imageSearch}`),
    button: {
      title,
      action: {
        type: "launch_miniapp",
        url: absoluteUrl(path),
        name: APP_NAME,
        splashImageUrl: absoluteUrl("/splash.png"),
        splashBackgroundColor: SPLASH_COLOR
      }
    }
  };
}

export function createLegacyFrameEmbed(options: EmbedOptions): MiniAppEmbed {
  const embed = createMiniAppEmbed(options);

  return {
    ...embed,
    button: {
      ...embed.button,
      action: {
        ...embed.button.action,
        type: "launch_frame"
      }
    }
  };
}

export function createMetadataOther(options: EmbedOptions) {
  return {
    "fc:miniapp": JSON.stringify(createMiniAppEmbed(options)),
    "fc:frame": JSON.stringify(createLegacyFrameEmbed(options))
  };
}


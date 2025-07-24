import { memo } from "react";
import UnicornScene from "unicornstudio-react";

export const MemoizedUnicornScene = memo(
  ({ onLoad }: { onLoad?: () => void }) => {
    console.log("here ");
    return (
      <div className="h-[100vh] w-[100vw] snap-start absolute z-[-1]">
        <UnicornScene
          projectId="00uBJitC7TKBXzEMswis"
          width={"100%"}
          height={"100%"}
          production={true}
          onLoad={onLoad}
          onError={onLoad}
        />
      </div>
    );
  }
);

// Add a display name for better debugging
MemoizedUnicornScene.displayName = "MemoizedUnicornScene";

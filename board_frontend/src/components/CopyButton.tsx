import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
const CopyButton = ({ text }: { text: string }) => {
  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        toast.success("Meeting Id Copied To Clipboard!");
        console.log("copied");
      }}
    >
      <button
        className="flex m-0 p-0.5 h-9 w-9 hover:bg-hoverCol rounded-xl items-center justify-center"
        type="button"
      >
        <img src="/icons/copy.svg" className=" h-6 w-6 scale-95" />
      </button>
    </CopyToClipboard>
  );
};

export default CopyButton;

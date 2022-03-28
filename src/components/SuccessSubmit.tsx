import Link from "next/link";
import React from "react";
import Button from "./Button";

type SuccessSubmitProps = {
  linkId: string;
};

const SuccessSubmit = ({ linkId }: SuccessSubmitProps) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (path: string) => {
    navigator.clipboard.writeText(window.location.origin + path);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  const path = `/r/${linkId}`;
  return (
    <>
      <Link href={path}>
        <a
          target="_blank"
          className="text-teal-600 text-sm font-medium hover:text-teal-800 mr-4"
        >
          Check the page
        </a>
      </Link>
      <Button
        type="button"
        disabled={copied}
        onClick={() => copyToClipboard(path)}
      >
        {copied ? "Copied" : "Copy link"}
      </Button>
    </>
  );
};

export default SuccessSubmit;

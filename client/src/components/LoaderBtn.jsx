import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const LoaderBtn = () => {
  return (
    <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  );
};

export default LoaderBtn;

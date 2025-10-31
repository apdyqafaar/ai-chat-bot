"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import TextareaAutosize from "react-textarea-autosize";

const FormUi = () => {
  return (
    <div className="pb-10 bg-background">
      <div className="max-w-2xl mx-auto w-full">
        <form className="w-full">
          <div className="flex items-end relative w-full mt-2 rounded-lg border border-border gap-2 sm:-ml-2 bg-foreground/5">
            <TextareaAutosize
              minRows={1}
              maxRows={6}
              placeholder="Ask anything..."
              className="w-full resize-none bg-transparent text-base px-4 py-4 pr-24  focus:outline-none focus-visible:ring-0"
            />
            <Button
              type="submit"
              className="rounded-full absolute right-3 bottom-2 h-10 px-4"
            >
             <ArrowUp/>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormUi;

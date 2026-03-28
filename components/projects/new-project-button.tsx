"use client";

import { useState } from "react";
import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewProjectDialog } from "@/components/projects/new-project-dialog";
import { useRouter } from "next/navigation";

export function NewProjectButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <FolderPlus className="mr-2 h-4 w-4" />
        新建项目
      </Button>
      <NewProjectDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => router.refresh()}
      />
    </>
  );
}

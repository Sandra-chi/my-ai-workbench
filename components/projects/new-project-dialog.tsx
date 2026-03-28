"use client";

import { useState } from "react";
import { FolderPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface NewProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function NewProjectDialog({ isOpen, onClose, onSuccess }: NewProjectDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          goal,
          tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        }),
      });

      if (response.ok) {
        setName("");
        setDescription("");
        setGoal("");
        setTags("");
        onSuccess();
        onClose();
      } else {
        const data = await response.json();
        alert("创建失败: " + data.error);
      }
    } catch (error) {
      alert("创建失败: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">新建项目</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              项目名称 *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：我的新项目"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              项目描述
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="这个项目是关于什么的？"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              项目目标
            </label>
            <Textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="要达成什么结果？"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              标签（用逗号分隔）
            </label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="例如：产品, 开发, 实验"
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit" disabled={!name || isLoading}>
              {isLoading ? "创建中..." : "创建项目"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

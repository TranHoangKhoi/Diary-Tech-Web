"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  activityName?: string;
  onContinue: () => void;
  onBack: () => void;
  onOpenChange: (open: boolean) => void;
}

export default function CreateLogSuccessDialog({
  open,
  activityName,
  onContinue,
  onBack,
  onOpenChange,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm nhật ký thành công</DialogTitle>

          <DialogDescription>
            Bạn có muốn tiếp tục nhập hoạt động{" "}
            <span className="font-semibold text-black">
              {activityName || ""}
            </span>{" "}
            không?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={onBack}
            className="cursor-pointer px-6 py-4"
          >
            Chọn hoạt động khác
          </Button>

          <Button onClick={onContinue} className="cursor-pointer px-6 py-4">
            Nhập tiếp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
  onContinue: () => void;
  onBack: () => void;
  onOpenChange: (open: boolean) => void;
}

export default function CreateFarmSuccessDialog({
  open,
  onContinue,
  onBack,
  onOpenChange,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo tài khoản thành công</DialogTitle>

          <DialogDescription>
            Bạn có muốn tiếp tục thêm tài khoản mới không?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={onBack}
            className="cursor-pointer px-6 py-4"
          >
            Quay lại danh sách
          </Button>

          <Button onClick={onContinue} className="cursor-pointer px-6 py-4">
            Nhập tiếp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

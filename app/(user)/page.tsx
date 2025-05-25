"use client";
import React from "react";
import { Begin, Group, RText } from "@/lib/by/Div";
import { RModal } from "@/lib/by/RModal";

export default function Page() {
  const openModal = () => {
    RModal.onShow({ name: "Test", status: true, data: "Hello from modal" });
  };

  return (
    <Begin className="flex flex-col ">
      <Group>
        <RText>fff</RText>

        <button onClick={openModal}>Mở Modal</button>
      </Group>

      <RModal
        name="Test"
        isBottomSheet={true}
        _set={{
          overlay: { zIndex: 9999 },
          modal: {
            padding: 20,
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
          },
        }}
      >
        {({ open, onClose }) => (
          <div>
            <h1 className="text-2xl font-bold text-red-500  ">
              Modal nội dung
            </h1>
            <p>{open?.data}</p>
            <button onClick={() => onClose()}>Đóng</button>
          </div>
        )}
      </RModal>
    </Begin>
  );
}

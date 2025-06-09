"use client";

import { NameModal, RModal } from "@/lib/by/RModal";
import GHNForm from "./GHTKForm";
import { useAddToAddressMutation } from "@/process/api/apiAddress";

const AddressModal = () => {
  const [addAddress, { isLoading }] = useAddToAddressMutation();
  return (
    <RModal
      name={"AddressModal" as NameModal}
      _set={{
        modal: { padding: "0rem", width: "100%", maxWidth: 600 },
        overlay: { zIndex: 10 },
      }}
    >
      {({ open, onClose }) => {
        const initialShippingInfo = open.data
          ? JSON.parse(open.data)
          : undefined;

        return (
          <GHNForm
            isLoading={isLoading}
            initialShippingInfo={initialShippingInfo}
            onSave={async (formData) => {
              try {
                await addAddress({
                  address: formData.address,
                  city: formData.city,
                  pincode: formData.pincode,
                  phone: formData.phone,
                  notes: formData.notes ?? "",
                }).unwrap();
                onClose();
              } catch (err) {
                console.error("Failed to add address:", err);
              }
            }}
            onClose={() => onClose()}
          />
        );
      }}
    </RModal>
  );
};

export default AddressModal;

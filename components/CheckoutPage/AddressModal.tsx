"use client";

import { RModal } from "@/lib/by/RModal";
import GHNForm from "./GHTKForm";
import { useAddToAddressMutation } from "@/process/api/apiAddress";

const AddressModal = () => {
  const [addAddress, { isLoading }] = useAddToAddressMutation();
  return (
    <RModal
      name={RModal.EModal.AddressModal}
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
                  address: formData.address ?? "",
                  city: formData.city ?? "",
                  pincode: formData.pincode ?? "",
                  phone: formData.phone ?? "",
                  notes: formData.notes ?? "",
                  to_district_id: formData.to_district_id ?? "",
                  to_city_id: formData.to_city_id ?? "",
                  to_ward_code: formData.to_ward_code ?? ""
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

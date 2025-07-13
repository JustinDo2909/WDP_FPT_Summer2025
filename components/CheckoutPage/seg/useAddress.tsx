import { useState } from "react";
import { IShippingInfo } from "./types";

export function useAddress() {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<IShippingInfo[]>([]);
  const [newAddress, setNewAddress] = useState<IShippingInfo>({
    fullname: "",
    phone_number: "",
    street_address: "",
    province: "",
    district: "",
    ward: "",
  });

  const getShippingFeeOnWardChange = () => {
    console.log("Fetching shipping fee..."); // implement logic later
  };

  const handleAddAddress = () => {
    if (
      newAddress.fullname &&
      newAddress.phone_number &&
      newAddress.street_address &&
      newAddress.province &&
      newAddress.district &&
      newAddress.ward
    ) {
      setAddresses((prev) => [...prev, newAddress]);
      setNewAddress({
        fullname: "",
        phone_number: "",
        street_address: "",
        province: "",
        district: "",
        ward: "",
      });
      setModalOpen(false);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return {
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    modalOpen,
    setModalOpen,
    newAddress,
    setNewAddress,
    handleAddAddress,
    getShippingFeeOnWardChange,
  };
}

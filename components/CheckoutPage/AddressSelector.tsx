"use client";

import { Truck } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { NameModal, RModal } from "@/lib/by/RModal";
import { useGetAddressQuery } from "@/process/api/apiAddress";
import { Block, Row, Wrap, RText } from "@/lib/by/Div";
import Button from "../CustomButton";
import AddressModal from "./AddressModal";

interface AddressSelectorProps {
  setSelectedAddress: (value: IAddress) => void;
  selectedAddress: IAddress | undefined;
}

const AddressSelector = ({
  setSelectedAddress,
  selectedAddress,
}: AddressSelectorProps) => {
  const { data } = useGetAddressQuery();
  const addresses: IAddress[] = data?.addresses ?? [];

  const openAddAddressModal = () => {
    RModal.onShow({
      name: "AddressModal" as NameModal,
      status: true,
      data: undefined,
    });
  };

  return (
    <Block className=" flex flex-col gap-4 ">
      <Row className="flex space-x-4 items-center">
        <h2 className="text-xl font-bold">1. Shipping Address <span className="text-red-500 text-2xl">*</span></h2>
        <Button
          label={"+ Add Address"}
          variant="default"
          onClick={openAddAddressModal}
        />
      </Row>

      <Select
        value={selectedAddress?.id?.toString() ?? ""}
        onValueChange={(val) => {
          const address = addresses.find((a) => String(a.id) === val);
          if (address) setSelectedAddress(address);
        }}
      >
        <SelectTrigger className="w-full border-primary ring-0 focus-visible:ring-transparent">
          <Row className="items-center gap-2 flex">
            <Truck className="w-5 h-5 text-primary" />
            <SelectValue placeholder="Select your shipping address" />
          </Row>
        </SelectTrigger>

        <SelectContent>
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <SelectItem key={address.id} value={String(address.id)}>
                <Wrap className="flex text-sm text-left">
                  <RText className="font-semibold text-black mr-1">
                    {address.phone}
                  </RText>
                  <RText className="mr-1">{address.address},</RText>
                  <RText>{address.city}</RText>
                </Wrap>
              </SelectItem>
            ))
          ) : (
            <Wrap className="p-2 text-gray-500 text-sm">
              No address saved yet.
            </Wrap>
          )}
        </SelectContent>
      </Select>

      <AddressModal />
    </Block>
  );
};

export default AddressSelector;

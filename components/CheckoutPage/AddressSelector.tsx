"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { NameModal, RModal } from "@/lib/by/RModal";
import { useGetAddressQuery } from "@/process/api/apiAddress";
import { Card, Block, Row, Wrap, RText } from "@/lib/by/Div";
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
  const addresses: IAddress[] = data?.addresses ?? []

  const openAddAddressModal = () => {
    RModal.onShow({
      name: "AddressModal" as NameModal,
      status: true,
      data: undefined, // or pass data if editing
    });
  };

  return (
    <Block className="p-4 flex flex-col gap-6 flex-1 border border-gray-200 rounded-md">
      <Row className="flex space-x-4 items-center">
        <h2 className="text-xl font-bold">Shipping Address</h2>{" "}
        <Button label={'+ Add Address'} variant="default" onClick={openAddAddressModal}>
          
        </Button>
      </Row>

      <RadioGroup
        value={selectedAddress?.id?.toString() ?? ""}
        onValueChange={(val) => {
          const address = addresses.find((a) => String(a.id) === val);
          if (address) setSelectedAddress(address);
        }}
        className="flex flex-col gap-4"
      >
        {addresses.length > 0 ? (
          addresses.map((address: IAddress) => (
            <Card
              key={address.id}
              className={`border p-4 rounded-lg flex items-start gap-4 cursor-pointer ${
                selectedAddress?.id === address.id
                  ? "border-primary"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedAddress(address)}
            >
              <RadioGroupItem value={String(address?.id)} />
              <Wrap className="text-gray-600 text-sm flex justify-between flex-col items-start">
                <RText className="font-semibold text-base text-black"> {address.phone}</RText>
                <RText>{address.address}</RText>
                <RText>{address.ward ?? "Ward"}, {address.district ?? "District"}, {address.city}</RText>
              </Wrap>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  RModal.onShow({
                    name: "AddressModal" as NameModal,
                    status: true,
                    data: JSON.stringify(address), // Send the address for editing
                  });
                }}
                className="text-blue-500 flex items-center  hover:text-blue-700 text-sm"
                title="Edit Address"
              >
                Change
              </button>
            </Card>
          ))
        ) : (
          <p className="text-sm text-gray-500">No address saved yet.</p>
        )}
      </RadioGroup>

      <AddressModal />
    </Block>
  );
};

export default AddressSelector;

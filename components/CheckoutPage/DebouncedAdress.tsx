"use client";

import React, { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { Truck } from "lucide-react";
import { Begin, RText } from "@/lib/by/Div";

type AddressIndicatorProps = {
  street: string;
  wardCode: string;
  districtCode: string;
  provinceCode: string;
  wards: { codeId: number; name: string }[];
  districts: { codeId: number; name: string }[];
  provinces: { codeId: number; name: string }[];
};
const DebouncedAddressIndicator: React.FC<AddressIndicatorProps> = ({
  street,
  wardCode,
  districtCode,
  provinceCode,
  wards,
  districts,
  provinces,
}) => {
  const [debouncedAddress, setDebouncedAddress] = useState("");

  const isAddressComplete = () =>
    Boolean(provinceCode && districtCode && wardCode && street);

  const getWardName = () =>
    wards.find((w) => w.codeId.toString() === wardCode)?.name ?? "";
  const getDistrictName = () =>
    districts.find((d) => d.codeId.toString() === districtCode)?.name ?? "";
  const getProvinceName = () =>
    provinces.find((p) => p.codeId.toString() === provinceCode)?.name ?? "";

  const computeAddress = () => {
    if (!isAddressComplete()) return "";
    return `${street}, ${getWardName()}, ${getDistrictName()}, ${getProvinceName()}`;
  };

  const debouncedComputeAddress = useMemo(() => {
    return debounce(() => {
      setDebouncedAddress(computeAddress());
    }, 300);
  }, [
    street,
    wardCode,
    districtCode,
    provinceCode,
    wards,
    districts,
    provinces,
    computeAddress,
  ]);

  useEffect(() => {
    debouncedComputeAddress();
    return () => {
      debouncedComputeAddress.cancel();
    };
  }, [debouncedComputeAddress]);

  if (!debouncedAddress)
    return (
      <Begin>
        <RText>&nbsp;</RText>
      </Begin>
    );

  return (
    <Begin className="flex items-center text-pink-500 text-xs mt-1 gap-1">
      <Truck className="w-4 h-4 text-pink-500" />
      <span>{debouncedAddress}</span>
    </Begin>
  );
};

export default DebouncedAddressIndicator;

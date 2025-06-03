"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetProvincesQuery,
  useGetDistrictsQuery,
  useGetWardsQuery,
} from "@/process/api/apiGHN";
import { Begin, Card, Column, Row } from "@/lib/by/Div";
import { cn } from "@/lib/utils";
import { SquareUser } from "lucide-react";
import DebouncedAddressIndicator from "./DebouncedAdress";
import { validateVietnamesePhoneNumber } from "@/lib/share/validateVNNumber";

type IShippingInfo = {
  fullname: string;
  phone_number: string;
  street_address: string;
  province: string;
  district: string;
  ward: string;
};

type GHNFormProps = {
  shippingInfo: IShippingInfo;
  setShippingInfo: (loc: IShippingInfo) => void;
  getShippingFeeOnWardChange: () => void;
};

const GHNForm: React.FC<GHNFormProps> = ({
  shippingInfo,
  setShippingInfo,
  getShippingFeeOnWardChange,
}) => {
  const { fullname, phone_number, street_address, province, district, ward } =
    shippingInfo;

  const { data: provinces = [], isLoading: provincesLoading } =
    useGetProvincesQuery({});
    
  const { data: districts = [], isLoading: districtsLoading } =
    useGetDistrictsQuery(
      { provinceId: parseInt(province) },
      { skip: !province }
    );
  const { data: wards = [], isLoading: wardsLoading } = useGetWardsQuery(
    { districtId: parseInt(district) },
    { skip: !district }
  );

  useEffect(() => {
    setShippingInfo({ ...shippingInfo, district: "", ward: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province]);

  useEffect(() => {
    setShippingInfo({ ...shippingInfo, ward: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district]);

  useEffect(() => {
    if (ward) getShippingFeeOnWardChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ward]);

  const inputClass = "bg-gray-100 text-base py-5 px-4 rounded-xl";

  return (
    <Card className="col-span-3 w-full mx-auto p-6 bg-white rounded-2xl border border-gray-200 flex flex-col gap-4 relative">
      {/* <Begin className="absolute top-0 left-0 w-full h-1 bg-pink-500 rounded-t-md" /> */}
      <h2 className="text-xl font-semibold text-gray-800 text-left">
        Personal Information
      </h2>

      {/* Full Name */}
      <Row className="flex flex-row gap-3">
        <Begin className="relative w-full">
          <SquareUser className="absolute right-4 top-2" />
          <Input
            id="fullName"
            className={inputClass}
            placeholder="Enter full name (required)"
            value={fullname}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, fullname: e.target.value })
            }
          />
        </Begin>

        {/* Phone Number */}
        {/* <Label htmlFor="phone">
          <Phone className="inline w-4 h-4 mr-1" />
          Phone Number
        </Label> */}
        <Input
            id="phone"
            className={cn(
                inputClass,
                !validateVietnamesePhoneNumber(phone_number) && phone_number !== "" &&
                "border-red-500 focus:ring-red-500 focus:border-red-500 ring-red-500"
            )}
            placeholder="Enter phone number (required)"
            value={phone_number}
            onChange={(e) =>
                setShippingInfo({ ...shippingInfo, phone_number: e.target.value })
            }
            />

      </Row>

      <h2 className="text-xl font-semibold text-gray-800 text-left">
        Shipping Address
      </h2>

      {/* Province */}
      <Column className="flex flex-col gap-1">
        {/* <Label>
          <MapPin className="inline w-4 h-4 mr-1" />
          Province / City
        </Label> */}
        <Select
          onValueChange={(val) =>
            setShippingInfo({ ...shippingInfo, province: val })
          }
          value={province}
          disabled={provincesLoading}
        >
          <SelectTrigger className={cn(inputClass, "text-sm")}>
            <SelectValue
              placeholder={
                provincesLoading
                  ? "Loading..."
                  : "Select province/city (required)"
              }
            />
          </SelectTrigger>
          <SelectContent className="rounded-xl max-h-[280px]">
            {provinces.map((province) => (
              <SelectItem
                className=""
                key={province.codeId}
                value={province.codeId.toString()}
              >
                {province.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Column>

      {/* District */}
      <Column className="flex flex-col gap-1">
        {/* <Label>District</Label> */}
        <Select
          onValueChange={(val) =>
            setShippingInfo({ ...shippingInfo, district: val })
          }
          value={district}
          disabled={!province || districtsLoading}
        >
          <SelectTrigger className={cn(inputClass, "text-sm")}>
            <SelectValue
              placeholder={
                districtsLoading ? "Loading..." : "Select district (required)"
              }
            />
          </SelectTrigger>
          <SelectContent className="rounded-xl max-h-[280px]">
            {districts.map((district) => (
              <SelectItem
                key={district.codeId}
                value={district.codeId.toString()}
              >
                {district.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Column>

      {/* Ward */}
      <Column className="flex flex-col gap-1">
        {/* <Label>Ward</Label> */}
        <Select
          onValueChange={(val) =>
            setShippingInfo({ ...shippingInfo, ward: val })
          }
          value={ward}
          disabled={!district || wardsLoading}
        >
          <SelectTrigger className={cn(inputClass, "text-sm")}>
            <SelectValue
              placeholder={wardsLoading ? "Loading..." : "Select ward (required)"}
            />
          </SelectTrigger>
          <SelectContent className="rounded-xl max-h-[280px]">
            {wards.map((ward) => (
              <SelectItem key={ward.codeId} value={ward.codeId.toString()}>
                {ward.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Column>

      {/* Street Address */}
      <Column className="flex flex-col gap-1">
        {/* <Label htmlFor="street">
          <Home className="inline w-4 h-4 mr-1" />
          Street Address
        </Label> */}
        <Input
          id="street"
          className={inputClass}
          placeholder="Street number + street name (required)"
          value={street_address}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, street_address: e.target.value })
          }
        />
      </Column>

      <DebouncedAddressIndicator
        street={street_address}
        wardCode={ward}
        districtCode={district}
        provinceCode={province}
        wards={wards}
        districts={districts}
        provinces={provinces}
      />
    </Card>
  );
};

export default GHNForm;

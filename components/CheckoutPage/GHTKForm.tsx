"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
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
import { validateVietnamesePhoneNumber } from "@/lib/share/validateVNNumber";
import Button from "../CustomButton";

// Zod schema for IAddress
const AddressSchema = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "Province/City is required"),
  to_city_id: z.string(),
  to_district_id: z.string(),
  to_ward_code: z.string(),
  pincode: z.string().min(6, "PIN is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(validateVietnamesePhoneNumber, {
      message: "Invalid Vietnamese phone number",
    }),
  notes: z.string().optional(),
  fullname: z.string().min(1, "Full name is required"),
  district: z.string().min(1, "District is required"),
  ward: z.string().min(1, "Ward is required"),
});

type GHNFormProps = {
  initialShippingInfo?: Partial<IAddress>;
  onSave: (address: Partial<IAddress>) => void;
  onClose: () => void;
  isLoading: boolean;
};

const GHNForm: React.FC<GHNFormProps> = ({
  isLoading = false,
  initialShippingInfo,
  onSave,
  onClose,
}) => {
  // Initialize state with initialShippingInfo or defaults
  const [shippingInfo, setShippingInfo] = useState<Partial<IAddress>>(
    initialShippingInfo || {
      user_id: "",
      address: "",
      city: "",
      to_city_id: "",
      to_district_id: "",
      to_ward_code: "",
      pincode: "",
      phone: "",
      notes: "",
      fullname: "",
      district: "",
      ward: "",
    }
  );
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);

  // API queries
  const { data: provinces = [], isLoading: provincesLoading } =
    useGetProvincesQuery({});
  const { data: districts = [], isLoading: districtsLoading } =
    useGetDistrictsQuery(
      { provinceId: parseInt(shippingInfo.to_city_id || "0") },
      { skip: !shippingInfo.to_city_id }
    );
  const { data: wards = [], isLoading: wardsLoading } = useGetWardsQuery(
    { districtId: parseInt(shippingInfo.to_district_id || "0") },
    { skip: !shippingInfo.to_district_id }
  );

  // Reset district and ward when city changes
  useEffect(() => {
    setShippingInfo((prev) => ({
      ...prev,
      to_district_id: "",
      district: "",
      to_ward_code: "",
      ward: "",
    }));
  }, [shippingInfo.to_city_id]);

  // Reset ward when district changes
  useEffect(() => {
    setShippingInfo((prev) => ({
      ...prev,
      to_ward_code: "",
      ward: "",
    }));
  }, [shippingInfo.to_district_id]);

  // Validate form data
  const validateForm = () => {
    const result = AddressSchema.safeParse(shippingInfo);
    if (!result.success) {
      setErrors(result.error.issues);
      return false;
    }
    setErrors([]);
    return result.data;
  };

  // Handle form submission
  const handleSubmit = () => {
    const validatedData = validateForm();
    if (validatedData) {
      onSave(validatedData);
    }
  };

  // Get error message for a specific field
  const getError = (field: keyof IAddress) =>
    errors.find((err) => err.path[0] === field)?.message;

  const inputClass = "bg-gray-100 text-base py-5 px-4 rounded-xl";

  return (
    <Card className="col-span-3 w-full mx-auto p-6 bg-white rounded-2xl border border-gray-200 flex flex-col gap-2 relative">
      <h2 className="text-lg font-semibold text-gray-800 text-left">
        Add a new address
      </h2>

      {/* Full Name */}
      <Row className="flex flex-row gap-3">
        <Begin className="relative w-full">
          <SquareUser className="absolute right-4 top-2" />
          <Input
            id="fullName"
            className={cn(inputClass, getError("fullname") && "border-red-500")}
            placeholder="Enter full name (required)"
            value={shippingInfo.fullname || ""}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, fullname: e.target.value })
            }
          />
          {getError("fullname") && (
            <p className="text-red-500 text-sm mt-1">{getError("fullname")}</p>
          )}
        </Begin>

        {/* Phone Number */}
        <Begin className="relative w-full">
          <Input
            id="phone"
            className={cn(inputClass, getError("phone") && "border-red-500")}
            placeholder="Enter phone number (required)"
            value={shippingInfo.phone || ""}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, phone: e.target.value })
            }
          />
          {getError("phone") && (
            <p className="text-red-500 text-sm mt-1">{getError("phone")}</p>
          )}
        </Begin>
      </Row>

      <h2 className="text-sm font-semibold text-gray-800 text-left">
        Shipping Address
      </h2>

      {/* Province */}
      <Row className="flex flex-row gap-3">
        <Column className="flex flex-col gap-1">
          <Select
            onValueChange={(val) => {
              const selectedProvince = provinces.find(
                (province) => province.codeId.toString() === val
              );
              setShippingInfo({
                ...shippingInfo,
                to_city_id: val,
                city: selectedProvince ? selectedProvince.name : "",
              });
            }}
            value={shippingInfo.to_city_id || ""}
            disabled={provincesLoading}
          >
            <SelectTrigger
              className={cn(
                inputClass,
                "text-sm",
                getError("city") && "border-red-500"
              )}
            >
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
                  key={province.codeId}
                  value={province.codeId.toString()}
                >
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {getError("city") && (
            <p className="text-red-500 text-sm mt-1">{getError("city")}</p>
          )}
        </Column>

        <Begin className="relative w-full">
          <Input
            id="pincode"
            className={cn(inputClass, getError("pincode") && "border-red-500")}
            placeholder="Enter PIN code (required)"
            value={shippingInfo.pincode || ""}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, pincode: e.target.value })
            }
          />
          {getError("pincode") && (
            <p className="text-red-500 text-sm mt-1">{getError("pincode")}</p>
          )}
        </Begin>
      </Row>

      {/* District */}
      <Column className="flex flex-col gap-1">
        <Select
          onValueChange={(val) => {
            const selectedDistrict = districts.find(
              (district) => district.codeId.toString() === val
            );
            setShippingInfo({
              ...shippingInfo,
              to_district_id: val,
              district: selectedDistrict ? selectedDistrict.name : "",
            });
          }}
          value={shippingInfo.to_district_id || ""}
          disabled={!shippingInfo.to_city_id || districtsLoading}
        >
          <SelectTrigger
            className={cn(
              inputClass,
              "text-sm",
              getError("district") && "border-red-500"
            )}
          >
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
        {getError("district") && (
          <p className="text-red-500 text-sm mt-1">{getError("district")}</p>
        )}
      </Column>

      {/* Ward */}
      <Column className="flex flex-col gap-1">
        <Select
          onValueChange={(val) => {
            const selectedWard = wards.find(
              (ward) => ward.codeId.toString() === val
            );
            setShippingInfo({
              ...shippingInfo,
              to_ward_code: val,
              ward: selectedWard ? selectedWard.name : "",
            });
          }}
          value={shippingInfo.to_ward_code || ""}
          disabled={!shippingInfo.to_district_id || wardsLoading}
        >
          <SelectTrigger
            className={cn(
              inputClass,
              "text-sm",
              getError("ward") && "border-red-500"
            )}
          >
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
        {getError("ward") && (
          <p className="text-red-500 text-sm mt-1">{getError("ward")}</p>
        )}
      </Column>

      {/* Street Address */}
      <Column className="flex flex-col gap-1">
        <Input
          id="street"
          className={cn(inputClass, getError("address") && "border-red-500")}
          placeholder="Street number + street name (required)"
          value={shippingInfo.address || ""}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, address: e.target.value })
          }
        />
        {getError("address") && (
          <p className="text-red-500 text-sm mt-1">{getError("address")}</p>
        )}
      </Column>
      <h3 className="text-sm font-semibold text-gray-800 text-left">Notes</h3>
      <Column className="flex flex-col gap-1">
        <Input
          id="notes"
          className={cn(inputClass, getError("notes") && "border-red-500")}
          placeholder="Add a note (optional)"
          value={shippingInfo.notes || ""}
          onChange={(e) =>
            setShippingInfo({ ...shippingInfo, notes: e.target.value })
          }
        />
      </Column>

      {/* Submit Button */}
      <Row className="flex items-center justify-end space-x-2">
        <Button
          onClick={onClose}
          variant="outline"
          label={"Cancel"}
          className="mt-4 py-2 px-4 rounded-x"
        />
        <Button
          isLoading={isLoading}
          onClick={handleSubmit}
          label={"Save Address"}
          className="mt-4 text-white py-2 px-4 rounded-x"
        />
      </Row>
    </Card>
  );
};

export default GHNForm;
import React from "react";

// Core components converted to Tailwind

//#region Core (cap 1)
export function Core({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Core"
      className={`flex flex-col flex-1 gap-2 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}
//#endregion

//#region  Contain (cap 2)

export function Container({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Contain"
      className={`flex flex-col flex-1 py-4 px-6 gap-4 relative ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}
//#endregion

//#region  Area (cap 3)
export function Area({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Area"
      className={`flex flex-col gap-2 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}
//#endregion

//#region  Yard (cap 4)
export function Yard({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Yard"
      className={`flex flex-col gap-2 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}
//#endregion

//#region  Section (cap 5)
export function Section({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Section"
      className={`flex flex-col gap-2 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}
//#endregion

//#region  Anchor (cap 6)
export function Anchor({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Anchor"
      className={`flex flex-col gap-2 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}
//#endregion

//#region  Block (cap 7)
export function Block({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Block"
      className={`flex flex-col gap-2 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}
//#endregion

//#region  Card (cap 8)

export function Card({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Card"
      className={`flex flex-col gap-2 p-2 shadow-md bg-white rounded-lg ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}

//#endregion

//#region  Box (cap 9)

export function Box({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Box"
      className={`flex flex-col gap-2 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}

//#endregion

//#region  Column (cap 10)

export function Column({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div id="Column" className={`${className || ""}`} {...args}>
      {children}
    </div>
  );
}

//#endregion

//#region  Row (cap 11)

export function Row({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Row"
      className={`flex flex-row gap-2 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}

//#endregion

//#region  Group (cap 12)

export function Group({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Group"
      className={`w-auto flex items-center gap-2 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}

//#endregion

//#region  Wrap (cap 13)
export function Wrap({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Wrap"
      className={`flex flex-row items-center gap-1 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}

//#endregion

//#region  Cover (cap 14)

export function Cover({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Cover"
      className={`flex items-center gap-2 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}

//#endregion

export function Scroll({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex-1 relative">
      <div
        id="Scroll"
        className={`overflow-hidden absolute m-auto flex-1 inset-0 ${className || ""}`}
        {...args}
      >
        {children}
      </div>
    </div>
  );
}

export function Mass({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Mass"
      className={`flex flex-col gap-2 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}

export function RText({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      id="RText"
      className={`text-sm flex items-center text-gray-800 ${className || ""}`}
      {...args}
    >
      {children}
    </p>
  );
}

export function FControl({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div id="FormControl" className={`${className || ""}`} {...args}>
      {children}
    </div>
  );
}

export function FLabel({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div id="FLabel" className={`${className || ""}`} {...args}>
      {children}
    </div>
  );
}

export function FValid({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div id="FValid" className={`${className || ""}`} {...args}>
      {children}
    </div>
  );
}

export function Begin({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Begin"
      className={`flex flex-row gap-2 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}

export function Content({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="Content"
      className={`flex flex-col gap-2 flex-1 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}

export function End({
  className,
  children,
  ...args
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      id="End"
      className={`flex flex-row gap-2 ${className || ""}`}
      {...args}
    >
      {children}
    </div>
  );
}

import { Row, RText } from "@/lib/by/Div";
import Link from "next/link";
import React from "react";

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Row className="flex text-sm text-gray-500 mb-4 space-x-2 items-center">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {item.href ? (
            <Link href={item.href} className="hover:underline text-gray-700">
              {item.label}
            </Link>
          ) : (
            <RText className="text-gray-400">{item.label}</RText>
          )}
          {idx < items.length - 1 && <span className="mx-1">/</span>}
        </React.Fragment>
      ))}
    </Row>
  );
}

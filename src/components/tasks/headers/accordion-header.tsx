import React from "react";

import { Space } from "antd";
import { Text } from "@/components/Text";

type Props = React.PropsWithChildren<{
  icon: React.ReactNode;
  isActive: boolean;
  fallback?: string | React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
}>;

export const AccordionHeader = ({
  icon,
  isActive,
  fallback,
  children,
}: Props) => {
  return (
    <Space size={15} align="start">
      {icon}
      {isActive ? <Text strong>{children}</Text> : fallback}
    </Space>
  );
};

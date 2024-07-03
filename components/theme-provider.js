// Add the "use client" directive at the top of the file
"use client";
import PropTypes from "prop-types";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  // Bạn có thể thêm các props khác vào đây nếu cần
};

import React, { FC, SVGProps } from "react";

const FolderIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="currentColor"
        {...props}
    >
        <path d="M13 3.5V6H12V4H6.5L6.146 3.854L5.293 3H1V10.418L0.025 13.342L0.5 14L0 13.5V2.5L0.5 2H5.5L5.854 2.146L6.707 3H12.5L13 3.5Z" />
        <path d="M15.151 6H8.50002L8.14602 6.146L7.29302 7H2.50002L2.02502 7.342L0.0250244 13.342L0.500024 14L12.516 14L13 13.629L15.634 6.629L15.151 6ZM12.133 13L1.19302 13L2.86002 8H7.50002L7.85402 7.854L8.70702 7H14.5L12.133 13Z" />
    </svg>
);

export default FolderIcon;

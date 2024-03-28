import React from "react";

interface BreadcrumbProps {
  items: BreadCrumbsItemProps[];
}

type BreadCrumbsItemProps = {
  icon?: React.ReactNode;
  text: string;
  url?: string;
  target?: "_blank" | "_self";
};

const BreadCrumb: React.FunctionComponent<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="bg-[#11161C] flex items-center justify-start p-6 border border-solid border-[#192028]">
      <ul className="flex flex-wrap items-center m-0 list-none pl-0">
        {items.map((item: BreadCrumbsItemProps, index: number) => (
          <>
            <li
              key={index}
              className="text-sm inline-flex items-center justify-center rounded-lg whitespace-nowrap transition ease-in-out duration-300 h-6 text-white"
              style={{ backgroundColor: "rgb(66, 66, 66)" }}
            >
              {item.icon && item.icon}
              {item.url ? (
                <a
                  href={item.url}
                  target={item.target || "_self"}
                  className="overflow-hidden overflow-ellipsis px-3 whitespace-nowrap"
                >
                  {item.text}
                </a>
              ) : (
                <span className="overflow-hidden overflow-ellipsis px-3 whitespace-nowrap">
                  {item.text}
                </span>
              )}
            </li>
            {index === items.length - 1 ? null : (
              <li className="flex select-none mx-2 text-white">/</li>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default BreadCrumb;

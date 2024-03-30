import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import BreadCrumb from "@/components/BreadCrumb";
import HomeIcon from "@mui/icons-material/Home";
import EditGrid from "@/components/EditGrid";

const Edit = () => {
  return (
    <div>
      <BreadCrumb
        items={[
          {
            text: "Anasayfa",
            url: "/",
            target: "_self",
            icon: (
              <HomeIcon
                fontSize="small"
                style={{
                  marginLeft: "5px",
                  marginRight: "-6px",
                  color: " rgb(224, 224, 224)",
                }}
              />
            ),
          },
          {
            text: "Post Düzenle",
            icon: (
              <EditIcon
                style={{
                  marginLeft: "5px",
                  fontSize: "16px",
                  marginRight: "-6px",
                  color: " rgb(224, 224, 224)",
                }}
              />
            ),
          },
        ]}
      />
      <EditGrid />
    </div>
  );
};

export default Edit;

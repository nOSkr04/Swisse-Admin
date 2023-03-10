import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  // Apps
  const [isEcommerce, setIsEcommerce] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
  }, [history, iscurrentState, isDashboard, isApps]);

  const menuItems = [
    {
      label: "Цэс",
      isHeader: true,
    },
    // {
    //   id: "dashboard",
    //   label: "Хянах самбар",
    //   icon: "ri-dashboard-2-line",
    //   link: "/#",
    //   stateVariables: isDashboard,
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsDashboard(!isDashboard);
    //     setIscurrentState("Dashboard");
    //     updateIconSidebar(e);
    //   },
    //   subItems: [
    //     {
    //       id: "ecommerce",
    //       label: "Дэлгүүр",
    //       link: "/dashboard",
    //       parentId: "dashboard",
    //     },
    //   ],
    // },
    {
      id: "apps",
      label: "Бараа",
      icon: "ri-apps-1-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isApps);
        setIscurrentState("Apps");
        updateIconSidebar(e);
      },
      stateVariables: isApps,
      subItems: [
        {
          id: 1,
          label: "Бараанууд",
          link: "/apps-ecommerce-products",
          parentId: "apps",
        },
        {
          id: 3,
          label: "Бараа үүсгэх",
          link: "/apps-ecommerce-add-product",
          parentId: "apps",
        },
      ],
    },
    {
      id: "apps",
      label: "Нийтлэл",
      icon: "ri-apps-2-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsApps(!isApps);
        setIscurrentState("Apps");
        updateIconSidebar(e);
      },
      stateVariables: isApps,
      subItems: [
        {
          id: 1,
          label: "Нийтлэлүүд",
          link: "/blog",
          parentId: "apps",
        },
        {
          id: 3,
          label: "Нийтлэл үүсгэх",
          link: "/blog-add",
          parentId: "apps",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;

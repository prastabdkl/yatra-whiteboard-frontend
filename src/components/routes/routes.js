import React from "react";
import { canAccess } from "../../misc";
import { HomePage } from "../pages/HomePage";
import { RoutePage } from "../pages/RoutePage";

const routes = [
    {
        path: "/",
        title: "Home",
        icon: "home",
        exact: true,
        accessible: true,
        component: HomePage,
    },

    {
        path: "/upload",
        title: "Upload Image",
        icon: "upload",
        exact: true,
        accessible: true,
        component: HomePage,
    },

    {
        rootPath: "/mynestedroutes",
        path: "#",
        title: "Editor",
        icon: "terminal",
        component: RoutePage,
        accessible: true,
        exact: true,
        routes: [
            {
                path: "/nestedrouteone",
                exact: true,
                accessible: true,
                component: RoutePage,
            },
            {
                path: "/drawing",
                exact: true,
                title: "Drawing",
                accessible: true,
                component: RoutePage,
            },
            {
                path: "/text",
                title: "Text",
                icon: "user",
                exact: true,
                accessible: true,
                component: RoutePage,
            },
        ],
    },
];

export { routes };

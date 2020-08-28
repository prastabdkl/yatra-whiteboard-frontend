import React from "react";
import { canAccess } from "../../misc";
import { HomePage } from "../pages/HomePage";
import { RoutePage } from "../pages/RoutePage";
import { Login } from "../auth";
import { UsersList, UserForm, UserProfile, UserDetails } from "../users";

const user_permissions = [
    ["user-list", "post"],
    ["user-detail", "get"],
];

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
        path: "/profile",
        exact: true,
        accessible: true,
        component: UserProfile,
    },

    {
        path: "/login",
        component: Login,
        accessible: true,
        exact: true,
    },

    // User Routes

    {
        rootPath: "#",
        path: "#user",
        icon: "users",
        title: "User",
        accessible: canAccess([["corporate-staff", true]]),
        exact: true,
        routes: [
            {
                path: "/user",
                title: "All Users",
                icon: "users",
                component: UsersList,
                accessible: canAccess([["corporate-staff", true]]),
                exact: true,
            },

            {
                path: "/user/:idx",
                icon: "file alternate",
                component: UserDetails,
                accessible: canAccess([["corporate-staff", true]]),
                exact: true,
            },

            {
                path: "/users/new",
                icon: "file alternate",
                component: UserForm,
                accessible: canAccess([["corporate-staff", true]]),
                exact: true,
            },

            {
                path: "/user/:idx/edit",
                icon: "file alternate",
                component: UserForm,
                accessible: canAccess([["corporate-staff", true]]),
                exact: true,
            },
        ],
    },
];

export { routes };

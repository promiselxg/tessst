"use client";

import * as React from "react";
import {
  BookDashed,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "YSFON",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Training & Courses",
      url: "/dashboard/training",
      icon: SquareTerminal,

      items: [
        {
          title: "Create new training",
          url: "/dashboard/training/create",
        },
        {
          title: "All trainings",
          url: "/dashboard/training",
        },
        {
          title: "Categories",
          url: "/dashboard/categories?tab=training",
        },
        {
          title: "Tags",
          url: "/dashboard/training/tags",
        },
        {
          title: "Instructors",
          url: "/dashboard/training/instructors",
        },
        {
          title: "Students",
          url: "/dashboard/training/students",
        },
      ],
    },
    {
      title: "Ecommerce Store",
      url: "/dashboard/ecommerce",
      icon: Bot,
      items: [
        {
          title: "All products",
          url: "/dashboard/ecommerce",
        },
        {
          title: "Add product",
          url: "/dashboard/ecommerce/products/create",
        },
        {
          title: "Orders",
          url: "/dashboard/ecommerce/orders",
        },
        {
          title: "Customers",
          url: "/dashboard/ecommerce/customers",
        },
        {
          title: "Discounts",
          url: "/dashboard/ecommerce/discounts",
        },
        {
          title: "Categories",
          url: "/dashboard/categories?tab=store",
        },
        {
          title: "Tags",
          url: "/dashboard/ecommerce/tags",
        },
      ],
    },
    {
      title: "Subscriptions",
      url: "/dashboard/membership",
      icon: Bot,
      items: [
        {
          title: "All products",
          url: "/dashboard/ecommerce",
        },
        {
          title: "Add product",
          url: "/dashboard/ecommerce/products/create",
        },
        {
          title: "Orders",
          url: "/dashboard/ecommerce/orders",
        },
        {
          title: "Customers",
          url: "/dashboard/ecommerce/customers",
        },
        {
          title: "Discounts",
          url: "/dashboard/ecommerce/discounts",
        },
        {
          title: "Categories",
          url: "/dashboard/categories?tab=store",
        },
        {
          title: "Tags",
          url: "/dashboard/ecommerce/tags",
        },
      ],
    },
    {
      title: "Blog & Articles",
      url: "/dashboard/membership",
      icon: BookDashed,
      items: [
        {
          title: "All Blog Posts",
          url: "/dashboard/blog",
        },
        {
          title: "Create new post",
          url: "/dashboard/blog/create",
        },
        {
          title: "Categories",
          url: "/dashboard/blog?tab=blog_categories",
        },
      ],
    },
    {
      title: "Projects Management",
      url: "/dashboard/membership",
      icon: BookDashed,
      items: [
        {
          title: "Projects",
          url: "/dashboard/project",
        },
        {
          title: "Create new project",
          url: "/dashboard/project/create",
        },
        {
          title: "Categories",
          url: "/dashboard/project?tab=project_categories",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

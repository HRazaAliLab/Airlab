import RouterComponent from "@/components/RouterComponent.vue";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import(/* webpackChunkName: "start" */ "@/views/main/Start.vue"),
      children: [
        {
          path: "login",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
        },
        {
          path: "signup",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "login" */ "@/views/SignUp.vue"),
        },
        {
          path: "recover-password",
          component: () => import(/* webpackChunkName: "recover-password" */ "@/views/PasswordRecovery.vue"),
        },
        {
          path: "reset-password",
          component: () => import(/* webpackChunkName: "reset-password" */ "@/views/ResetPassword.vue"),
        },
        {
          path: "main",
          component: () => import(/* webpackChunkName: "main" */ "@/views/main/Main.vue"),
          children: [
            {
              path: "dashboard",
              component: () => import(/* webpackChunkName: "main-dashboard" */ "@/views/main/Dashboard.vue"),
            },
            {
              path: "group/:groupId",
              name: "main-group",
              component: () => import(/* webpackChunkName: "main-group" */ "@/views/main/group/GroupView.vue"),
              children: [
                {
                  path: "reagents",
                  name: "main-group-reagents",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-reagents" */ "@/views/main/group/reagents/ReagentsView.vue"
                    ),
                },

                {
                  path: "clones",
                  name: "main-group-clones",
                  component: () =>
                    import(/* webpackChunkName: "main-group-clones" */ "@/views/main/group/clones/ClonesView.vue"),
                },
                {
                  path: "clones/create",
                  name: "main-group-clones-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-clones-create" */ "@/views/main/group/clones/CreateClone.vue"
                    ),
                },
                {
                  path: "clones/edit/:id",
                  name: "main-group-clones-edit",
                  component: () =>
                    import(/* webpackChunkName: "main-group-clones-edit" */ "@/views/main/group/clones/EditClone.vue"),
                },

                {
                  path: "panels",
                  name: "main-group-panels",
                  component: () =>
                    import(/* webpackChunkName: "main-group-panels" */ "@/views/main/group/panels/PanelsView.vue"),
                },
                {
                  path: "shop",
                  name: "main-group-shop",
                  component: () =>
                    import(/* webpackChunkName: "main-group-shop" */ "@/views/main/group/shop/ShopView.vue"),
                },
                {
                  path: "conjugates",
                  name: "main-group-conjugates",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-conjugates" */ "@/views/main/group/conjugates/ConjugatesView.vue"
                    ),
                },
                {
                  path: "lots",
                  name: "main-group-lots",
                  component: () =>
                    import(/* webpackChunkName: "main-group-lots" */ "@/views/main/group/lots/LotsView.vue"),
                },
                {
                  path: "antibodies",
                  name: "main-group-antibodies",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-antibodies" */ "@/views/main/group/antibodies/AntibodiesView.vue"
                    ),
                },
              ],
            },
            {
              path: "profile",
              component: RouterComponent,
              redirect: "profile/view",
              children: [
                {
                  path: "view",
                  component: () =>
                    import(/* webpackChunkName: "main-profile" */ "@/views/main/profile/UserProfile.vue"),
                },
                {
                  path: "edit",
                  component: () =>
                    import(/* webpackChunkName: "main-profile-edit" */ "@/views/main/profile/UserProfileEdit.vue"),
                },
                {
                  path: "password",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-profile-password" */ "@/views/main/profile/UserProfileEditPassword.vue"
                    ),
                },
              ],
            },
            {
              path: "admin",
              component: () => import(/* webpackChunkName: "main-admin" */ "@/views/main/admin/Admin.vue"),
              redirect: "admin/user/all",
              children: [
                {
                  path: "user",
                  redirect: "user/all",
                },
                {
                  path: "user/all",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-user" */ "@/views/main/admin/user/AdminUsers.vue"),
                },
                {
                  path: "user/edit/:id",
                  name: "main-admin-user-edit",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-user-edit" */ "@/views/main/admin/user/EditUser.vue"),
                },
                {
                  path: "user/create",
                  name: "main-admin-user-create",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-user-create" */ "@/views/main/admin/user/CreateUser.vue"),
                },

                {
                  path: "group",
                  redirect: "group/all",
                },
                {
                  path: "group/all",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-group" */ "@/views/main/admin/group/AdminGroups.vue"),
                },
                {
                  path: "group/create",
                  name: "main-admin-group-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-group-create" */ "@/views/main/admin/group/CreateGroup.vue"
                    ),
                },
                {
                  path: "group/edit/:id",
                  name: "main-admin-group-edit",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-group-edit" */ "@/views/main/admin/group/EditGroup.vue"),
                },

                {
                  path: "tag",
                  redirect: "tag/all",
                },
                {
                  path: "tag/all",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-tag" */ "@/views/main/admin/tag/AdminTags.vue"),
                },
                {
                  path: "tag/create",
                  name: "main-admin-tag-create",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-tag-create" */ "@/views/main/admin/tag/CreateTag.vue"),
                },
                {
                  path: "tag/edit/:id",
                  name: "main-admin-tag-edit",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-tag-edit" */ "@/views/main/admin/tag/EditTag.vue"),
                },

                {
                  path: "species",
                  redirect: "species/all",
                },
                {
                  path: "species/all",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-species" */ "@/views/main/admin/species/AdminSpecies.vue"),
                },
                {
                  path: "species/create",
                  name: "main-admin-species-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-species-create" */ "@/views/main/admin/species/CreateSpecies.vue"
                    ),
                },
                {
                  path: "species/edit/:id",
                  name: "main-admin-species-edit",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-species-edit" */ "@/views/main/admin/species/EditSpecies.vue"
                    ),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/*",
      redirect: "/",
    },
  ],
});

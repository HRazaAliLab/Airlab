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
              path: "groups",
              name: "main-groups",
              component: () => import(/* webpackChunkName: "main-groups" */ "@/views/main/GroupsView.vue"),
            },
            {
              path: "groups/:groupId",
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
                  path: "reagents/create",
                  name: "main-group-reagents-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-reagents-create" */ "@/views/main/group/reagents/CreateReagent.vue"
                    ),
                },
                {
                  path: "reagents/:id/edit",
                  name: "main-group-reagents-edit",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-reagents-edit" */ "@/views/main/group/reagents/EditReagent.vue"
                    ),
                },

                {
                  path: "proteins",
                  name: "main-group-proteins",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-proteins" */ "@/views/main/group/proteins/ProteinsView.vue"
                    ),
                },
                {
                  path: "proteins/create",
                  name: "main-group-proteins-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-proteins-create" */ "@/views/main/group/proteins/CreateProtein.vue"
                    ),
                },
                {
                  path: "proteins/:id/edit",
                  name: "main-group-proteins-edit",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-proteins-edit" */ "@/views/main/group/proteins/EditProtein.vue"
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
                  path: "clones/:id/edit",
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
                  path: "panels/create",
                  name: "main-group-panels-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-panels-create" */ "@/views/main/group/panels/CreatePanel.vue"
                    ),
                },
                {
                  path: "panels/:id/edit",
                  name: "main-group-panels-edit",
                  component: () =>
                    import(/* webpackChunkName: "main-group-panels-edit" */ "@/views/main/group/panels/EditPanel.vue"),
                },
                {
                  path: "panels/:id",
                  name: "main-group-panels-view",
                  component: () =>
                    import(/* webpackChunkName: "main-group-panels-view" */ "@/views/main/group/panels/ViewPanel.vue"),
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
                  path: "conjugates/create",
                  name: "main-group-conjugates-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-conjugates-create" */ "@/views/main/group/conjugates/CreateConjugate.vue"
                    ),
                },
                {
                  path: "conjugates/:id/edit",
                  name: "main-group-conjugates-edit",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-conjugates-edit" */ "@/views/main/group/conjugates/EditConjugate.vue"
                    ),
                },

                {
                  path: "validations",
                  name: "main-group-validations",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-validations" */ "@/views/main/group/validations/ValidationsView.vue"
                    ),
                },
                {
                  path: "validations/create",
                  name: "main-group-validations-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-validations-create" */ "@/views/main/group/validations/CreateValidation.vue"
                    ),
                },
                {
                  path: "validations/:id/edit",
                  name: "main-group-validations-edit",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-validations-edit" */ "@/views/main/group/validations/EditValidation.vue"
                    ),
                },

                {
                  path: "lots",
                  name: "main-group-lots",
                  component: () =>
                    import(/* webpackChunkName: "main-group-lots" */ "@/views/main/group/lots/LotsView.vue"),
                },
                {
                  path: "lots/create",
                  name: "main-group-lots-create",
                  component: () =>
                    import(/* webpackChunkName: "main-group-lots-create" */ "@/views/main/group/lots/CreateLot.vue"),
                },
                {
                  path: "lots/:id/edit",
                  name: "main-group-lots-edit",
                  component: () =>
                    import(/* webpackChunkName: "main-group-lots-edit" */ "@/views/main/group/lots/EditLot.vue"),
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
              redirect: "admin/users",
              children: [
                {
                  path: "users",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-users" */ "@/views/main/admin/user/AdminUsers.vue"),
                },
                {
                  path: "users/:id/edit",
                  name: "main-admin-users-edit",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-users-edit" */ "@/views/main/admin/user/EditUser.vue"),
                },
                {
                  path: "users/create",
                  name: "main-admin-users-create",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-user-create" */ "@/views/main/admin/user/CreateUser.vue"),
                },

                {
                  path: "groups",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-groups" */ "@/views/main/admin/group/AdminGroups.vue"),
                },
                {
                  path: "groups/create",
                  name: "main-admin-groups-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-groups-create" */ "@/views/main/admin/group/CreateGroup.vue"
                    ),
                },
                {
                  path: "groups/:id/edit",
                  name: "main-admin-groups-edit",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-groups-edit" */ "@/views/main/admin/group/EditGroup.vue"),
                },

                {
                  path: "tags",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-tags" */ "@/views/main/admin/tag/AdminTags.vue"),
                },
                {
                  path: "tags/create",
                  name: "main-admin-tags-create",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-tags-create" */ "@/views/main/admin/tag/CreateTag.vue"),
                },
                {
                  path: "tags/:id/edit",
                  name: "main-admin-tags-edit",
                  component: () =>
                    import(/* webpackChunkName: "main-admin-tags-edit" */ "@/views/main/admin/tag/EditTag.vue"),
                },

                {
                  path: "species",
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
                  path: "species/:id/edit",
                  name: "main-admin-species-edit",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-species-edit" */ "@/views/main/admin/species/EditSpecies.vue"
                    ),
                },

                {
                  path: "providers",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-providers" */ "@/views/main/admin/provider/AdminProviders.vue"
                    ),
                },
                {
                  path: "providers/create",
                  name: "main-admin-providers-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-providers-create" */ "@/views/main/admin/provider/CreateProvider.vue"
                    ),
                },
                {
                  path: "providers/:id/edit",
                  name: "main-admin-providers-edit",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-admin-providers-edit" */ "@/views/main/admin/provider/EditProvider.vue"
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

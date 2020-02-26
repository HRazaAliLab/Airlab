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
              redirect: "groups/:groupId/clones",
              children: [
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

                {
                  path: "tags",
                  name: "main-group-tags",
                  component: () =>
                    import(/* webpackChunkName: "main-group-tags" */ "@/views/main/group/tags/TagsView.vue"),
                },
                {
                  path: "tags/create",
                  name: "main-group-tags-create",
                  component: () =>
                    import(/* webpackChunkName: "main-group-tags-create" */ "@/views/main/group/tags/CreateTag.vue"),
                },
                {
                  path: "tags/:id/edit",
                  name: "main-group-tags-edit",
                  component: () =>
                    import(/* webpackChunkName: "main-group-tags-edit" */ "@/views/main/group/tags/EditTag.vue"),
                },

                {
                  path: "species",
                  name: "main-group-species",
                  component: () =>
                    import(/* webpackChunkName: "main-group-species" */ "@/views/main/group/species/SpeciesView.vue"),
                },
                {
                  path: "species/create",
                  name: "main-group-species-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-species-create" */ "@/views/main/group/species/CreateSpecies.vue"
                    ),
                },
                {
                  path: "species/:id/edit",
                  name: "main-group-species-edit",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-species-edit" */ "@/views/main/group/species/EditSpecies.vue"
                    ),
                },

                {
                  path: "providers",
                  name: "main-group-providers",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-providers" */ "@/views/main/group/providers/ProvidersView.vue"
                    ),
                },
                {
                  path: "providers/create",
                  name: "main-group-providers-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-providers-create" */ "@/views/main/group/providers/CreateProvider.vue"
                    ),
                },
                {
                  path: "providers/:id/edit",
                  name: "main-group-providers-edit",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-providers-edit" */ "@/views/main/group/providers/EditProvider.vue"
                    ),
                },

                {
                  path: "members",
                  name: "main-group-members",
                  component: () =>
                    import(/* webpackChunkName: "main-group-members" */ "@/views/main/group/members/MembersView.vue"),
                },
                {
                  path: "members/create",
                  name: "main-group-members-create",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-members-create" */ "@/views/main/group/members/CreateMember.vue"
                    ),
                },
                {
                  path: "members/:id/edit",
                  name: "main-group-members-edit",
                  component: () =>
                    import(
                      /* webpackChunkName: "main-group-members-edit" */ "@/views/main/group/members/EditMember.vue"
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

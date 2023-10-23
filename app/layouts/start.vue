<template>
  <v-app dark>
    <v-img src="/B3.jpg">
      <v-navigation-drawer color="#3a1d0d" v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar color="#006147" :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
        </v-btn>
        <v-btn icon @click.stop="clipped = !clipped">
          <v-icon>mdi-application</v-icon>
        </v-btn>
        <v-btn icon @click.stop="fixed = !fixed">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title" />
        <v-spacer />
      </v-app-bar>
      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
      <v-footer :absolute="!fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-img>
  </v-app>
</template>

<script>
export default {
  name: "LoginLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-account",
          title: "Iniciar Sesión",
          to: "/login",
        },
        {
          icon: "mdi-rename-box",
          title: "Registrarse",
          to: "/registro",
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "LOGIN PAGE",
    };
  },
};
</script>

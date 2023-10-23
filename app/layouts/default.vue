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
        <v-tooltip left color="#15AE92">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="logout">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
        <span>Cerrar Sesión</span>
        </v-tooltip>

      <v-dialog v-model="dialogLogout" max-width="500px">
          <v-card>
            <v-card-title>¿Seguro que desea cerrar sesión?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">NO</v-btn>
              <v-btn color="blue darken-1" text @click="logOutConfirm">SI</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      dialogLogout: false, 
      items: [
        {
          icon: "mdi-school",
          title: "Inicio",
          to: "/home",
        },
        {
          icon: "mdi-home",
          title: "Propiedades",
          to: "/propiedades",
        },
        {
          icon: "mdi-human-male-female",
          title: "Personas",
          to: "/personas",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "CRUD VUETIFY",
    };
  },
  watch: {
    //Líneas que nos permiten cerrar las cuadros de diálogos
    dialogLogout(val) {
      val || this.close();
    },
  },
  methods: {
    logOutConfirm(){
      this.$router.push({name: "login"});
    },
    logout(){
      this.dialogLogout = true; 
    },
    close() {
      this.dialogLogout = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  }
};
</script>

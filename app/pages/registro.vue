<template>
  <v-layout align-center justify-center class="start">
    <v-flex xs12 sm8 md7>
      <br /><br /><br /><br /><br />
      <v-card class="elevation-12">
        <v-toolbar dark color="#29C360">
          <v-toolbar-title>Registrarse</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field v-model="usuario.nombre" prepend-icon="mdi-account" name="login" label="Nombre de usuario" type="text"></v-text-field>
            <v-text-field v-model="usuario.password" prepend-icon="mdi-lock" name="password" label="Contraseña" type="password"></v-text-field>
            <v-text-field v-model="usuario.password2" prepend-icon="mdi-checkbox-marked-circle-outline" name="password2" label="Confirmar contraseña" type="password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <router-link to="/login"><font color="#29C360"> Iniciar Sesión </font></router-link>
          &nbsp;&nbsp;&nbsp;
          <v-btn color="#29C360" @click="falso();read(usuario.nombre,usuario.password,usuario.password2);accion(usuario.nombre,usuario.password,usuario.password2)">Registrar</v-btn>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle(usuario.nombre, usuario.password, usuario.password2) }}</span>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#29C360" text @click="close">Ok</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Register",
  props: { source: String },
  layout: "start",
  data: () => ({
    dialog: false,
    usuario: { nombre: undefined, password: undefined, passwor2: undefined },
    users: [],
    encontrado: false,
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    //Método para cerrar la caja de diálogo que indica que es necesaria una corrección en los datos ingresados.
    close() {
      this.dialog = false;
    },
    //Método para imprimir el mensaje necesario en la caja de diálogo para la validación de datos.
    formTitle(nombre, password, password2) {
      console.log(1);
      if (nombre == undefined ||password == undefined ||password2 == undefined) {
        return "Rellene todos los campos";
      } else if (password != password2) {
        return "Las contraseñas no coinciden";
      } else if (this.encontrado == true) {
        return "Este usuario ya existe";
      } else {
        return "Registro exitoso";
      }
    },
    //Método para validar los datos en el text field.
    accion(nombre, password, password2) {
      if (nombre == undefined ||password == undefined ||password2 == undefined) {
        this.dialog = true;
      } else if (password != password2) {
        this.dialog = true;
      } else if (this.encontrado == true) {
        this.dialog = true;
        console.log(this.encontrado+"HOLA");
      } else {
        this.dialog = true;
      }
    },
    //Método para sacar los registros de la tabla 'usuarios' en la base de datos 'propiedades'.
    initialize() {
      this.users = [
        this.$axios.get("https://localhost:4000/usuarios").then((r) => { this.users = r.data; }).catch((err) => console.log(err.message)),
      ];
    },
    //Método que busca en el arreglo 'users' los datos recibidos como parámetros.
    read(nombre,password,password2) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].nombre == nombre ) { this.encontrado = true; } 
        console.log(this.encontrado);
      }
      if(this.encontrado == false) {
        if(nombre != undefined && password != undefined && password2 != undefined) {
          if(password == password2) {
            this.$axios.post("https://localhost:4000/usuarios", { nombre: nombre, password: password }).then((response) => { console.log(response); })
            .catch((err) => { console.log(err); });
          }
        }
      }
    },
    //Método que reinicia la variable encontrado
    falso(){
      this.encontrado = false;
    }
  },
};
</script>
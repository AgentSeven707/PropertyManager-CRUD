<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md7>
    <br><br><br><br><br>
      <v-card class="elevation-12">
        <v-toolbar dark color="#29C360">
          <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field v-model="usuario.nombre" prepend-icon="mdi-account" name="login" label="Nombre de usuario" type="text"></v-text-field>
            <v-text-field v-model="usuario.password" prepend-icon="mdi-lock" name="password" label="Contraseña" type="password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <router-link to="/registro"><font color="#29C360">¿No te has registrado?</font></router-link>
          &nbsp;&nbsp;&nbsp;
          <v-btn color="#29C360" @click="read(usuario.nombre,usuario.password);accion(usuario.nombre,usuario.password)">Entrar</v-btn>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle(usuario.nombre,usuario.password) }}</span>
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
  name: "Login",
  props: { source: String },
  layout: 'start',
  data: () => ({
    dialog: false,
    usuario: { nombre: undefined, password: undefined },
    users: [],
    encontrado: false,
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    //Método para sacar los registros de la tabla 'usuarios' en la base de datos 'propiedades'.
    initialize() {
      this.users = [
        this.$axios.get("https://localhost:4000/usuarios").then((r) => { this.users = r.data; }).catch((err) => console.log(err.message)),
      ];
    },
    //Método para cerrar la caja de diálogo que indica que es necesaria una corrección en los datos ingresados.
    close() {
      this.dialog = false;
    },
    //Método para imprimir el mensaje necesario en la caja de diálogo para la validación de datos.
    formTitle(nombre,password) {
      if ((nombre==undefined)||(password==undefined)){
        return "Rellene todos los campos";
      } else if (this.encontrado == false) {
        return "Datos incorrectos";
      }
    }, 
    //Método para validar los datos en el text field.
    accion(nombre,password){
      //Si no hay datos o los datos no existen en la base de datos abre la caja de diálogo.
      if (nombre==undefined||password==undefined){
        this.dialog = true;
      } else if (this.encontrado == false){ 
        this.dialog = true;  
      } 
      //Si los datos son encontrados en la base de datos se dirige a la ruta 'home'. 
      else if (this.encontrado == true) {
        this.$router.push({name: "home"});
      }
    },
    //Método que busca en el arreglo 'users' los datos recibidos como parámetros.
    read(nombre,password) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].nombre == nombre && this.users[i].password == password) {
          this.encontrado = true;
        } 
      }
      //Si se validan los datos se crea un token y se asigna al archivo 'token.js'.
      this.$axios.post("https://localhost:4000/login", { username: nombre, password: password }).then((response) => {
          this.$store.commit("token/SET_TOKEN",response.data.token);
          if(this.$store.state.token.token){ console.log("Si se guardó") }
      }).catch((err) => { console.log(err); });
    },
  }
};
</script>
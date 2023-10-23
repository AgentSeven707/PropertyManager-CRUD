<template>
  <v-data-table :headers="headers" :items="personas" sort-by="id" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="#9AA42B">
        <v-toolbar-title>Personas</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }"><v-btn color="#805E23" dark class="mb-2" v-bind="attrs" v-on="on">Nueva Persona</v-btn></template>
          <v-card>
            <v-card-title><span class="text-h5">{{ formTitle }}</span></v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4"></v-col>
                  <v-text-field v-model="editedItem.rfc" label="Clave RFC"></v-text-field>
                  <v-col cols="12" sm="6" md="4"></v-col>
                  <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  <v-col cols="12" sm="6" md="4"></v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="createPersona(editedItem);close();">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogB" max-width="500px">
          <v-card>
            <v-card-title><span class="text-h5">{{ formTitle }}</span></v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4"></v-col>
                  <v-text-field v-model="editedItem.rfc" label="Clave RFC"></v-text-field>
                  <v-col cols="12" sm="6" md="4"></v-col>
                  <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  <v-col cols="12" sm="6" md="4"></v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="updatePersona(editedItem);close();">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogC" max-width="500px">
          <v-card>
            <v-card-title><span class="text-h5">Asignar propiedad a propietario</span></v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4"></v-col>
                  <v-text-field v-model="editedItem.clave" label="Clave de propiedad"></v-text-field>
                  <v-col cols="12" sm="6" md="4"></v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="setPropiedad(editedItem);close();">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogD" max-width="500px">
          <v-card>
            <v-card-title><span class="text-h5">Asignar propiedad a arrendador</span></v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4"></v-col>
                  <v-text-field v-model="editedItem.clave" label="Clave de propiedad"></v-text-field>
                  <v-col cols="12" sm="6" md="4"></v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="setArrendador(editedItem);close();">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogE" max-width="500px">
          <v-card>
            <v-card-title><span class="text-h5">Desarrendar propiedad</span></v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title>¿Seguro que desea eliminar a esta persona?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-tooltip top color="#15AE92">
      <template v-slot:activator="{ on, attrs }">
        <v-icon color="#00e69d" small class="mr-2" v-bind="attrs" v-on="on" @click="updatePersona(item)">mdi-lead-pencil</v-icon>
      </template>
      <span>Editar</span>
      </v-tooltip>

      <v-tooltip top color="#e60058">
      <template v-slot:activator="{ on, attrs }">
        <v-icon color="#e60058" small class="mr-2" v-bind="attrs" v-on="on" @click="deleteItem(item)">mdi-delete-forever</v-icon>
      </template>
      <span>Eliminar</span>
      </v-tooltip>

      <v-tooltip top color="#25AE37">
      <template v-slot:activator="{ on, attrs }">
        <v-icon color="#77ff00" small class="mr-2" v-bind="attrs" v-on="on" @click="setPropiedad(item)">mdi-home</v-icon>
      </template>
      <span>Agregar Propiedad</span>
      </v-tooltip>

      <v-tooltip top color="#1E9BDA">
      <template v-slot:activator="{ on, attrs }">
        <v-icon color="#00e5ff" small class="mr-2" v-bind="attrs" v-on="on" @click="setArrendador(item)">mdi-home-outline</v-icon>
      </template>
      <span>Asignar Arrendador</span>
      </v-tooltip>

      <v-tooltip top color="#FF1717">
      <template v-slot:activator="{ on, attrs }">
        <v-icon color="#FF1717" small v-bind="attrs" v-on="on" @click="deleteArrendador(item)">mdi-home-outline</v-icon>
      </template>
      <span>Eliminar Arrendador</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    //Crea los datos asignados a la tabla creada con html
    dialog: false,
    dialogB: false,
    dialogC: false,
    dialogD: false,
    dialogE: false,
    dialogDelete: false,
    headers: [
      { text: "Id", align: "start", value: "id" },
      { text: "Clave RFC", value: "rfc" },
      { text: "Nombre", value: "nombre" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    personas: [],
    editedIndex: -1,
    editedItem: { rfc: undefined, nombre: undefined, clave: undefined },
    deletedItem: {},
    defaultItem: { rfc: undefined, nombre: undefined, clave: undefined },
  }),
  computed: {
    //Contenido que se mostrará en los cuadro de diálogo para saber la acción a realizar
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Persona" : "Editar Persona";
    },
  },
  watch: {
    //Líneas que nos permiten cerrar las cuadros de diálogos
    dialog(val) {
      val || this.close();
    },
    dialogB(val) {
      val || this.close();
    },
    dialogC(val) {
      val || this.close();
    },
    dialogD(val) {
      val || this.close();
    },
    dialogE(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.close();
    },
  },
  created() {
    //LLena las tablas con el contenido correspondiente
    this.initialize();
  },
  methods: {
    //Obtiene la información de la base de datos por medio de una ruta al método del backend
    initialize() {
      if(this.$store.state.token.token){
        this.personas = [
          this.$axios.get("https://localhost:4000/propietarios").then((r) => { this.personas = r.data; save(); }).catch((err) => console.log(err.message)),
          ];
      };
    },
    //Agrega información a la base de datos por medio de una ruta al método del backend
    createPersona(item) {
      if(this.$store.state.token.token&&item.nombre!=undefined&&item.rfc!=undefined){
        this.$axios.post("https://localhost:4000/propietarios", { nombre: item.nombre, rfc: item.rfc }).then((response) => { console.log(response); this.initialize();}).catch((err) => { console.log(err); });
      };
    },
    //Modifica la información de la base de datos por medio de una ruta al método del backend
    updatePersona(item) {
      this.editedIndex = this.personas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogB = true;
      this.$axios.put("https://localhost:4000/propietarios/" + item.id, { nombre: item.nombre, rfc: item.rfc }).then((response) => { console.log(response); this.initialize(); }).catch((err) => { console.log(err); });
    },
    //Modifica la información de la base de datos por medio de una ruta al método del backend
    setPropiedad(item) {
      this.editedIndex = this.personas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogC = true;
      var url = "https://localhost:4000/propiedades/propietarios/" + item.clave + "/" + item.rfc;
      console.log(url);
      if (item.rfc != undefined && item.clave != undefined){
        this.$axios.put(url, {}).then((response) => { console.log(response); }).catch((err) => { console.log(err); this.initialize(); });
      }
    },
    //Modifica la información de la base de datos por medio de una ruta al método del backend
    setArrendador(item) {
      this.editedIndex = this.personas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogD = true;
      var url = "https://localhost:4000/propiedades/arrendador/" + item.clave + "/" + item.rfc;
      console.log(url);
        if (item.rfc != undefined && item.clave != undefined){
          this.$axios.put(url, {}).then((response) => { console.log(response); this.initialize(); }).catch((err) => { console.log(err); });
        } 
    },
    //Modifica la información de la base de datos por medio de una ruta al método del backend
    deleteArrendador(item){
      this.editedIndex = this.personas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogE = true;
        if (item.clave != undefined) {
          this.$axios.put("https://localhost:4000/propiedades/desarrendar/" + item.clave, {}).then((response) => { console.log(response); this.initialize(); }).catch((err) => { console.log(err); });
        }
    },
    //Edita la información de la tabla del front
    editItem(item) {
      this.editedIndex = this.personas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    //Elimina información de la tabla del front
    deleteItem(item) {
      this.editedIndex = this.personas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      this.deleteItem = item;
    },
    //Elimina información de la base de datos por medio de una ruta al método del backend
    deleteItemConfirm() {
      this.personas.splice(this.editedIndex, 1);
      this.close();
      this.$axios.delete("https://localhost:4000/propietarios/" + this.deleteItem.id);
    },
    //Función que cierra el cuadro de diálogo para agregar un item
    close() {
      this.dialog = false;
      this.dialogB = false;
      this.dialogC = false;
      this.dialogD = false;
      this.dialogE = false;
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    //Función que guarda la información sacada del cuadro de diálogo para agregar un item
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.personas[this.editedIndex], this.editedItem);
      } else {
        this.personas.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
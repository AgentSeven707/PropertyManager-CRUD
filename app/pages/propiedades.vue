<template>
  <v-data-table :headers="headers" :items="propiedades" sort-by="id" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color = "#33CA58">
        <v-toolbar-title>Propiedades</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }"><v-btn color="#128374" dark class="mb-2" v-bind="attrs" v-on="on">Nueva Propiedad</v-btn></template>
          <v-card>
            <v-card-title><span class="text-h5">{{ formTitle }}</span></v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4"></v-col>
                  <v-text-field v-model="editedItem.clave" label="Clave Catastral"></v-text-field>
                  <v-col cols="12" sm="6" md="4"></v-col>
                  <v-text-field v-model="editedItem.descripcion" label="Descripción"></v-text-field>
                  <v-col cols="12" sm="6" md="4"></v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="createPropiedad(editedItem);close()">Guardar</v-btn>
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
                  <v-text-field v-model="editedItem.clave" label="Clave Catastral"></v-text-field>
                  <v-col cols="12" sm="6" md="4"></v-col>
                  <v-text-field v-model="editedItem.descripcion" label="Descripción"></v-text-field>
                  <v-col cols="12" sm="6" md="4"></v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="updatePropiedad(editedItem);close()">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogC" max-width="500px">
          <v-card>
            <v-card-title><span class="text-h5">Asignar propietario a propiedad</span></v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4"></v-col>
                  <v-text-field v-model="editedItem.rfc" label="RFC de propietario"></v-text-field>
                  <v-col cols="12" sm="6" md="4"></v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="setPropietario(editedItem);close()">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogD" max-width="500px">
          <v-card>
            <v-card-title><span class="text-h5">Asignar arrendador a propiedad</span></v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4"></v-col>
                  <v-text-field v-model="editedItem.rfc" label="RFC de arrendador"></v-text-field>
                  <v-col cols="12" sm="6" md="4"></v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="setArrendador(editedItem);close()">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogE" max-width="500px">
          <v-card>
            <v-card-title><span class="text-h5">Propiedad desarrendada</span></v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title>¿Seguro que desea eliminar a esta propiedad?</v-card-title>
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
        <v-icon color="#00e69d" small class="mr-2" v-bind="attrs" v-on="on" @click="updatePropiedad(item)">mdi-lead-pencil</v-icon>
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
        <v-icon color="#77ff00" small class="mr-2" v-bind="attrs" v-on="on" @click="setPropietario(item)">mdi-account</v-icon>
      </template>
      <span>Agregar Propietario</span>
      </v-tooltip>

      <v-tooltip top color="#1E9BDA">
      <template v-slot:activator="{ on, attrs }">
        <v-icon color="#00e5ff" small class="mr-2" v-bind="attrs" v-on="on" @click="setArrendador(item)">mdi-account-circle</v-icon>
      </template>
      <span>Asignar Arrendador</span>
      </v-tooltip>

      <v-tooltip top color="#FF1717">
      <template v-slot:activator="{ on, attrs }">
        <v-icon color="#FF1717" small v-bind="attrs" v-on="on" @click="deleteArrendador(item)">mdi-account-circle</v-icon>
      </template>
      <span>Eliminar Arrendador</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  //Crea los datos asignados a la tabla creada con html
  data: () => ({ 
    dialog: false,
    dialogB: false,
    dialogC: false,
    dialogD: false,
    dialogE: false,
    dialogDelete: false,
    headers: [
      { text: "Id", align: "start", value: "id" },
      { text: "Clave Catastral", value: "clave" },
      { text: "Descripción", value: "descripcion" },
      { text: "Arrendador Nombre", value: "arrendatario.nombre" },
      { text: "Arrendador RFC", value: "arrendatario.rfc" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    propiedades: [],
    editedIndex: -1,
    editedItem: { clave: undefined, descripcion: undefined, rfc:undefined },
    deletedItem: {},
    defaultItem: { clave: undefined, descripcion: undefined, rfc:undefined },
  }),
  computed: { 
    //Contenido que se mostrará en los cuadro de diálogo para saber la acción a realizar
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Propiedad" : "Editar Propiedad";
    },
  },
  watch: { 
    // Lineas que nos permiten cerrar las cuadros de diálogos
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
        this.propiedades = [
          this.$axios.get("https://localhost:4000/propiedades").then((r) => { this.propiedades = r.data; save(); }).catch((err) => console.log(err.message)),
        ];
      };
    },
    //Agrega información a la base de datos por medio de una ruta al método del backend
    createPropiedad(item) { 
      if(this.$store.state.token.token&&item.clave!=undefined&&item.descripcion!=undefined){
        var id
        this.$axios.post("https://localhost:4000/propiedades", { clave: item.clave, descripcion: item.descripcion }).then(response => {
            console.log(JSON.stringify (response))
            id = response.data.id
            this.$axios.put("https://localhost:4000/propiedades/arrendador/" + id + "/" + item.arrendatarioId)
            this.initialize();
          }).catch(err => { console.log(err) })
      };
    },
    //Modifica la información de la base de datos por medio de una ruta al método del backend 
    updatePropiedad(item) { 
      this.editedIndex = this.propiedades.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogB = true;
      var id = item.id;
      this.$axios.put("https://localhost:4000/propiedades/" + id, { id: item.id, clave: item.clave, descripcion: item.descripcion }).then(response => { console.log(response); this.initialize();
      }).catch(err => { console.log(err) })
    },
    //Modifica la información de la base de datos por medio de una ruta al método del backend
    setPropietario(item) {
      this.editedIndex = this.propiedades.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogC = true;
      var url = "https://localhost:4000/propiedades/propietarios/" + item.clave + "/" + item.rfc;
      console.log(url);
      if (item.rfc != undefined && item.clave != undefined){
        this.$axios.put(url, {}).then((response) => { console.log(response); this.initialize(); }).catch((err) => { console.log(err); });
      }
    },
    //Modifica la información de la base de datos por medio de una ruta al método del backend
    setArrendador(item) {
      this.editedIndex = this.propiedades.indexOf(item);
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
      this.editedIndex = this.propiedades.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogE = true;
        if (item.clave != undefined) {
          this.$axios.put("https://localhost:4000/propiedades/desarrendar/" + item.clave, {}).then((response) => { console.log(response); this.initialize(); }).catch((err) => { console.log(err); });
        }
    },
    //Edita la información de la tabla del front
    editItem(item) { 
      this.editedIndex = this.propiedades.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    //Elimina información de la tabla del front
    deleteItem(item) { 
      this.editedIndex = this.propiedades.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      this.deleteItem = item;
    },
    //Elimina información de la base de datos por medio de una ruta al método del backend 
    deleteItemConfirm() { 
      this.propiedades.splice(this.editedIndex, 1);
      this.close();
      this.$axios.delete("https://localhost:4000/propiedades/" + this.deleteItem.id)
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
        Object.assign(this.propiedades[this.editedIndex], this.editedItem);
      } else {
        this.propiedades.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

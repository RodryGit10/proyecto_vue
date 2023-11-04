<template>
    <div class="container">
        <h5>Areas</h5>
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="agregar()">
                    <h5>Agregar Nueva Area</h5>
                    <p>Area: <input type="text" placeholder="Escribir Area" class="input-con-placeholder"
                            v-model="payload.unidad" required /></p>
                    <p>Encargado: <input type="text" placeholder="Escribir Nombre del Encargado del Area"
                            class="input-con-placeholder" v-model="payload.encargado" required /></p>
                    <p> Cantidad de Personal<input type="text" placeholder="Escribir Acantidad de funcionarios"
                            class="input-con-placeholder" v-model="payload.numeroFuncionarios" required /></p>
                    <button type="submit" class="waves-effect waves-light btn-small">Agregar</button>
                </form>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <form @submit.prevent="getList()">
                    <h5>Buscar Area</h5>
                    <p>Area: <input type="search" v-model="search" @search="getList()" /></p>
                    <button type="submit" class="waves-effect waves-light btn-small">buscar</button>
                </form>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>AREA</th>
                            <th>ENCARGADO</th>
                            <th>CATIDAD</th>
                            <th>ELIMINAR</th>
                            <th>EDITAR</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.unidad }}</td>
                            <td>{{ item.encargado }}</td>
                            <td>{{ item.numeroFuncionarios }}</td>
                            <td>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light red"><i
                                        class="material-icons" @click="eliminar(item.id)">delete</i></a>
                            </td>
                            <td>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light green "><i
                                        class="material-icons" @click="update(item.id)">edit</i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import M from "materialize-css";
export default {
    name: 'CategoryView',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            items: [],
            search: '',
            payload: {
                name: null
            }

        }
    },
    methods: {
        update(id) {
            this.$router.push('/area/' + id);
        },
        eliminar(id) {
            if (confirm("Esta seguro de eliminar?.")) {
                this.axios({
                    method: 'delete',
                    url: this.api + '/areas/' + id
                }).
                    then(() => {
                        this.getList();
                    }).
                    catch((error) => {
                        console.log(error);
                    });
            }
        },
        agregar() {
            this.axios({
                method: 'post',
                url: this.api + '/areas',
                data: this.payload
            }).
                then((response) => {
                    this.getList();
                    console.log(response);
                }).
                catch((error) => {
                    console.log(error);
                });
        },
        getList() {
            this.axios({
                method: 'get',
                url: this.api + '/areas?q='+ this.search
            }).
                then((response) => {
                    this.items = response.data;
                }).
                catch((error) => {
                    console.log(error);
                });
        },
    },
    components: {

    },
    mounted() {
        this.getList();
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    },
}
</script>

<style lang="scss">
.input-con-placeholder::placeholder {
    color: rgb(168, 111, 180);
}
</style>

<template>
    <div class="container">
        <h5>Activos</h5>
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="nuevo()">
                    <h5>Nuevo Activo</h5>
                    <p>Nombre del Activo: <input type="text" v-model="payload.tipoActivo" required /></p>
                    <p>Marca: <input type="text" v-model="payload.marca" required /></p>
                    <p>Modelo: <input type="text" v-model="payload.modelo" required /></p>
                    <p v-if="areas.length > 0">Areas:
                        <select v-model="payload.areaId">
                            <option :value="area.id" v-for="area in areas" :key="area.id">{{ area.area
                            }}</option>
                        </select>
                    </p>
                    <button type="submit" class="waves-effect waves-light btn-small">Agregar</button>
                </form>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <form @submit.prevent="getList()">
                    <h5>Buscar Activo</h5>
                    <p>Nombre Activo: <input type="search" v-model="search" @search="getList()" /></p>
                    <button type="submit" class="waves-effect waves-light btn-small">buscar</button>
                </form>
            </div>
        </div>


        <div class="card">
            <div class="card-content">
                <h5>filtros</h5>
                <div class="input-field ">
                    <select @change="filter('active', $event.target.value)">
                        <option value="" selected>todos</option>
                        <option value="true">activo</option>
                        <option value="false">inactivo</option>
                    </select>
                    <label> Seleccionar</label>
                </div>

            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre Activo</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Estado</th>
                            <th>Area</th>
                            <th>Eliminar</th>
                            <th>Editar</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td>{{ (item.id - 1) }}</td>
                            <td>{{ item.tipoActivo }}</td>
                            <td>{{ item.marca }}</td>
                            <td>{{ item.modelo }}</td>
                            <td>{{ item.active ? "activo" : "inactivo" }}</td>

                            <td v-for="area in areas" :key="area.id">{{ area.area }}</td>
                            <!-- <td>{{ item.category.name }}</td> -->
                            <td>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light red"><i
                                        class="material-icons" @click="eliminar(item.id)">delete</i></a>
                            </td>
                            <td>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light blue "><i
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
    name: 'ActivosView',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            items: [],
            search: '',
            toFilter: '',
            areas: [],
            payload: {
                tipoActivo: null,
                marca: null,
                modelo: null,
                active: true,
                areaId: null
            }
        }
    },
    methods: {
        filter(name, value) {
            this.toFilter = value === '' ? '' : '&' + name + '=' + value;
            this.getList();
        },
        update(id) {
            this.$router.push('/activo/' + id);
        },
        eliminar(id) {
            if (confirm("Esta seguro de eliminar?.")) {
                this.axios({
                    method: 'delete',
                    url: this.api + '/activos/' + id
                }).
                    then(() => {
                        this.getList();
                    }).
                    catch((error) => {
                        console.log(error);
                    });
            }
        },
        nuevo() {
            this.axios({
                method: 'post',
                url: this.api + '/activos',
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
                url: this.api + '/activos?q=' + this.search + this.toFilter
            }).
                then((response) => {
                    this.items = response.data;
                }).
                catch((error) => {
                    console.log(error);
                })
        },
        getActivoList() {
            this.axios({
                method: 'get',
                url: this.api + '/areas?q='
            }).
                then((response) => {
                    this.areas = response.data;
                    const intervalo = setTimeout(() => {
                        this.intSelect();
                        clearTimeout(intervalo);
                    }, 3000);

                }).
                catch((error) => {
                    console.log(error);
                })
        },
        intSelect() {
            this.getList();
            this.getActivoList();
            var elems = document.querySelectorAll('select');
            M.FormSelect.init(elems);
        }
    },
    components: {

    },
    mounted() {
        this.getList();
        this.getActivoList();
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }
}
</script>
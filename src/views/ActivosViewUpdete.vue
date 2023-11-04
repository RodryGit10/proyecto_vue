<template>
    <div class="container">
        <h5>Editar Activo</h5>
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="update()">
                    <p>Nombre del Activo: <input type="text" v-model="payload.tipoActivo" required /></p>
                    <p>Marca: <input type="text" v-model="payload.marca" required /></p>
                    <p>Modelo: <input type="text" v-model="payload.modelo" required /></p>
                    <p v-if="areas.length > 0">Areas:
                        <select v-model="payload.areaId">
                            <option :value="area.id" v-for="area in areas" :key="area.id">{{ area.unidad
                            }}</option>
                        </select>
                    </p>
                    <p>
                        <label>
                            <input type="checkbox" class="filled-in" v-model="payload.active" />
                            <span>Activo</span>
                        </label>
                    </p>
                    <button type="submit" class="waves-effect waves-light btn-small">Editar</button>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import M from "materialize-css";
export default {
    name: 'ActivoUpdateView',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
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
        getOne() {
            this.axios({
                method: 'get',
                url: this.api + '/activos/' + this.$route.params.id
            }).
                then((response) => {
                    this.payload = response.data;
                }).
                catch((error) => {
                    console.log(error);
                });
        },
        update() {
            if (confirm("Esta seguro de editar?.")) {
                this.axios({
                    method: 'patch',
                    url: this.api + '/activos/' + this.$route.params.id,
                    data: this.payload
                }).
                    then((response) => {
                        console.log(response);
                    }).
                    catch((error) => {
                        console.log(error);
                    });
                this.$router.push('/activo');
            }
        },
        getAreaList() {
            this.axios({
                method: 'get',
                url: this.api + '/areas'
            }).
                then((response) => {
                    this.areas = response.data;
                }).
                catch((error) => {
                    console.log(error);
                })
        },
        intSelect() {
            this.getOne();
            this.getAreaList();
            var elems = document.querySelectorAll('select');
            M.FormSelect.init(elems);
        },
    },
    components: {

    },
    mounted() {
        this.getOne();
        this.getAreaList();
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }
}
</script>
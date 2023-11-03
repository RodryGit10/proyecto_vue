<template>
    <div class="container">
        <h5> Actualizar </h5>

        <div class="card">
            <div class="card-content">
                <form @submit.prevent="update()">
                    <p>Nombre del Activo: <input type="text" v-model="payload.tipoActivo" required /></p>
                    <p>Marca: <input type="text" v-model="payload.marca" required /></p>
                    <p>Modelo: <input type="text" v-model="payload.modelo" required /></p>
                    
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
export default {
    name: 'ActivosViewUpdete',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            items: [],
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
                url: this.api + '/areas/' + this.$route.params.id
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
            }
            this.$router.push('/activo');
        }
    },
    components: {

    },
    mounted() {
        this.getOne();
    }
}
</script>
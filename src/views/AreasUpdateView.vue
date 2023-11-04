<template>
    <div class="container">
        <h5>Editar Area</h5>
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="update()">
                    <p>Area: <input type="text" v-model="payload.unidad" required /></p>
                    <p>Encargado: <input type="text" v-model="payload.encargado" required /></p>
                    <p>Candidad Funcionarios: <input type="text" v-model="payload.numeroFuncionarios" required /></p>
                    <button type="submit" class="waves-effect waves-light btn-small">Editar</button>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'CategoryView',
    data() {
        const api = process.env.VUE_APP_API;
        return {
            api,
            items: [],
            payload: {
                unidad: null,
                encargado: null,
                numeroFuncionarios: null
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
                    url: this.api + '/areas/' + this.$route.params.id,
                    data: this.payload
                }).
                    then((response) => {
                        console.log(response);
                    }).
                    catch((error) => {
                        console.log(error);
                    });
                this.$router.push('/area');
            }
        }
    },
    components: {

    },
    mounted() {
        this.getOne();
    }
}
</script>
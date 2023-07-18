<template>
    <section class="container-xl">
        <div class="row py-5 d-flex justify-content-center">
            <div class="col-12 col-lg-6">
                <h1>Me connecter</h1>
                <SignIn />
            </div>
        </div>
    </section>
</template>
<script>
import SignIn from "../components/commons/SignIn.vue"

export default {
    data() {
        return {
            wrongIdentifier: false,
            identifier: "",
            password: ""
        }
    },

    components: {
        SignIn
    },
}
</script>
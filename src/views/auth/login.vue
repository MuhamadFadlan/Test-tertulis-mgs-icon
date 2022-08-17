<template>
    <div>
        <form class="tes login" @submit.prevent="store()">
            <h1>Login to your Account</h1>
            <label for="">username</label>
            <input type="text" v-model="auth.username" required>
            <div v-if="validation.email">
                {{ validation.username[0] }}
            </div>
            <label for="">Password</label>
            <input type="password" v-model="auth.password" required>
            <div v-if="validation.password">
                {{ validation.password[0] }}
            </div>
            <button>Login</button>
        </form>
        <h5>Dont have an account?<router-link :to="{ name: 'auth.register'}" class="router">&nbsp Register</router-link></h5>
        <h5>Forgotten your password? <a class="router">&nbsp Recover password</a></h5>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup(){
        const auth = reactive({
        username: '',
        password: '',
    });

    const validation = ref([]);
    const router = useRouter();

    function store() {
        axios.post(
            'http://159.223.57.121:8080/auth/do-login',
            auth
        )
        .then(() => {
            router.push({
                name: 'auth.index'
            });
        }).catch((err) => {
            validation.value = err.response.data
        });
    }

    return {
        auth,
        validation,
        router,
        store
    }
    }
}
</script>

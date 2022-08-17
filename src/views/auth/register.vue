<template>
    <div>
        <form class="tes" @submit.prevent="store()">
            <h1>Create Your Account</h1>
            <label for="">Username</label>
            <input type="text" v-model="auth.username" required>
            <div v-if="validation.username">
                {{ validation.username[0] }}
            </div>
            <label for="">Password</label>
            <input type="password" v-model="auth.password" id="psw" name="psw" pattern="(?=.).{8,}" title="Harus berisi setidaknya 8 karakter atau lebih" required>
            <div v-if="validation.password">
                {{ validation.password[0] }}
            </div>
            <label for="" >Profile Name</label>
            <input type="text" v-model="auth.profileName" required>
            <div v-if="validation.profileName">
                {{ validation.profileName[0] }}
            </div>
            <label for="">address</label>
            <input type="text" v-model="auth.address" required>
            <div v-if="validation.address">
                {{ validation.address[0] }}
            </div>
          
            <div class="tandc">
                <input type="checkbox" class="in">
                <label for="">To register with us please tick to agree to our <a class="terms">terms and conditions</a></label>
            </div>
            <button onclick="myalert() ">Sign up</button>

        </form>
        <h5>Already have an account?<router-link :to="{ name: 'auth.login'}" class="router">&nbsp Sign in</router-link></h5>
    </div>
    <div id="message">
        <h3> Password harus terdiri dari: </h3>
        <p id = "length" class = "invalid"> Minimal <b> 8 karakter </b> </p>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup(){
        const auth = reactive({
        address: '',
        profileName: '',
        username: '',
        password: '',
    });

    const validation = ref([]);
    const router = useRouter();

    function store() {
        axios.post(
            ' http://159.223.57.121:8080/auth/do-register',
            auth
        )
        .then(() => {
            router.push({
                name: 'books.index'
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

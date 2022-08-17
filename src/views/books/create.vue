<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <router-link :to="{ name: 'books.index' }" class="btn btn-primary btn-sm rounded shadow mb-3">
                    Back
                </router-link>
                <div class="card rounded shadow">
                    <div class="card-header">
                        Create books
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store()">
                            <div class="mb-3">
                                <label for="" class="form-label">title</label>
                                <input type="text" class="form-control" v-model="books.title" placeholder="johndoe">
                                <div v-if="validation.title" class="text-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">ISBN</label>
                                <input type="text" class="form-control" v-model="books.isbn" placeholder="242342sda">
                                <div v-if="validation.isbn" class="text-danger">
                                    {{ validation.isbn[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">publisher</label>
                                <input type="text" class="form-control" v-model="books.publisher" placeholder="johndoe">
                                <div v-if="validation.publisher" class="text-danger">
                                    {{ validation.publisher[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">description</label>
                                <input type="text" class="form-control" v-model="books.description" >
                                <div v-if="validation.description" class="text-danger">
                                    {{ validation.description[0] }}
                                </div>
                            </div>
                            <button class="btn btn-outline-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup(){
        const books = reactive({
        title: '',
        isbn: '',
        publisher: '',
        description: '',
    });

    const validation = ref([]);
    const router = useRouter();

    function store() {
        axios.post(
            'http://159.223.57.121:8080/books',
            books
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
        books,
        validation,
        router,
        store
    }
    }
}
</script>
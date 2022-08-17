<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <router-link :to="{ name: 'books.index' }" class="btn btn-primary btn-sm rounded shadow mb-3">
                    Back
                </router-link>
                <div class="card rounded shadow">
                    <div class="card-header">
                        Edit books
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="update()">
                            <div class="mb-3">
                                <label for="" class="form-label">Title</label>
                                <input type="text" class="form-control" v-model="books.title">
                                <div v-if="validation.title" class="text-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">ISBN</label>
                                <input type="text" class="form-control" v-model="books.isbn">
                                <div v-if="validation.isbn" class="text-danger">
                                    {{ validation.isbn[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Penerbit</label>
                                <input type="text" class="form-control" v-model="books.publisher">
                                <div v-if="validation.publisher" class="text-danger">
                                    {{ validation.publisher[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Deskripsi</label>
                                <input type="text" class="form-control" v-model="books.description">
                                <div v-if="validation.type" class="text-danger">
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
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    setup(){
        let books = reactive({
            title: '',
            isbn: '',
            publisher: '',
            descripti: '',
        });

        const validation = ref([]);
        const router = useRouter();
        const route = useRoute();

        onMounted(() => {
            axios.get(`http://159.223.57.121:8080/books${route.params.id}`)
            .then((result) => {
                books.title = result.data.data.title
                books.isbn = result.data.data.isbn
                books.publisher = result.data.data.publisher
                books.description = result.data.data.description  
            }).catch((err) => {
                console.log(err.response.data)
            });
        })

        function update() {
            axios.put(
                `http://159.223.57.121:8080/books${route.params.id}`,
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
            update
        }
    }
}
</script>
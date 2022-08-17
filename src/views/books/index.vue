<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <router-link :to="{ name: 'books.create' }" class="btn btn-primary btn-sm rounded shadow mb-3">
                    Add
                </router-link>
                <div class="card rounded shadow">
                    <div class="card-header">
                        books List
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>No. </th>
                                    <th>title</th>
                                    <th>ISBN</th>
                                    <th>publisher</th>
                                    <th>description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(books, index) in    books.data" :key="index">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ books.title }}</td>
                                    <td>{{ books.isbn }}</td>
                                    <td>{{ books.publisher }}</td>
                                    <td>{{ books.description }}</td>
                                    <td>
                                        <div class="btn-group">
                                            <router-link :to="{name: 'books.edit', params:{id: books.id}}" class="btn btn-sm btn-outline-info">
                                                Edit
                                            </router-link>
                                            <button class="btn btn-sm btn-outline-danger" @click.prevent="destroy(books.id, index)">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="my-5">
                    <button v-on:click.prevent="gantiHalaman(prev_page_url)" class="btn btn-primary">Prev</button>
                    <button v-on:click.prevent="gantiHalaman(next_page_url)" class="btn btn-primary">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {onMounted, ref} from 'vue'

    export default {
        setup() {
            let books = ref([]);

            onMounted(() => {
                axios.get('http://159.223.57.121:8080/books')
                .then((result) => {
                        books.value = result.data.data;
                }) .catch((err) => {
                    console.log(err.response)
                });
            });

            function destroy(id, index){
                axios.delete(
                    ` http://159.223.57.121:8080/books/findbyid/{id}${id}`,
                )
                .then(() => {
                        books.value.data.splice(index, 1)
                }).catch((err) => {
                    console.log(err.response.data)
                });
            }

            return {
                books,
                destroy
            }
        }
    }
</script>
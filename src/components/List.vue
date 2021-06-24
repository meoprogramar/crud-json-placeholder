<template>
   <div>
      <v-data-table
         :headers="headers"
         :items="posts"
         :loading="loadingPosts"
         class="elevation-3"
         disable-sort
      >
         <template v-slot:top>
            <div class="d-flex justify-space-between align-center px-5 pt-3">
               <p class="title">Posts</p>

               <v-btn @click="$emit('addPost')" color="primary">
                  Novo post
                  <v-icon right>mdi-plus</v-icon>
               </v-btn>
            </div>
         </template>

         <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="$emit('updatePost', item)">
               mdi-pencil
            </v-icon>
            <v-icon small @click="deletePost(item)" color="error">
               mdi-delete
            </v-icon>
         </template>
      </v-data-table>
   </div>
</template>

<script>
import postsService from "../service/postsService";

export default {
   name: "List",

   data: function () {
      return {
         headers: [
            {
               text: "Identificador",
               value: "id",
            },
            { text: "Título", value: "title" },
            { text: "Mensagem", value: "body" },
            { text: "Ações", value: "actions" },
         ],

         posts: [],

         loadingPosts: false,
      };
   },

   methods: {
      async getAllPosts() {
         this.loadingPosts = true;

         try {
            const response = await postsService.getAllPosts();

            this.posts = Object.assign([], response.data);
         } catch (error) {
            alert("Erro ao consultar posts!");
         } finally {
            this.loadingPosts = false;
         }
      },

      async deletePost(item) {
         try {
            await postsService.removePost(item.id);

            alert("Post excluído com sucesso!");
            this.$emit("postRemoved");
         } catch (error) {
            alert("Erro ao excluir um post!");
         }
      },
   },

   created() {
      this.getAllPosts();
   },
};
</script>

<style>
</style>
<template>
   <div>
      <p class="title">Post</p>

      <v-form ref="form">
         <v-row>
            <v-col cols="12" md="4">
               <v-text-field
                  v-model="post.title"
                  :rules="[(value) => !!value || 'Título obrigatório.']"
                  label="Título*"
               ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
               <v-text-field
                  v-model="post.body"
                  :rules="[(value) => !!value || 'Mensagem obrigatória.']"
                  label="Mensagem*"
               ></v-text-field>
            </v-col>
         </v-row>
      </v-form>

      <div class="d-flex justify-space-between align-center mt-5">
         <v-btn @click="$emit('cancelPost')" color="primary" text
            >Cancelar</v-btn
         >
         <v-btn @click="save" color="primary" :loading="loadingSave"
            >Salvar</v-btn
         >
      </div>
   </div>
</template>

<script>
import postsService from "../service/postsService";
export default {
   name: "Form",

   props: {
      post: {
         type: Object,
         default: () => ({}),
      },
   },

   data: function () {
      return {
         loadingSave: false,
      };
   },

   methods: {
      executeValidation() {
         return this.$refs.form ? this.$refs.form.validate() : null;
      },

      resetValidation() {
         if (this.$refs.form) this.$refs.form.resetValidation();
      },

      save() {
         if (this.post.id) this.updatePost(this.post.id, this.post);
         else this.createPost(this.post);
      },

      async createPost(post) {
         if (!this.executeValidation()) return;

         this.loadingSave = true;

         try {
            await postsService.createPost(post);

            alert("Post cadastrado com sucesso!");
            this.$emit("postCreated");
         } catch (error) {
            alert("Erro ao cadastrar o post!");
         } finally {
            this.loadingSave = false;
         }
      },

      async updatePost(postId, post) {
         if (!this.executeValidation()) return;

         this.loadingSave = true;

         try {
            await postsService.updatePost(postId, post);

            alert("Post atualizado com sucesso!");
            this.$emit("postUpdated");
         } catch (error) {
            alert("Erro ao atualizar o post!");
         } finally {
            this.loadingSave = false;
         }
      },
   },
};
</script>

<style>
</style>
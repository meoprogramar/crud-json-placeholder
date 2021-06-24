<template>
   <v-app>
      <v-app-bar app color="primary" dark>CRUD</v-app-bar>

      <v-main>
         <div class="content">
            <v-dialog v-model="dialog" max-width="1000">
               <v-card class="pa-7">
                  <Form
                     @cancelPost="closeDialog"
                     @postCreated="
                        closeDialog();
                        refreshPosts();
                     "
                     @postUpdated="
                        closeDialog();
                        refreshPosts();
                     "
                     :post="postSelected"
                  />
               </v-card>
            </v-dialog>

            <List
               @addPost="addPost"
               @updatePost="updatePost"
               @postRemoved="refreshPosts"
               ref="list"
            />
         </div>
      </v-main>
   </v-app>
</template>

<script>
import Form from "./components/Form.vue";
import List from "./components/List.vue";

export default {
   name: "App",

   components: { List, Form },

   data: function () {
      return {
         postSelected: {},
         dialog: false,
      };
   },

   methods: {
      openDialog() {
         this.dialog = true;
      },

      closeDialog() {
         this.dialog = false;
      },

      updatePost(post) {
         this.postSelected = Object.assign({}, post);
         this.openDialog();
      },

      addPost() {
         this.postSelected = {};
         this.openDialog();
      },

      refreshPosts() {
         this.$refs.list.getAllPosts();
      },
   },
};
</script>

<style  scoped>
.content {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: stretch;
   padding: 5% 10%;
}
</style>

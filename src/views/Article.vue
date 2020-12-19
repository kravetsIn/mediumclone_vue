<template>
  <div class="article-page">
    <div class="banner" v-if="article">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <div class="article-meta">
          <router-link :to="{name: 'userProfile', params: article.author.username}">
            <img :src="article.author.image" :alt="article.author.username"/>
          </router-link>

          <div class="info">
            <router-link :to="{name: 'userProfile', params: article.author.username}">
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>

          <span v-if="isAuthor">
            <router-link class="btn btn-outline-secondary btn-sm"
                         :to="{name: 'editArticle', params: {slug: article.slug}}"
            >
              <i class="ion-edit"></i>
              Edit Article
            </router-link>

            <button class="btn btn-outline-danger btn-sm" @click="delArticle">
              <i class="ion-trash-a"></i>
              Delete Article
            </button>

            </span>

        </div>

      </div>
    </div>
    <div class="container page">
      <McvLoading v-if="isLoading"></McvLoading>
      <McvLoading v-if="error" :message="error"></McvLoading>

      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <McvTagList v-if="article.tagList" :tags="article.tagList"></McvTagList>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import McvLoading from '@/components/Loading.vue';
import McvTagList from '@/components/TagList.vue';

export default {
  name: 'Article',
  components: { McvTagList, McvLoading },
  computed: {
    ...mapGetters('articleStore', ['data', 'isLoading', 'error']),
    ...mapGetters('authStore', ['currentUser']),
    article() {
      return this.data;
    },
    isAuthor() {
      if (!this.currentUser || !this.article) return false;
      return this.currentUser.username === this.article.author.username;
    },
  },
  methods: {
    ...mapActions('articleStore', ['getArticle', 'deleteArticle']),
    delArticle() {
      this.deleteArticle({ slug: this.$route.params.slug })
        .then(() => {
          this.$router.push({ name: 'globalFeed' });
        });
    },
  },
  mounted() {
    this.getArticle({ slug: this.$route.params.slug });
  },
};
</script>

<style scoped>

</style>

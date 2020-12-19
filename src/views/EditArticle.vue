<template>
  <div>
    <McvLoading v-if="isLoading"></McvLoading>
    <McvArticleForm v-if="initialValues"
                    :initialValues="initialValues"
                    :errors="validationErrors"
                    :isSubmitting="isSubmitting"
                    @articleSubmit="onSubmit"
    ></McvArticleForm>
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm.vue';
import McvLoading from '@/components/Loading.vue';

import { mapState, mapActions } from 'vuex';

export default {
  name: 'McvEditArticle',
  components: {
    McvLoading,
    McvArticleForm,
  },
  computed: {
    ...mapState('editArticle', ['isSubmitting', 'validationErrors', 'isLoading', 'article']),
    initialValues() {
      if (!this.article) return null;

      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tags: this.article.tagList,
      };
    },
  },
  mounted() {
    this.getArticle({ slug: this.$route.params.slug });
  },
  methods: {
    ...mapActions('editArticle', ['updateArticle', 'getArticle']),
    onSubmit(articleInput) {
      const { slug } = this.$route.params;
      this.updateArticle({ slug, articleInput })
        .then((article) => {
          this.$router.push({
            name: 'article',
            params: { slug: article.slug },
          });
        });
    },
  },
};
</script>

<style scoped>

</style>

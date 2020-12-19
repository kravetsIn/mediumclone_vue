<template>
  <div>
    <McvArticleForm :initialValues="initialValues"
                    :errors="validationErrors"
                    :isSubmitting="isSubmitting"
                    @articleSubmit="onSubmit"
    ></McvArticleForm>
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'McvCreateArticle',
  components: { McvArticleForm },
  data: () => ({
    initialValues: {
      title: '',
      description: '',
      body: '',
      tags: [],
    },
  }),
  computed: {
    ...mapState('createArticle', ['isSubmitting', 'validationErrors']),
  },
  methods: {
    ...mapActions('createArticle', ['createArticle']),
    onSubmit(articleInput) {
      this.createArticle({ articleInput })
        .then((article) => {
          this.$router.push({ name: 'article', params: { slug: article.slug } });
        });
      console.log('on submit createArticle', articleInput);
    },
  },
};
</script>

<style scoped>

</style>

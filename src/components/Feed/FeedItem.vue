<template>
  <div class="article-preview">
    <div class="article-meta">

      <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
        <img :src="article.author.image" :alt="article.author.username">
      </router-link>

      <div class="info">
        <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}"
                     class="author"
        >
          {{ article.author.username }}
        </router-link>
        <span class="date">{{ article.createdAt }}</span>
      </div>

      <div class="pull-xs-right">
        ADD TO FAVORITS
      </div>
    </div>

    <router-link :to="{name: 'article', params: {slug: article.slug}}" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <McvTagList v-if="article.tagList" :tags="article.tagList"></McvTagList>
    </router-link>
  </div>
</template>

<script>
import McvTagList from '@/components/TagList.vue';

export default {
  name: 'McvFeedItem',
  components: { McvTagList },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>

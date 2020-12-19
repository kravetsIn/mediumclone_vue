<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">

          <McvValidationErrors v-if="errors" :validationErrors="errors">
          </McvValidationErrors>

          <form @submit.prevent="onSubmit">
            <fieldset>

              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="text" placeholder="Article Title"
                       v-model="title"
                />
              </fieldset>

              <fieldset class="form-group">
                <input class="form-control"
                       type="text"
                       placeholder="What's this article about?"
                       v-model="description"
                />
              </fieldset>

              <fieldset class="form-group">
                <textarea class="form-control" rows="8"
                          placeholder="Write your article (in markdown)"
                          v-model="body"
                ></textarea>
              </fieldset>

              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="Enter tags" v-model="tagList">
                <div class="tag-list" v-if="false">
                  <span class="tag-default tag-pill ng-binding ng-scope">
                    <i class="ion-close-round"></i>
                    vcxvvcx
                  </span>
                </div>
              </fieldset>

              <button class="btn btn-lg pull-xs-right btn-primary"
                      :disabled="isSubmitting"
                      type="submit"
              >
                Publish Article
              </button>

            </fieldset>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors.vue';

export default {
  name: 'McvArticleForm',
  components: { McvValidationErrors },
  props: {
    initialValues: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false,
    },
    isSubmitting: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tags.join(' '),
    };
  },
  methods: {
    onSubmit() {
      console.log('sub');
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' '),
      };
      this.$emit('articleSubmit', form);
    },
  },
};
</script>

<style scoped>

</style>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useDateFormat } from "@vueuse/core";
import { useUiStore } from "@/stores/uiStore";
import { type AuthorModel, countAuthors, getAuthors, hasAuthors } from "@/apis/ContentModels";

import Anchor from "@/components/basic/AnchorElement.vue";

const props = withDefaults(defineProps<{
  id: string;
  image: string;
  imageStyle?: string;
  date: Date;
  titleTip?: string;
  url?: string;
  baseUrl: string;
  author?: AuthorModel | AuthorModel[] | null;
  displayAuthorMode?: "hide" | "all" | "all-but-avatar" | "all-but-name" | "all-but-first-avatar" | "all-but-first-name" | "first" | "first-but-avatar" | "first-but-name"
  displayAuthorBy?: boolean;
  displayDescription?: boolean;
  displayDate?: boolean;
  withShadow?: boolean;
  openInNewTab?: boolean;
}>(), {
  displayAuthorMode: "hide",
  displayAuthorBy: false,
  displayDescription: false,
  displayDate: true,
  author: null,
  withShadow: false,
  openInNewTab: true
});

const uiStore = useUiStore();

const displayDate = (date: Date, format: string) => {
  return useDateFormat(date, format, { locales: uiStore }).value;
};

const useTitleTip = computed(() => {
  return props.titleTip ?? "";
});

const useImageUrl = computed(() => {
  const year = displayDate(props.date, "YYYY");
  const month = displayDate(props.date, "MM");
  return `/content${props.baseUrl}/${year}/${month}/${props.id}/assets/${props.image}`;
});

const useImageStyle = computed(() => {
  return props.imageStyle ?? "";
})

const useArticleUrl = computed(() => {
  if (props.url)
    return props.url;
  const year = displayDate(props.date, "YYYY");
  const month = displayDate(props.date, "MM");
  return `${props.baseUrl}/${year}/${month}/${props.id}`;
});

const useTarget = computed(() => {
  return props.openInNewTab ? '_blank' : '_self';
});

//region Author Display Options

/*
  "hide"                  // Hide all authors
  "all"                   // Show all authors
  "all-but-avatar"        // Show all authors but avatar
  "all-but-name"          // Show all authors but name
  "all-but-first-avatar"  // Show all authors & show first avatar only
  "all-but-first-name"    // Show all authors & show first name only
  "first"                 // Show first author only
  "first-but-avatar"      // Show first author & show first avatar only
  "first-but-name"        // Show first author & show first name only
*/

const displayAuthors = ref(false);

const displayThisAuthor = (i: number): boolean => {
  if (displayAuthors.value) {

    switch (props.displayAuthorMode) {
      case "hide":
        return false;
      case "all":
      case "all-but-avatar":
      case "all-but-name":
      case "all-but-first-avatar":
      case "all-but-first-name":
        return true;
      case "first":
      case "first-but-avatar":
      case "first-but-name":
        return i === 0;
    }

  }

  return false;
};

const displayThisAuthorName = (i: number): boolean => {

  if (displayAuthors.value) {

    switch (props.displayAuthorMode) {
      case "all":
      case "all-but-name":
      case "all-but-first-avatar":
        return true;

      case "all-but-avatar":
      case "first-but-avatar":
        return false;

      case "first":
      case "first-but-name":
      case "all-but-first-name":
        return i === 0;
    }

  }

  return false;
};

const displayThisAuthorAvatar = (i: number): boolean => {
  if (displayAuthors.value) {

    switch (props.displayAuthorMode) {
      case "all":
      case "all-but-avatar":
        return true;

      case "all-but-name":
      case "first-but-name":
        return false;

      case "first":
      case "first-but-avatar":
      case "all-but-first-avatar":
        return i === 0;

      case "all-but-first-name":
        return i !== 0;
    }

  }

  return false;
};

const totalOfAuthors = computed(() => {
  return countAuthors(props.author);
});

//endregion

onMounted(() => {
  displayAuthors.value = props.displayAuthorMode !== "hide";
});

</script>

<template>
  <div class="article-card" :class="{'shadow-md':withShadow,'hover:shadow-lg':withShadow}">
    <anchor class="block w-full h-4/5" :href="useArticleUrl" :title="useTitleTip" :target="useTarget" mode="classic">

      <div class="md:flex p-5">

        <div class="flex-none md:w-72 w-0 overflow-hidden" :style="useImageStyle">
          <img :src="useImageUrl" :alt="useTitleTip" />
        </div>

        <div class="flex-1 p-5 text-lg font-bold">
          <slot></slot>
          <span v-if="displayDescription" class="article-description">
              <slot name="description"></slot>
          </span>
          <span v-if="props.displayDate" class="block text-sm text-gray-500 font-medium">
            {{ displayDate(date, $t("_common.date-format")) }}
          </span>
          <br v-else />
          <!-- Author -->
          <span v-if="hasAuthors(author)" class="text-sm font-light text-gray-500">
            <span v-if="displayAuthorBy" class="text-xs mr-1 text-gray-500/50">by</span>
            <span v-for="(author, i) in getAuthors(author)" :key="author.id" v-show="displayThisAuthor(i)">
              <span v-if="i > 0 && i < totalOfAuthors - 1" class="text-xs mx-1 text-gray-500/50">,</span>
              <span v-else-if="i > 0 && i < totalOfAuthors" class="text-xs mx-1 text-gray-500/50">and</span>
              <span v-if="displayThisAuthorAvatar(i)" class="mr-1.5"> <img :src="author.avatar" :alt="author.name" class="inline-block w-5 h-5 rounded-full" /></span>
              <span v-if="displayThisAuthorName(i)" class=""> {{ author.name }}</span>
            </span>
          </span>
          <!-- Author -->
        </div>

      </div>

    </anchor>

  </div>
</template>

<style scoped lang="css">
.article-card {
  @apply m-4 rounded-lg overflow-hidden;
  @apply dark:bg-gray-500/5 hover:bg-purple-200/5;
  @apply border border-gray-300 hover:border-gray-500;

  .article-description {
    @apply block py-1;
    @apply text-sm text-gray-500;
    @apply max-h-32 break-words text-ellipsis overflow-hidden;
  }
}
</style>
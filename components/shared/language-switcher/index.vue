<script setup>
const router = useRouter()
const { locales, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const dayjs = useDayjs()

function onLocaleSelect(locale) {
  router.replace(switchLocalePath(locale))
  dayjs.locale(locale)
}
</script>

<template>
  <v-menu
    class="mr-4"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        size="default"
        variant="outlined"
        v-bind="props"
      >
        {{ locale }}
      </v-btn>
    </template>
    <v-card
      density="compact"
      elevation="0"
      variant="outlined"
      class="mt-2"
    >
      <v-list-item
        v-for="localeItem in locales"
        :key="localeItem"
        :value="localeItem"
        @click="onLocaleSelect(localeItem.code)"
      >
        <v-list-item-title
          class="text-button"
        >
          {{ localeItem.name }}
        </v-list-item-title>
      </v-list-item>
    </v-card>
  </v-menu>
</template>

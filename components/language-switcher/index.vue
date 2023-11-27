<script setup>
const router = useRouter()
const { locales, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

function onLocaleSelect(locale) {
  router.replace(switchLocalePath(locale))
}
</script>

<template>
  <v-select
    v-model="locale"
    :items="locales"
    item-value="code"
    item-title="name"
    density="compact"
    variant="solo-filled"
    hide-details
    width="200"
    class="mr-2"
    @update:model-value="onLocaleSelect"
  />
</template>

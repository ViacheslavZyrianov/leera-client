<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import usePalette from '@/composables/usePalette'

const settingsStore = useSettingsStore()
const changeVuetifyPalette = usePalette()

function onPaletteSelect(palette: string):void {
  settingsStore.setPalette(palette)
  changeVuetifyPalette()
}
</script>

<template>
  <NuxtLayout name="profile">
    <v-card>
      <v-list class="pa-0">
        <v-list-item>
          <v-row class="ma-0 d-flex align-center">
            <v-col class="px-0 font-weight-bold text-button">
              {{ $t(`profile.settings.list.palette.label`) }}
            </v-col>
            <v-col class="px-0 text-right text-button">
              {{ $t(`profile.settings.list.palette.list.${settingsStore.palette}`) }}
            </v-col>
          </v-row>
        </v-list-item>

        <v-list-item
            v-for="(palette, paletteKey) in settingsStore.palettes"
            :key="paletteKey"
        >
          <v-row class="d-flex align-center">
            <v-col>{{ $t(`profile.settings.list.palette.list.${paletteKey}`) }}</v-col>
            <v-spacer />
            <v-col class="d-flex align-center justify-end">
              <v-sheet
                  v-for="(color, colorKey) in palette"
                  :key="colorKey"
                  :width="24"
                  :height="24"
                  :color="color"
                  class="ml-2"
              />
              <v-btn
                  color="primary"
                  class="ml-4"
                  :active="paletteKey === settingsStore.palette"
                  @click="onPaletteSelect(paletteKey)"
              >
                {{ $t('general.select') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
  </v-card>
  </NuxtLayout>
</template>

<style scoped>

</style>

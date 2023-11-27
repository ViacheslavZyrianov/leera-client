<script setup lang="ts">
import { list as palettes, setPalette } from '@/composables/palette'
import { useTheme } from 'vuetify'
import type { CookieRef } from '#app'

const theme = useTheme()
const cookie_palette: CookieRef<string | null | undefined> = useCookie('palette')

function onPaletteSelect(palette: string):void {
  cookie_palette.value = palette
  setPalette(theme)
}

setPalette(theme)
</script>

<template>
  <v-card class="pa-4">
    <v-list class="pa-0">
      <v-list-item>
        <v-row class="ma-0 d-flex align-center">
          <v-col class="px-0 font-weight-bold">
            {{ $t(`settings.palette.label`) }}
          </v-col>
          <v-col class="px-0 text-right">
            {{ $t(`settings.palette.list.${cookie_palette}`) }}
          </v-col>
        </v-row>
      </v-list-item>

      <v-list-item
          v-for="(palette, paletteKey) in palettes"
          :key="paletteKey"
      >
        <v-row class="d-flex align-center">
          <v-col>{{ $t(`settings.palette.list.${paletteKey}`) }}</v-col>
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
                variant="text"
                color="primary"
                class="ml-4"
                rounded
                :active="paletteKey === cookie_palette"
                @click="onPaletteSelect(paletteKey)"
            >
              {{ $t('general.select') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped>

</style>

<template>
  <v-card
    max-width="868px"
    class="w-100 h-75 pa-4"
  >
    <div class="d-flex w-100 h-100">
      <div class="d-flex flex-column w-66 pa-8">
        <slot name="illustration" />
      </div>
      <div class="w-33 my-auto">
        <slot name="form" />
      </div>
    </div>
  </v-card>
</template>

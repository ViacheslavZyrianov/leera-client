<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useDayjs } from '#dayjs'

const userStore = useUserStore()
const dayjs = useDayjs()

const isUserDataLoaded = ref(false)

function formatAccountCreatedAtDate(createdAt: string) {
  const date = dayjs(createdAt).format('DD.MM.YYYY')
  const time = dayjs(createdAt).format('HH:MM')

  return `Account created on ${date} at ${time}`
}

try {
  await userStore.getUserMe()
  isUserDataLoaded.value = true
} catch (err: any) {
  throw new Error(err)
}
</script>

<template>
  <NuxtLayout name="profile">
    <div
      v-if="isUserDataLoaded"
      class="d-flex"
    >
      <shared-avatar
          :avatar-url="userStore.me.avatar"
          :placeholder="userStore.me.username[0]"
          :size="256"
          class="mr-12"
      />
      <div class="info">
        <div class="text-h4">
          {{ userStore.me.username }}
        </div>
        <div>
          {{ userStore.me.email }}
        </div>
        <div>
          isPremium = {{ userStore.me.isPremium }}
        </div>
        <div>
          isEmailApproved = {{ userStore.me.isEmailApproved }}
        </div>
        <div>
          {{ formatAccountCreatedAtDate(userStore.me.createdAt) }}
        </div>
      </div>
    </div>
    <v-skeleton-loader
        v-else
        type="list-item-avatar-three-line"
    />
  </NuxtLayout>
</template>

<style scoped>

</style>

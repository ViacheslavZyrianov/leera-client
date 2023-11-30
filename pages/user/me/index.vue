<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useDayjs } from '#dayjs'

const userStore = useUserStore()
const dayjs = useDayjs()

const userData = ref({
  avatar: '',
  username: '',
  email: '',
  isPremium: false,
  isEmailApproved: false,
  createdAt: ''
})
const isUserDataLoaded = ref(false)

function formatAccountCreatedAtDate(createdAt: string) {
  const date = dayjs(createdAt).format('DD.MM.YYYY')
  const time = dayjs(createdAt).format('HH:MM')

  return `Account created on ${date} at ${time}`
}

userStore
    .getUserMe()
      .then((res: any) => {
        userData.value = res
        isUserDataLoaded.value = true
      })
</script>

<template>
  <v-container class="pa-8">
    <v-card class="pa-4">
      <div
        v-if="isUserDataLoaded"
        class="d-flex"
      >
        <v-avatar
          :image="userData.avatar"
          size="128"
          class="mr-4"
        />
        <div class="info">
          <div class="text-h4">
            {{ userData.username }}
          </div>
          <div>
            {{ userData.email }}
          </div>
          <div>
            isPremium = {{ userData.isPremium }}
          </div>
          <div>
            isEmailApproved = {{ userData.isEmailApproved }}
          </div>
          <div>
            {{ formatAccountCreatedAtDate(userData.createdAt) }}
          </div>
        </div>

      </div>
      <v-skeleton-loader
        v-else
        type="list-item-avatar-three-line"
      />
    </v-card>
  </v-container>
</template>

<style scoped>

</style>

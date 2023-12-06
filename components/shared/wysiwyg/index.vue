<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

const { t } = useI18n()

const editorBtnList = [
  {
    type: 'button',
    list: [
      {
        icon: 'mdi-format-bold',
        action: 'toggleBold'
      },
      {
        icon: 'mdi-format-italic',
        action: 'toggleItalic'
      },
      {
        icon: 'mdi-format-underline',
        action: 'toggleUnderline'
      },
      {
        icon: 'mdi-format-strikethrough-variant',
        action: 'toggleStrike'
      }
    ]
  },
  {
    type: 'button',
    list: [
      {
        icon: 'mdi-format-align-left',
        action: 'setTextAlign',
        value: 'left'
      },
      {
        icon: 'mdi-format-align-center',
        action: 'setTextAlign',
        value: 'center'
      },
      {
        icon: 'mdi-format-align-right',
        action: 'setTextAlign',
        value: 'right'
      },
      {
        icon: 'mdi-format-align-justify',
        action: 'setTextAlign',
        value: 'justify'
      }
    ]
  },
  {
    type: 'select',
    list: [
      ...Array(7).fill(null).map((_, index) => ({
        icon: `mdi-format-header-${index}`,
        action: index === 0 ? 'setParagraph' : 'toggleHeading',
        itemTitle: index === 0 ? t('stories.editor.regular') : t('stories.editor.header', { header: index }),
        itemValue: index,
        value: index === 0 ? 'paragraph' : { level: index }
      }))
    ]
  }
]

const editorHeaderLevelValue = ref(0)

const editor = useEditor({
  content: 'akwd ajdiwo jawdoaiwdj wai d',
  extensions: [
    StarterKit,
    Document,
    Paragraph,
    Text,
    Heading,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Underline
  ],
  editable: true,
  editorProps: {
    attributes: {
      class: 'tiptap-custom-class',
    },
  },
})

function onTriggerAction(actionName: string, actionValue?: string | Record<string, string | number>) {
  const action = editor.value?.chain().focus()[actionName]

  if (action) {
    if (actionValue) action(actionValue).run()
    else action().run()
  }
}

function onHeaderLevelUpdate() {
  const level: number = editorHeaderLevelValue.value
  if (level === 0) onTriggerAction('setParagraph')
  else onTriggerAction('toggleHeading', { level })
}
</script>

<template>
  <div class="d-flex mb-2">
    <v-card
      v-for="(editorBtnListGroup, index) in editorBtnList"
      :key="index"
      variant="flat"
      elevation="0"
      class="mr-4"
    >
      <v-btn-toggle v-if="editorBtnListGroup.type === 'button'">
        <shared-wysiwyg-editor-btn
          v-for="({ icon, action, value }) in editorBtnListGroup.list"
          :key="icon+action"
          :icon="icon"
          class="mr-1"
          @click="onTriggerAction(action, value)"
        />
      </v-btn-toggle>
      <v-select
        v-if="editorBtnListGroup.type === 'select'"
        v-model="editorHeaderLevelValue"
        :items="editorBtnListGroup.list"
        item-title="itemTitle"
        item-value="itemValue"
        variant="solo-filled"
        density="comfortable"
        :flat="true"
        @update:modelValue="onHeaderLevelUpdate"
      />
    </v-card>
  </div>
  <editor-content
    v-if="editor"
    :editor="editor"
    class="mb-4"
  />
</template>

<style lang="scss">
.tiptap-custom-class {
  background-color: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, 0.87);
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  min-height: 200px;
  transition: background .25s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  &:focus {
    background-color: rgba(0, 0, 0, 0.12);
    outline: none;
  }
}
</style>


<!--    <v-btn-toggle-->
<!--        v-model="textAlign"-->
<!--        shaped-->
<!--        mandatory-->
<!--    >-->
<!--      <v-btn>-->
<!--        <v-icon>mdi-format-align-left</v-icon>-->
<!--      </v-btn>-->

<!--      <v-btn>-->
<!--        <v-icon>mdi-format-align-center</v-icon>-->
<!--      </v-btn>-->

<!--      <v-btn>-->
<!--        <v-icon>mdi-format-align-right</v-icon>-->
<!--      </v-btn>-->

<!--      <v-btn>-->
<!--        <v-icon>mdi-format-align-justify</v-icon>-->
<!--      </v-btn>-->
<!--    </v-btn-toggle>-->
<!--    <v-btn-toggle-->
<!--        v-model="toggle_multiple"-->
<!--        background-color="primary"-->
<!--        dark-->
<!--        multiple-->
<!--    >-->
<!--      <shared-wysiwyg-editor-btn-->
<!--        icon=""-->
<!--      />-->

<!--      <v-btn-->
<!--        icon="mdi-format-italic"-->
<!--      />-->

<!--      <v-btn>-->
<!--        <v-icon>mdi-format-underline</v-icon>-->
<!--      </v-btn>-->

<!--      <v-btn>-->
<!--        <v-icon>mdi-format-color-fill</v-icon>-->
<!--      </v-btn>-->
<!--    </v-btn-toggle>-->

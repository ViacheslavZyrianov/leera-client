<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import { type isActiveInterface } from '@/interfaces/wysiwyg'

const { t } = useI18n()

const editorBtnList = [
  {
    type: 'button',
    list: [
      {
        icon: 'mdi-arrow-u-left-top',
        action: 'undo',
        value: 'undo',
        isActive: false,
        canBeDisabled: true
      },
      {
        icon: 'mdi-arrow-u-right-top',
        action: 'redo',
        value: 'redo',
        isActive: false,
        canBeDisabled: true
      }
    ]
  },
  {
    type: 'button',
    list: [
      {
        icon: 'mdi-format-bold',
        action: 'toggleBold',
        value: 'bold',
        isActive: {
          value: 'bold'
        },
        canBeDisabled: false
      },
      {
        icon: 'mdi-format-italic',
        action: 'toggleItalic',
        value: 'italic',
        isActive: {
          value: 'italic'
        },
        canBeDisabled: false
      },
      {
        icon: 'mdi-format-underline',
        action: 'toggleUnderline',
        value: 'underline',
        isActive: {
          value: 'underline'
        },
        canBeDisabled: false
      },
      {
        icon: 'mdi-format-strikethrough-variant',
        action: 'toggleStrike',
        value: 'strike',
        isActive: {
          value: 'strike'
        },
        canBeDisabled: false
      }
    ]
  },
  {
    type: 'button',
    list: [
      {
        icon: 'mdi-format-align-left',
        action: 'setTextAlign',
        value: 'left',
        isActive: {
          value: { textAlign: 'left' }
        },
        canBeDisabled: false
      },
      {
        icon: 'mdi-format-align-center',
        action: 'setTextAlign',
        value: 'center',
        isActive: {
          value: { textAlign: 'center' }
        },
        canBeDisabled: false
      },
      {
        icon: 'mdi-format-align-right',
        action: 'setTextAlign',
        value: 'right',
        isActive: {
          value: { textAlign: 'right' }
        },
        canBeDisabled: false
      },
      {
        icon: 'mdi-format-align-justify',
        action: 'setTextAlign',
        value: 'justify',
        isActive: {
          value: { textAlign: 'justify' }
        },
        canBeDisabled: false
      }
    ]
  },
  {
    type: 'button',
    list: [
      {
        icon: 'mdi-format-paragraph',
        action: 'setParagraph',
        value: 'paragraph',
        isActive: {
          value: 'paragraph'
        },
        canBeDisabled: false
      }
    ]
  },
  {
    type: 'dropdown',
    list: [
      {
        icon: 'mdi-format-header-1',
        action: 'toggleHeading',
        value: 1,
        isActive: {
          key: 'heading',
          value: { level: 1 }
        },
        canBeDisabled: false
      },
      {
        icon: 'mdi-format-header-2',
        action: 'toggleHeading',
        value: 2,
        isActive: {
          key: 'heading',
          value: { level: 2 }
        },
        canBeDisabled: false
      },
      {
        icon: 'mdi-format-header-3',
        action: 'toggleHeading',
        value: 3,
        isActive: {
          key: 'heading',
          value: { level: 3 }
        },
        canBeDisabled: false
      },
      {
        icon: 'mdi-format-header-4',
        action: 'toggleHeading',
        value: 4,
        isActive: {
          key: 'heading',
          value: { level: 4 }
        },
        canBeDisabled: false
      },
    ]
  },
  {
    type: 'button',
    list: [
      {
        icon: 'mdi-format-list-numbered',
        action: 'toggleOrderedList',
        value: 'orderedList',
        isActive: {
          value: 'orderedList'
        },
        canBeDisabled: false
      },
      {
        icon: 'mdi-format-list-bulleted',
        action: 'toggleBulletList',
        value: 'bulletList',
        isActive: {
          value: 'bulletList'
        },
        canBeDisabled: false
      }
    ]
  }
]

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

function isActiveEditorElement(isActive: isActiveInterface) {
  return isActive?.key ? editor.value.isActive(isActive.key, isActive.value) : editor.value.isActive(isActive.value)
}

function isDisabled(action: string, canBeDisabled: boolean) {
  return canBeDisabled && !editor.value.can().chain().focus()[action]().run()
}
</script>

<template>
  <template v-if="editor">
    <div class="d-flex align-center justify-space-between">
      <v-card
        v-for="(editorBtnListGroup, index) in editorBtnList"
        :key="index"
        variant="tonal"
        elevation="0"
        class="rounded-b-0"
      >
        <v-btn-toggle
          v-if="editorBtnListGroup.type === 'button'"
          class="rounded-0"
        >
          <shared-wysiwyg-editor-btn
            v-for="({ icon, action, value, isActive, canBeDisabled }) in editorBtnListGroup.list"
            :key="icon+action"
            :icon="icon"
            :disabled="isDisabled(action, canBeDisabled)"
            :is-active="isActive && isActiveEditorElement(isActive)"
            @click="onTriggerAction(action, value)"
          />
        </v-btn-toggle>
        <v-btn-toggle
          v-if="editorBtnListGroup.type === 'dropdown'"
          class="rounded-0"
        >
          <v-menu>
            <template v-slot:activator="{ props }">
              <shared-wysiwyg-editor-btn
                v-bind="props"
                icon="mdi-format-header-pound"
                :is-active="editor.isActive('heading')"
              />
            </template>
            <v-list>
              <v-list-item
                v-for="item in editorBtnListGroup.list"
                :key="item.value"
                :value="item.value"
                :active="isActiveEditorElement(item.isActive)"
                density="compact"
                @click="onTriggerAction('toggleHeading', { level: item.value })"
              >
                <v-list-item-title>{{ t(`stories.editor.header-${item.value}`) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn-toggle>
      </v-card>
    </div>
    <editor-content
      :editor="editor"
      class="mb-4"
    />
  </template>
</template>

<style lang="scss">
.tiptap-custom-class {
  background-color: rgba(0, 0, 0, 0.04);
  color: rgba(0, 0, 0, 0.87);
  padding: 8px 16px;
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

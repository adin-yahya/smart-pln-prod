<template>
    <tas-base-crud :config="config" hide-delete />
  </template>
<script>
export default {
  name: 'crud-m_levels',
  data () {
    return {
      config: {
        title: 'Level Potensi Isu',
        model_api: 'm_levels',
        getter: 'm_levels',
        setter: 'm_levels',
        pk_field: null,
        export: true,
        permission: {
          create: 'create-m_levels',
          read: 'view-m_levels',
          update: 'update-m_levels',
          delete: 'delete-m_levels'
        },
        fields: [
          { id: 'id', label: 'Level', methods: { list: { type: 'text', transform: 'prefix-Level' }, detail: { transform: 'prefix-Level' }, create: false, update: false, filter: false } },
          { id: 'description', label: 'Penjelasan / Deskripsi', methods: { create: { type: 'textarea' }, update: { type: 'textarea' } } },
          {
            id: 'active',
            label: 'Status',
            methods: {
              list: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'active'
              },
              detail: {
                order: true,
                class: { 0: 'badge badge-danger', 1: 'badge badge-primary' },
                transform: 'active'
              },
              create: {
                type: 'radio',
                value: '1',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: '1' },
                      { label: 'Non Aktif', code: '0' }
                    ]
                  }
                }
              },
              update: {
                type: 'radio',
                value: '1',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: '1' },
                      { label: 'Non Aktif', code: '0' }
                    ]
                  }
                }
              },
              filter: {
                type: 'radio',
                option: {
                  list_pointer: {
                    label: 'label',
                    code: 'code',
                    list: [
                      { label: 'Aktif', code: '1' },
                      { label: 'Non Aktif', code: '0' }
                    ]
                  }
                }
              }
            }
          },
          { id: 'updated_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_at', label: 'Dibuat', methods: { list: { transform: 'longDateTime' }, detail: { transform: 'longDateTime' }, create: false, update: false, filter: false } },
          { id: 'updated_at', label: 'Diubah', methods: { list: { transform: 'longDateTime' }, detail: { transform: 'longDateTime' }, create: false, update: false, filter: false } }
        ]
      }
    }
  }
}
</script>
  <style lang=""></style>

<template>
  <tas-base-crud :config="config"></tas-base-crud>
</template>
<script>
export default {
  name: 'crud-units',
  data () {
    return {
      config: {
        title: 'Unit',
        model_api: 'units',
        getter: 'units',
        setter: 'units',
        pk_field: null,
        export: true,
        permission: {
          create: 'create-units',
          read: 'view-units',
          update: 'update-units',
          delete: 'delete-units'
        },
        fields: [
          { id: 'name', label: 'Nama Unit', methods: { list: true, detail: true, create: true, update: true, filter: false } },
          { id: 'code', label: 'Kode Unit', methods: { list: true, detail: true, create: true, update: true, filter: false } },
          { id: 'description', label: 'Keterangan', methods: { create: { type: 'textarea' }, update: { type: 'textarea' } } },
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
          { id: 'id', methods: { list: false, detail: false, create: false, update: false, filter: false } },
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

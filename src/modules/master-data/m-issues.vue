<template>
  <tas-base-crud :config="config" hide-create hide-update hide-delete hide-back></tas-base-crud>
</template>
<script>
export default {
  name: 'crud-m-issues',
  data () {
    return {
      config: {
        title: 'Risk Register',
        model_api: 'm-issues',
        getter: 'm-issues',
        setter: 'm-issues',
        pk_field: null,
        export: true,
        permission: {
          create: 'create-m-issues',
          read: 'view-m-issues',
          update: 'update-m-issues',
          delete: 'delete-m-issues'
        },
        slave: [
          {
            name: 'Daftar Sub Risk Register',
            permission: 'm-sub-issues',
            module: 'master-data/m-sub-issues',
            as_param: 'issue_id',
            key_field: 'id',
            overwrite: {
              fields: [
                { rule: '1.methods.list', value: false },
                { rule: '1.methods.filter', value: false },
                { rule: '1.methods.create', value: false },
                { rule: '1.methods.update', value: false },
                { rule: '1.methods.detail', value: false }

                // { rule: '12.methods.create', value: false },
                // { rule: '12.methods.update', value: false },
                // { rule: '13.methods.create', value: false },
                // { rule: '13.methods.update', value: false }
              ]
            }
          }
        ],
        fields: [
          {
            id: 'category_id',
            label: 'Kategori',
            methods: {
              create: {
                setter: 'm-issue-categories',
                getter: 'm-issue-categories',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'name', code: 'id', display: ['code', 'name', 'description']
                  }
                }
              },
              update: {
                setter: 'm-issue-categories',
                getter: 'm-issue-categories',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'name', code: 'id', display: ['code', 'name', 'description']
                  }
                }
              },
              filter: {
                setter: 'm-issue-categories',
                getter: 'm-issue-categories',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'name', code: 'id', display: ['code', 'name', 'description']
                  }
                }
              }
            }
          },
          { id: 'issue_code', label: 'Kode Risk Register', methods: { list: true, detail: true, create: true, update: true, filter: false } },
          { id: 'issue_name', label: 'Risk Register', methods: { list: true, detail: true, create: true, update: true, filter: false } },
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
          { id: 'created_at', label: 'Dibuat', methods: { list: { transform: 'longDateTime' }, detail: false, create: false, update: false, filter: false } },
          { id: 'updated_at', label: 'Diubah', methods: { list: { transform: 'longDateTime' }, detail: false, create: false, update: false, filter: false } }
        ]
      }
    }
  }
}
</script>
<style lang=""></style>

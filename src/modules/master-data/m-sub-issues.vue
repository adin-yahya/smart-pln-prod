<template>
  <tas-base-crud :config="config" hide-create hide-update hide-delete hide-back></tas-base-crud>
</template>
<script>
export default {
  name: 'crud-m-sub-issues',
  data () {
    return {
      config: {
        title: 'Sub Risk Register',
        model_api: 'm-sub-issues',
        getter: 'm-sub-issues',
        setter: 'm-sub-issues',
        pk_field: null,
        export: true,
        permission: {
          create: 'create-m-sub-issues',
          read: 'view-m-sub-issues',
          update: 'update-m-sub-issues',
          delete: 'delete-m-sub-issues'
        },
        slave: [
          {
            name: 'Daftar Mitigasi',
            permission: 'm-mitigations',
            module: 'master-data/m-mitigations',
            as_param: 'sub_issue_id',
            key_field: 'id',
            overwrite: {
              fields: [
                { rule: '1.methods.list', value: false },
                { rule: '1.methods.filter', value: false },
                { rule: '1.methods.create', value: false },
                { rule: '1.methods.update', value: false },
                { rule: '1.methods.detail', value: false },

                { rule: '12.methods.create', value: false },
                { rule: '12.methods.update', value: false },
                { rule: '13.methods.create', value: false },
                { rule: '13.methods.update', value: false }
              ]
              // permission: {
              //   create: 'template-forbid-all',
              //   read: 'read-m-mitigations',
              //   update: 'template-forbid-all',
              //   delete: 'template-forbid-all'
              // }
            }
          }
        ],
        fields: [
          {
            id: 'issue_id',
            label: 'Risk Register',
            methods: {
              create: {
                setter: 'm-issues',
                getter: 'm-issues',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'issue_name', code: 'id', display: ['issue_code', 'issue_name', 'description']
                  }
                  // get_param: [{ id: 'category_id' }]
                }
              },
              update: {
                setter: 'm-issues',
                getter: 'm-issues',
                type: 'lookup-radio',
                validation: ['required'],
                option: {
                  list_pointer: {
                    label: 'issue_name', code: 'id', display: ['issue_code', 'issue_name', 'description']
                  }
                  // get_param: [{ id: 'category_id' }]
                }
              },
              filter: {
                setter: 'm-issues',
                getter: 'm-issues',
                type: 'lookup-radio',
                option: {
                  list_pointer: {
                    label: 'issue_name', code: 'id', display: ['issue_code', 'issue_name', 'description']
                  }
                  // get_param: [{ id: 'category_id' }]
                }
              }
            }
          },
          { id: 'sub_issue_code', label: 'Kode Sub Risk Register', methods: { list: true, detail: true, create: true, update: true, filter: false } },
          { id: 'sub_issue_name', label: 'Sub Risk Register', methods: { list: true, detail: true, create: true, update: true, filter: false } },
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

<template>
  <tas-base-crud :config="config">
    <template v-slot:detail-footer="data">
      <detail-issue-category v-if="data.rowData" :id="data.rowData.id" />
    </template>
  </tas-base-crud>
</template>
<script>
export default {
  name: 'crud-m-issue-categories',
  components: {
    detailIssueCategory: () => import('./comp-m-issue-categories/m-issues.vue')
  },
  data () {
    return {
      config: {
        title: 'Kategori Potensi Isu',
        model_api: 'm-issue-categories',
        getter: 'm-issue-categories',
        setter: 'm-issue-categories',
        pk_field: null,
        export: true,
        permission: {
          create: 'create-m-issue-categories',
          read: 'view-m-issue-categories',
          update: 'update-m-issue-categories',
          delete: 'delete-m-issue-categories'
        },
        fields: [
          { id: 'name', label: 'Kategori Potensi', methods: { list: true, detail: true, create: { validation: ['required'] }, update: { validation: ['required'] }, filter: false } },
          { id: 'code', label: 'Kode', methods: { list: true, detail: true, create: { validation: ['required'] }, update: { validation: ['required'] }, filter: false } },
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

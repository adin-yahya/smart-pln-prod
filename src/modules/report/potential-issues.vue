<template>
  <tas-base-crud ref="potIssue" :config="config" hide-create hide-update hide-delete>
    <template v-slot:detail-body="data">
      <detail-potential-issues @back="$refs.potIssue.getEvent('list')" v-if="data.id" :id="data.id" />
    </template>
  </tas-base-crud>
</template>
<script>
export default {
  name: 'crud-potential-issues',
  components: {
    DetailPotentialIssues: () => import('./comp-potential-issues/detail-potential-issues.vue')
  },
  data () {
    return {
      config: {
        title: 'Pelaporan Potensi Isu',
        model_api: null,
        getter: 'potential-issues',
        setter: 'potential-issues',
        custom_api: {
          list: 'custom/potency-issue-by-project/list'
        },
        pk_field: null,
        export: true,
        permission: {
          create: 'create-potential-issues',
          read: 'view-potential-issues',
          update: 'update-potential-issues',
          delete: 'delete-potential-issues'
        },
        fields: [
          {
            id: 'id',
            label: 'Proyek',
            methods: {
              list: { view_data: 'project_name' },
              detail: { view_data: 'project_name' },
              create: false,
              update: false,
              filter: {
                setter: 'projects',
                getter: 'projects',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'project_name',
                    code: 'id',
                    display: ['ruptl_code', 'project_name']
                  }
                }
              }
            }
          },
          {
            id: 'unit_id',
            label: 'Unit Supervisor',
            methods: {
              list: { view_data: 'rel_unit_id' },
              detail: { view_data: 'rel_unit_id' },
              create: false,
              update: false,
              filter: {
                setter: 'units',
                getter: 'units',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'id',
                    display: ['code', 'name', 'description']
                  }
                }
              }
            }
          },
          {
            id: 'pst_id',
            label: 'PST',
            methods: {
              list: { view_data: 'rel_pst_id' },
              detail: { view_data: 'rel_pst_id' },
              create: false,
              update: false,
              filter: {
                setter: 'pst',
                getter: 'pst',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'name',
                    code: 'id',
                    display: ['code', 'name', 'description']
                  }
                }
              }
            }
          },
          { id: 'potency_issue_open', label: 'Belum Dimitigasi', methods: { list: { transform: 'suffix-Laporan' } }, detail: { transform: 'suffix-Laporan' } },
          { id: 'potency_issue_on_going', label: 'Sedang Dimitigasi', methods: { list: { transform: 'suffix-Laporan' } }, detail: { transform: 'suffix-Laporan' } },
          { id: 'potency_issue_close', label: 'Sudah Dimitigasi', methods: { list: { transform: 'suffix-Laporan' } }, detail: { transform: 'suffix-Laporan' } },
          { id: 'updated_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_by', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'created_at', label: 'Dibuat', methods: { list: false, detail: false, create: false, update: false, filter: false } },
          { id: 'updated_at', label: 'Diubah', methods: { list: false, detail: false, create: false, update: false, filter: false } }
        ]
      },
      treeData: null
    }
  },
  methods: {
    loadTree () {
      this.$_api
        .get('custom/master-issue-mitigations/tree')
        .then((res) => {
          this.treeData = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang=""></style>

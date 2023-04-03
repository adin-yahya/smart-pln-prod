<template>
  <tas-base-crud ref="mitRecommend" :config="config" hide-update hide-delete hide-create>
    <template v-slot:list-recommendation_verified="data">
      <template v-if="data.rowData">
        {{ data.rowData.recommendation_verified }} dari {{ data.rowData.total_recommendation }} Mitigasi
      </template>
    </template>
    <template v-slot:detail-body="data">
      <detail-mitigation-recommendations @back="$refs.mitRecommend.getEvent('list')" v-if="data.id" :id="data.id" />
    </template>
  </tas-base-crud>
</template>
<script>
export default {
  name: 'crud-mitigation-recommendations',
  components: {
    DetailMitigationRecommendations: () => import('./comp-mitigation-recommendations/detail-mitigation-recommendations.vue')
  },
  data () {
    return {
      config: {
        title: 'Rekomendasi Mitigasi',
        model_api: null,
        getter: 'mitigation-recommendations',
        setter: 'mitigation-recommendations',
        custom_api: {
          list: 'custom/mitigation-recommendations/list'
        },
        pk_field: null,
        export: true,
        permission: {
          create: 'create-mitigation-recommendations',
          read: 'view-mitigation-recommendations',
          update: 'update-mitigation-recommendations',
          delete: 'delete-mitigation-recommendations'
        },
        fields: [
          {
            id: 'project_id',
            label: 'Proyek',
            data: 'rel_project_id',
            methods: {
              list: true,
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
            id: 'category_id',
            label: 'Kategori Potensi Isu',
            data: 'rel_category_id',
            methods: {
              list: true,
              filter: {
                setter: 'm-issue-categories',
                getter: 'm-issue-categories',
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
            id: 'issue_id',
            label: 'Risk Register',
            data: 'rel_issue_id',
            methods: {
              list: true,
              filter: {
                setter: 'm-issues',
                getter: 'm-issues',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'issue_name',
                    code: 'id',
                    display: ['issue_code', 'issue_name', 'description']
                  },
                  get_param: [{ id: 'category_id' }]
                }
              }
            }
          },
          {
            id: 'sub_issue_id',
            label: 'Sub Risk Register',
            data: 'rel_sub_issue_id',
            methods: {
              list: true,
              filter: {
                setter: 'm-sub-issues',
                getter: 'm-sub-issues',
                type: 'lookup-radio',
                class: 'col-auto min-w-250px',
                option: {
                  list_pointer: {
                    label: 'sub_issue_name',
                    code: 'id',
                    display: ['sub_issue_code', 'sub_issue_name', 'description']
                  },
                  get_param: [{ id: 'issue_id' }]
                }
              }
            }
          },
          {
            id: 'recommendation_verified',
            label: 'Progress Verifikasi',
            methods: {
              list: { type: 'row-slot' }
            }
          }
        ]
      }
    }
  }
}
</script>
<style lang=""></style>

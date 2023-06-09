<template lang="">
  <div class="node-wrapper position-relative" :class="[(node.child && node.child.length) || checklist ? 'pl-9' : 'pl-10', last ? 'border-left-half-node' : 'border-left-dash-node', (node.child && node.child.length) || checklist ? 'has-children' : '']">
    <div @click="!checklist ? (active = !active) : ''" :class="[(node.child && node.child.length) || checklist ? 'has-child pointer' : '', node.child && node.child.length && active ? 'has-child-active' : '']" class="position-relative horizontal-dash d-flex align-items-start" style="margin-left: -15px">
      <i v-if="node.child && node.child.length" @click="checklist ? (active = !active) : ''" :class="{ 'rotate-90': active }" style="transition: all 0.25s ease;" class="ri-arrow-right-s-fill position-relative text-primary ri-2x pr-1"></i>
      <span v-else class="d-block pl-4"></span>
      <div v-if="checklist && !disabledLevel.includes(level)" class="checkbox-list mb-0 mt-2">
        <label :class="[levelClass[level], node.child && childStatus === 2 ? (selected ? 'some-child-minus' : 'some-child-plus') : '']" class="checkbox checkbox-lg align-items-start">
          <input v-model="selected" type="checkbox" :name="node.code + '-name'" />
          <span></span>
          <div class="d-flex flex-column">
            <span class="title font-weight-bold">{{ node.code }} - {{ node.name }}</span>
            <span v-if="node.child" style="flex: 1 0 auto" class="font-size-sm text-muted pr-1">{{ childStatus }}</span>
            <span style="flex: 1 0 auto" class="font-size-sm text-muted pr-1">Kode : {{ node.code }}</span>
          </div>
        </label>
      </div>
      <div v-else class="d-flex flex-column">
        <span class="title font-weight-bold">
          <template v-if="node.code">{{ node.code }} -</template>
          <template v-else>Tanggal</template>
          {{ node.name | parse(node.code ? '' : 'longDate') }}
        </span>
        <div>
          <span v-if="node.code" style="flex: 1 0 auto" class="font-size-sm text-muted pr-1">Kode : {{ node.code }}</span>
          <span v-else style="flex: 1 0 auto" class="font-size-sm text-muted pr-1">Jumlah Mitigasi : {{ node.child.length }}</span>
          <span v-if="node.status_code" :class="bgMitigationStatus('text', node.status_code)" style="flex: 1 0 auto" class="font-size-sm pr-1">{{ node.status_code | parse('status_code_mitigation') }}</span>
        </div>
      </div>
    </div>
    <template v-if="node.child && node.child.length">
      <template v-for="(n, i) in node.child">
        <tree-node v-show="active" @selected="$emit('selected', $event)" :getLevel="getLevel" :level="level + 1" :checked="selected" :checklist="checklist" :last="i + 1 === node.child.length" :node="n" :key="i + '-nodes'" />
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: 'tree-node',
  props: {
    node: { required: true },
    last: { required: false },
    checklist: { required: false },
    checked: { required: false },
    disabledLevel: {
      required: false,
      type: Array,
      default () {
        return []
      }
    },
    level: {
      required: false,
      default () {
        return 0
      }
    },
    getLevel: {
      required: false,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      active: false,
      selected: false,
      levelClass: ['checkbox-primary border-primary', 'checkbox-info border-info', 'checkbox-warning border-warning', 'checkbox-danger border-danger']
    }
  },
  computed: {
    childStatus () {
      if (this.node.child) {
        let check = this.node.child.length - this.node.child.filter((x) => x.selected).length
        if (check === this.node.child.length) {
          return 0 // all child unchecked
        } else if (check === 0) {
          return 1 // all child checked
        } else return 2 // some child unchecked
      } else return 1
    }
  },
  watch: {
    checked: {
      immediate: true,
      handler (e) {
        this.selected = e
      }
    },
    selected: {
      immediate: true,
      handler (e) {
        this.checkLevel(e)
        this.$set(this.node, 'selected', e)
      }
    },
    childStatus: {
      immediate: false,
      handler (e) {
        if (e === 0) this.selected = false
        else if (e === 1) this.selected = true
        else {
          // do nothing
        }
      }
    }
  },
  mounted () {
    this.active = this.checklist && !this.last
  },
  methods: {
    checkLevel (e) {
      if (this.level === this.getLevel) this.$emit('selected', { selected: e, data: this.node })
    },
    bgMitigationStatus (prefix, e) {
      if (e === 'on_going') return prefix + '-warning'
      else if (e === 'close') return prefix + '-success'
      else return prefix + '-danger'
    }
  }
}
</script>
<style>
  .horizontal-dash::before {
    content: '';
    position: absolute;
    top: 0.75rem;
    left: -15px;
    width: 25px;
    height: 1px;
    border-bottom: 1px dashed var(--primary);
  }
  .horizontal-dash.has-child::before {
    top: 1.4rem;
    left: -10px;
    width: 17px;
  }
  .has-child:hover .title {
    color: var(--primary);
  }
  .node-wrapper::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-left: 1px dashed var(--primary);
  }
  .node-wrapper.border-left-half-node::before {
    bottom: calc(100% - 11px);
  }
  .node-wrapper.border-left-half-node.has-children::before {
    bottom: calc(100% - 19px);
  }
  .rotate-90 {
    transform: rotate(90deg);
  }
  .has-child-active::after {
    content: '';
    position: absolute;
    left: 15px;
    top: 25px;
    bottom: 0;
    border-left: 1px dashed var(--primary);
  }

  .checkbox.some-child-minus > span::after {
    transform: none !important;
    border-width: 2px 0 !important;
    height: 0 !important;
    width: 13px !important;
    margin-top: 0 !important;
  }
  .checkbox.some-child-plus {
    position: relative !important;
  }
  .checkbox.some-child-plus > span {
    position: relative !important;
  }
  .checkbox.some-child-plus > span::after {
    content: '';
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    border-style: solid !important;
    border-width: 1px 0 !important;
    border-color: #778596;
    height: 0 !important;
    width: 12px !important;
    margin: 0 !important;
  }
  .checkbox.some-child-plus > span::before {
    content: '';
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    border-style: solid !important;
    border-width: 0 1px !important;
    border-color: #778596;
    height: 12px !important;
    width: 0 !important;
    margin: 0 !important;
  }
</style>

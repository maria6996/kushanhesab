import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Components
import { VBtn } from "../../components/VBtn/index.mjs";
import { VCheckboxBtn } from "../../components/VCheckbox/index.mjs"; // Composables
import { useExpanded } from "./composables/expand.mjs";
import { useHeaders } from "./composables/headers.mjs";
import { useSelection } from "./composables/select.mjs";
import { VDataTableColumn } from "./VDataTableColumn.mjs"; // Utilities
import { defineComponent, useRender } from "../../util/index.mjs"; // Types
export const VDataTableRow = defineComponent({
  name: 'VDataTableRow',
  props: {
    item: Object
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      toggleSelect
    } = useSelection();
    const {
      isExpanded,
      toggleExpand
    } = useExpanded();
    const {
      columns
    } = useHeaders();
    useRender(() => _createVNode("tr", {
      "class": ['v-data-table__tr']
    }, [!columns.value.length && _createVNode(VDataTableColumn, {
      "key": "no-data"
    }, slots), props.item && columns.value.map((column, i) => _createVNode(VDataTableColumn, {
      "align": column.align,
      "fixed": column.fixed,
      "fixedOffset": column.fixedOffset,
      "lastFixed": column.lastFixed,
      "noPadding": column.key === 'data-table-select' || column.key === 'data-table-expand',
      "width": column.width
    }, {
      default: () => {
        const item = props.item;
        const slotName = `item.${column.key}`;
        const slotProps = {
          item: props.item,
          columns: columns.value,
          isSelected,
          toggleSelect,
          isExpanded,
          toggleExpand
        };
        if (slots[slotName]) return slots[slotName](slotProps);
        if (column.key === 'data-table-select') {
          var _slots$itemDataTabl;
          return ((_slots$itemDataTabl = slots['item.data-table-select']) == null ? void 0 : _slots$itemDataTabl.call(slots, slotProps)) ?? _createVNode(VCheckboxBtn, {
            "modelValue": isSelected([item]),
            "onClick": () => toggleSelect(item)
          }, null);
        }
        if (column.key === 'data-table-expand') {
          var _slots$itemDataTabl2;
          return ((_slots$itemDataTabl2 = slots['item.data-table-expand']) == null ? void 0 : _slots$itemDataTabl2.call(slots, slotProps)) ?? _createVNode(VBtn, {
            "icon": isExpanded(item) ? '$collapse' : '$expand',
            "size": "small",
            "variant": "text",
            "onClick": () => toggleExpand(item)
          }, null);
        }
        return item.columns[column.key];
      }
    }))]));
  }
});
//# sourceMappingURL=VDataTableRow.mjs.map
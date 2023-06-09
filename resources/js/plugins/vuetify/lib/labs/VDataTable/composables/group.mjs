// Utilities
import { computed, inject, provide, ref } from 'vue';
import { getObjectValueByPath, propsFactory } from "../../../util/index.mjs"; // Types
export const makeDataTableGroupProps = propsFactory({
  groupBy: {
    type: Array,
    default: () => []
  }
}, 'data-table-group');
const VDataTableGroupSymbol = Symbol.for('vuetify:data-table-group');
export function createGroupBy(props, groupBy, sortBy) {
  const opened = ref(new Set());
  const sortByWithGroups = computed(() => {
    return groupBy.value.map(val => ({
      ...val,
      order: val.order ?? false
    })).concat(sortBy.value);
  });
  function toggleGroup(group, value) {
    const open = value == null ? !opened.value.has(group) : value;
    if (open) opened.value.add(group);else opened.value.delete(group);
  }
  function extractRows(items) {
    function dive(group) {
      const arr = [];
      for (const item of group.items) {
        if (item.type === 'item') arr.push(item);else {
          arr.push(...dive(item));
        }
      }
      return arr;
    }
    return dive({
      type: 'group-header',
      items,
      id: 'dummy',
      key: 'dummy',
      value: 'dummy',
      depth: 0
    });
  }

  // onBeforeMount(() => {
  //   for (const key of groupedItems.value.keys()) {
  //     opened.value.add(key)
  //   }
  // })

  const data = {
    sortByWithGroups,
    toggleGroup,
    opened,
    groupBy,
    extractRows
  };
  provide(VDataTableGroupSymbol, data);
  return data;
}
export function useGroupBy() {
  const data = inject(VDataTableGroupSymbol);
  if (!data) throw new Error('Missing group!');
  return data;
}
function groupItemsByProperty(items, groupBy) {
  if (!items.length) return [];
  const groups = new Map();
  for (const item of items) {
    const value = getObjectValueByPath(item.raw, groupBy);
    if (!groups.has(value)) {
      groups.set(value, []);
    }
    groups.get(value).push(item);
  }
  return groups;
}
function groupItems(items, groupBy) {
  let depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'root';
  if (!groupBy.length) return [];
  const groupedItems = groupItemsByProperty(items, groupBy[0]);
  const groups = [];
  const rest = groupBy.slice(1);
  groupedItems.forEach((items, value) => {
    const key = groupBy[0];
    const id = `${prefix}_${key}_${value}`;
    groups.push({
      depth,
      id,
      key,
      value,
      items: rest.length ? groupItems(items, rest, depth + 1, id) : items,
      type: 'group-header'
    });
  });
  return groups;
}
function flattenItems(items, opened) {
  const flatItems = [];
  for (const item of items) {
    // TODO: make this better
    if (item.type === 'group-header') {
      if (item.value != null) {
        flatItems.push(item);
      }
      if (opened.has(item.id) || item.value == null) {
        flatItems.push(...flattenItems(item.items, opened));
      }
    } else {
      flatItems.push(item);
    }
  }
  return flatItems;
}
export function useGroupedItems(items, groupBy, opened) {
  const flatItems = computed(() => {
    if (!groupBy.value.length) return items.value;
    const groupedItems = groupItems(items.value, groupBy.value.map(item => item.key));
    return flattenItems(groupedItems, opened.value);
  });
  return {
    flatItems
  };
}
//# sourceMappingURL=group.mjs.map
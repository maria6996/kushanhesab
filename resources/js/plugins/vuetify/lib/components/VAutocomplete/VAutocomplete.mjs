import { createTextVNode as _createTextVNode, mergeProps as _mergeProps, createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Styles
import "./VAutocomplete.css";

// Components
import { makeSelectProps } from "../VSelect/VSelect.mjs";
import { VCheckboxBtn } from "../VCheckbox/index.mjs";
import { VChip } from "../VChip/index.mjs";
import { VDefaultsProvider } from "../VDefaultsProvider/index.mjs";
import { VList, VListItem } from "../VList/index.mjs";
import { VMenu } from "../VMenu/index.mjs";
import { VTextField } from "../VTextField/index.mjs"; // Composables
import { makeFilterProps, useFilter } from "../../composables/filter.mjs";
import { makeTransitionProps } from "../../composables/transition.mjs";
import { forwardRefs } from "../../composables/forwardRefs.mjs";
import { useItems } from "../../composables/items.mjs";
import { useLocale } from "../../composables/locale.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Utility
import { computed, mergeProps, nextTick, ref, watch } from 'vue';
import { genericComponent, omit, useRender, wrapInArray } from "../../util/index.mjs";
import { filterVTextFieldProps, makeVTextFieldProps } from "../VTextField/VTextField.mjs"; // Types
function highlightResult(text, matches, length) {
  if (matches == null) return text;
  if (Array.isArray(matches)) throw new Error('Multiple matches is not implemented');
  return typeof matches === 'number' && ~matches ? _createVNode(_Fragment, null, [_createVNode("span", {
    "class": "v-autocomplete__unmask"
  }, [text.substr(0, matches)]), _createVNode("span", {
    "class": "v-autocomplete__mask"
  }, [text.substr(matches, length)]), _createVNode("span", {
    "class": "v-autocomplete__unmask"
  }, [text.substr(matches + length)])]) : text;
}
export const VAutocomplete = genericComponent()({
  name: 'VAutocomplete',
  props: {
    // TODO: implement post keyboard support
    // autoSelectFirst: Boolean,
    search: String,
    ...makeFilterProps({
      filterKeys: ['title']
    }),
    ...makeSelectProps(),
    ...omit(makeVTextFieldProps({
      modelValue: null
    }), ['validationValue', 'dirty', 'appendInnerIcon']),
    ...makeTransitionProps({
      transition: false
    })
  },
  emits: {
    'update:search': val => true,
    'update:modelValue': val => true,
    'update:menu': val => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const isFocused = ref(false);
    const isPristine = ref(true);
    const menu = useProxiedModel(props, 'menu');
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const search = useProxiedModel(props, 'search', '');
    const model = useProxiedModel(props, 'modelValue', [], v => transformIn(wrapInArray(v)), v => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const {
      filteredItems,
      getMatches
    } = useFilter(props, items, computed(() => isPristine.value ? undefined : search.value));
    const selections = computed(() => {
      return model.value.map(v => {
        return items.value.find(item => props.valueComparator(item.value, v.value)) || v;
      });
    });
    const selected = computed(() => selections.value.map(selection => selection.props.value));
    const listRef = ref();
    function onClear(e) {
      model.value = [];
      if (props.openOnClear) {
        menu.value = true;
      }
      search.value = '';
    }
    function onClickControl() {
      if (props.hideNoData && !items.value.length || props.readonly) return;
      menu.value = true;
    }
    function onKeydown(e) {
      if (props.readonly) return;
      if (['Enter', 'ArrowDown'].includes(e.key)) {
        menu.value = true;
      }
      if (['Escape'].includes(e.key)) {
        menu.value = false;
      }
      if (['Enter', 'Escape', 'Tab'].includes(e.key)) {
        isPristine.value = true;
      }
      if (e.key === 'ArrowDown') {
        var _listRef$value;
        e.preventDefault();
        (_listRef$value = listRef.value) == null ? void 0 : _listRef$value.focus('next');
      } else if (e.key === 'ArrowUp') {
        var _listRef$value2;
        e.preventDefault();
        (_listRef$value2 = listRef.value) == null ? void 0 : _listRef$value2.focus('prev');
      }
    }
    function onInput(e) {
      search.value = e.target.value;
    }
    function onAfterLeave() {
      if (isFocused.value) isPristine.value = true;
    }
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onFocusout(e) {
      if (e.relatedTarget == null) {
        var _vTextFieldRef$value;
        (_vTextFieldRef$value = vTextFieldRef.value) == null ? void 0 : _vTextFieldRef$value.focus();
      }
    }
    const isSelecting = ref(false);
    function select(item) {
      if (props.multiple) {
        const index = selected.value.findIndex(selection => selection === item.value);
        if (index === -1) {
          model.value = [...model.value, item];
          search.value = '';
        } else {
          const value = [...model.value];
          value.splice(index, 1);
          model.value = value;
        }
      } else {
        model.value = [item];
        isSelecting.value = true;
        if (!slots.selection) {
          search.value = item.title;
        }
        menu.value = false;
        isPristine.value = true;
        nextTick(() => isSelecting.value = false);
      }
    }
    watch(isFocused, val => {
      if (val) {
        var _selections$value$at;
        isSelecting.value = true;
        search.value = props.multiple || !!slots.selection ? '' : String(((_selections$value$at = selections.value.at(-1)) == null ? void 0 : _selections$value$at.props.title) ?? '');
        isPristine.value = true;
        nextTick(() => isSelecting.value = false);
      } else {
        menu.value = false;
        search.value = '';
      }
    });
    watch(search, val => {
      if (!isFocused.value || isSelecting.value) return;
      if (val) menu.value = true;
      isPristine.value = !val;
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const [textFieldProps] = filterVTextFieldProps(props);
      return _createVNode(VTextField, _mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": search.value,
        "onUpdate:modelValue": v => {
          if (v == null) model.value = [];
        },
        "validationValue": model.externalValue,
        "dirty": model.value.length > 0,
        "onInput": onInput,
        "class": ['v-autocomplete', {
          'v-autocomplete--active-menu': menu.value,
          'v-autocomplete--chips': !!props.chips,
          [`v-autocomplete--${props.multiple ? 'multiple' : 'single'}`]: true,
          'v-autocomplete--selection-slot': !!slots.selection
        }],
        "appendInnerIcon": props.menuIcon,
        "readonly": props.readonly,
        "onClick:clear": onClear,
        "onClick:control": onClickControl,
        "onClick:input": onClickControl,
        "onFocus": () => isFocused.value = true,
        "onBlur": () => isFocused.value = false,
        "onKeydown": onKeydown
      }), {
        ...slots,
        default: () => {
          var _slots$noData, _slots$prependItem, _slots$appendItem;
          return _createVNode(_Fragment, null, [_createVNode(VMenu, _mergeProps({
            "modelValue": menu.value,
            "onUpdate:modelValue": $event => menu.value = $event,
            "activator": "parent",
            "contentClass": "v-autocomplete__content",
            "eager": props.eager,
            "openOnClick": false,
            "closeOnContentClick": false,
            "transition": props.transition,
            "onAfterLeave": onAfterLeave
          }, props.menuProps), {
            default: () => [_createVNode(VList, {
              "ref": listRef,
              "selected": selected.value,
              "selectStrategy": props.multiple ? 'independent' : 'single-independent',
              "onMousedown": e => e.preventDefault(),
              "onFocusin": onFocusin,
              "onFocusout": onFocusout
            }, {
              default: () => [!filteredItems.value.length && !props.hideNoData && (((_slots$noData = slots['no-data']) == null ? void 0 : _slots$noData.call(slots)) ?? _createVNode(VListItem, {
                "title": t(props.noDataText)
              }, null)), (_slots$prependItem = slots['prepend-item']) == null ? void 0 : _slots$prependItem.call(slots), filteredItems.value.map((item, index) => {
                var _slots$item;
                return ((_slots$item = slots.item) == null ? void 0 : _slots$item.call(slots, {
                  item,
                  index,
                  props: mergeProps(item.props, {
                    onClick: () => select(item)
                  })
                })) ?? _createVNode(VListItem, _mergeProps({
                  "key": index
                }, item.props, {
                  "onClick": () => select(item)
                }), {
                  prepend: _ref2 => {
                    let {
                      isSelected
                    } = _ref2;
                    return props.multiple && !props.hideSelected ? _createVNode(VCheckboxBtn, {
                      "modelValue": isSelected,
                      "ripple": false
                    }, null) : undefined;
                  },
                  title: () => {
                    var _getMatches, _search$value;
                    return isPristine.value ? item.title : highlightResult(item.title, (_getMatches = getMatches(item)) == null ? void 0 : _getMatches.title, ((_search$value = search.value) == null ? void 0 : _search$value.length) ?? 0);
                  }
                });
              }), (_slots$appendItem = slots['append-item']) == null ? void 0 : _slots$appendItem.call(slots)]
            })]
          }), selections.value.map((item, index) => {
            function onChipClose(e) {
              e.stopPropagation();
              e.preventDefault();
              select(item);
            }
            const slotProps = {
              'onClick:close': onChipClose,
              modelValue: true,
              'onUpdate:modelValue': undefined
            };
            return _createVNode("div", {
              "key": item.value,
              "class": "v-autocomplete__selection"
            }, [hasChips ? _createVNode(VDefaultsProvider, {
              "defaults": {
                VChip: {
                  closable: props.closableChips,
                  size: 'small',
                  text: item.title
                }
              }
            }, {
              default: () => [slots.chip ? slots.chip({
                item,
                index,
                props: slotProps
              }) : _createVNode(VChip, slotProps, null)]
            }) : slots.selection ? slots.selection({
              item,
              index
            }) : _createVNode("span", {
              "class": "v-autocomplete__selection-text"
            }, [item.title, props.multiple && index < selections.value.length - 1 && _createVNode("span", {
              "class": "v-autocomplete__selection-comma"
            }, [_createTextVNode(",")])])]);
          })]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      isPristine,
      menu,
      search,
      filteredItems,
      select
    }, vTextFieldRef);
  }
});
//# sourceMappingURL=VAutocomplete.mjs.map
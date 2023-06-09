import { createTextVNode as _createTextVNode, mergeProps as _mergeProps, createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Styles
import "./VSelect.css";

// Components
import { filterVTextFieldProps, makeVTextFieldProps } from "../VTextField/VTextField.mjs";
import { VCheckboxBtn } from "../VCheckbox/index.mjs";
import { VChip } from "../VChip/index.mjs";
import { VDefaultsProvider } from "../VDefaultsProvider/index.mjs";
import { VDialogTransition } from "../transitions/index.mjs";
import { VList, VListItem } from "../VList/index.mjs";
import { VMenu } from "../VMenu/index.mjs";
import { VTextField } from "../VTextField/index.mjs"; // Composables
import { makeItemsProps, useItems } from "../../composables/items.mjs";
import { makeTransitionProps } from "../../composables/transition.mjs";
import { forwardRefs } from "../../composables/forwardRefs.mjs";
import { useLocale } from "../../composables/locale.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs";
import { IconValue } from "../../composables/icons.mjs"; // Utility
import { computed, mergeProps, ref } from 'vue';
import { deepEqual, genericComponent, omit, propsFactory, useRender, wrapInArray } from "../../util/index.mjs"; // Types
export const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  menu: Boolean,
  menuIcon: {
    type: IconValue,
    default: '$dropdown'
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: '$vuetify.noDataText'
  },
  openOnClear: Boolean,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeItemsProps({
    itemChildren: false
  })
}, 'v-select');
export const VSelect = genericComponent()({
  name: 'VSelect',
  props: {
    ...makeSelectProps(),
    ...omit(makeVTextFieldProps({
      modelValue: null
    }), ['validationValue', 'dirty', 'appendInnerIcon']),
    ...makeTransitionProps({
      transition: {
        component: VDialogTransition
      }
    })
  },
  emits: {
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
    const menu = useProxiedModel(props, 'menu');
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const model = useProxiedModel(props, 'modelValue', [], v => transformIn(wrapInArray(v)), v => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
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
    }
    function onClickControl() {
      if (props.hideNoData && !items.value.length || props.readonly) return;
      menu.value = !menu.value;
    }
    function onKeydown(e) {
      if (props.readonly) return;
      if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault();
        menu.value = true;
      }
      if (['Escape', 'Tab'].includes(e.key)) {
        menu.value = false;
      }
      if (e.key === 'ArrowDown') {
        var _listRef$value;
        (_listRef$value = listRef.value) == null ? void 0 : _listRef$value.focus('next');
      } else if (e.key === 'ArrowUp') {
        var _listRef$value2;
        e.preventDefault();
        (_listRef$value2 = listRef.value) == null ? void 0 : _listRef$value2.focus('prev');
      } else if (e.key === 'Home') {
        var _listRef$value3;
        e.preventDefault();
        (_listRef$value3 = listRef.value) == null ? void 0 : _listRef$value3.focus('first');
      } else if (e.key === 'End') {
        var _listRef$value4;
        e.preventDefault();
        (_listRef$value4 = listRef.value) == null ? void 0 : _listRef$value4.focus('last');
      }
    }
    function select(item) {
      if (props.multiple) {
        const index = selected.value.findIndex(selection => selection === item.value);
        if (index === -1) {
          model.value = [...model.value, item];
        } else {
          const value = [...model.value];
          value.splice(index, 1);
          model.value = value;
        }
      } else {
        model.value = [item];
        menu.value = false;
      }
    }
    function onBlur(e) {
      var _listRef$value5;
      if (!((_listRef$value5 = listRef.value) != null && _listRef$value5.$el.contains(e.relatedTarget))) {
        menu.value = false;
      }
    }
    function onFocusout(e) {
      if (e.relatedTarget == null) {
        var _vTextFieldRef$value;
        (_vTextFieldRef$value = vTextFieldRef.value) == null ? void 0 : _vTextFieldRef$value.focus();
      }
    }
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const [textFieldProps] = filterVTextFieldProps(props);
      return _createVNode(VTextField, _mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": model.value.map(v => v.props.value).join(', '),
        "onUpdate:modelValue": v => {
          if (v == null) model.value = [];
        },
        "validationValue": model.externalValue,
        "dirty": model.value.length > 0,
        "class": ['v-select', {
          'v-select--active-menu': menu.value,
          'v-select--chips': !!props.chips,
          [`v-select--${props.multiple ? 'multiple' : 'single'}`]: true,
          'v-select--selected': model.value.length
        }],
        "appendInnerIcon": props.menuIcon,
        "readonly": true,
        "onClick:clear": onClear,
        "onClick:control": onClickControl,
        "onBlur": onBlur,
        "onKeydown": onKeydown
      }), {
        ...slots,
        default: () => {
          var _slots$noData, _slots$prependItem, _slots$appendItem;
          return _createVNode(_Fragment, null, [_createVNode(VMenu, _mergeProps({
            "modelValue": menu.value,
            "onUpdate:modelValue": $event => menu.value = $event,
            "activator": "parent",
            "contentClass": "v-select__content",
            "eager": props.eager,
            "openOnClick": false,
            "closeOnContentClick": false,
            "transition": props.transition
          }, props.menuProps), {
            default: () => [_createVNode(VList, {
              "ref": listRef,
              "selected": selected.value,
              "selectStrategy": props.multiple ? 'independent' : 'single-independent',
              "onMousedown": e => e.preventDefault(),
              "onFocusout": onFocusout
            }, {
              default: () => [!items.value.length && !props.hideNoData && (((_slots$noData = slots['no-data']) == null ? void 0 : _slots$noData.call(slots)) ?? _createVNode(VListItem, {
                "title": t(props.noDataText)
              }, null)), (_slots$prependItem = slots['prepend-item']) == null ? void 0 : _slots$prependItem.call(slots), items.value.map((item, index) => {
                if (slots.item) {
                  var _slots$item;
                  return (_slots$item = slots.item) == null ? void 0 : _slots$item.call(slots, {
                    item,
                    index,
                    props: mergeProps(item.props, {
                      onClick: () => select(item)
                    })
                  });
                }
                return _createVNode(VListItem, _mergeProps({
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
              "class": "v-select__selection"
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
              "class": "v-select__selection-text"
            }, [item.title, props.multiple && index < selections.value.length - 1 && _createVNode("span", {
              "class": "v-select__selection-comma"
            }, [_createTextVNode(",")])])]);
          })]);
        }
      });
    });
    return forwardRefs({
      menu,
      select
    }, vTextFieldRef);
  }
});
//# sourceMappingURL=VSelect.mjs.map
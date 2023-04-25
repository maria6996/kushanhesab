import { createVNode as _createVNode } from "vue";
// Composables
import { makeRouterProps, useLink } from "../../composables/router.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { useTextColor } from "../../composables/color.mjs"; // Utilities
import { computed } from 'vue';
import { defineComponent, useRender } from "../../util/index.mjs";
export const VBreadcrumbsItem = defineComponent({
  name: 'VBreadcrumbsItem',
  props: {
    active: Boolean,
    activeClass: String,
    activeColor: String,
    color: String,
    disabled: Boolean,
    title: String,
    ...makeRouterProps(),
    ...makeTagProps({
      tag: 'li'
    })
  },
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      var _link$isActive;
      return props.active || ((_link$isActive = link.isActive) == null ? void 0 : _link$isActive.value);
    });
    const color = computed(() => isActive.value ? props.activeColor : props.color);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    useRender(() => {
      var _slots$default;
      const Tag = link.isLink.value ? 'a' : props.tag;
      return _createVNode(Tag, {
        "class": ['v-breadcrumbs-item', {
          'v-breadcrumbs-item--active': isActive.value,
          'v-breadcrumbs-item--disabled': props.disabled,
          'v-breadcrumbs-item--link': link.isLink.value,
          [`${props.activeClass}`]: isActive.value && props.activeClass
        }, textColorClasses.value],
        "style": [textColorStyles.value],
        "href": link.href.value,
        "aria-current": isActive.value ? 'page' : undefined,
        "onClick": link.navigate
      }, {
        default: () => [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) ?? props.title]
      });
    });
    return {};
  }
});
//# sourceMappingURL=VBreadcrumbsItem.mjs.map
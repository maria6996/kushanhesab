import { mergeProps as _mergeProps, createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Styles
import "./VNavigationDrawer.css";

// Composables
import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makeLayoutItemProps, useLayoutItem } from "../../composables/layout.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, provideTheme } from "../../composables/theme.mjs";
import { provideDefaults } from "../../composables/defaults.mjs";
import { useBackgroundColor } from "../../composables/color.mjs";
import { useDisplay } from "../../composables/display.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs";
import { useRouter } from "../../composables/router.mjs";
import { useRtl } from "../../composables/index.mjs";
import { useSsrBoot } from "../../composables/ssrBoot.mjs";
import { useSticky } from "./sticky.mjs";
import { useTouch } from "./touch.mjs"; // Utilities
import { computed, nextTick, onBeforeMount, ref, toRef, Transition, watch } from 'vue';
import { convertToUnit, defineComponent, toPhysical, useRender } from "../../util/index.mjs"; // Types
const locations = ['start', 'end', 'left', 'right', 'bottom'];
export const VNavigationDrawer = defineComponent({
  name: 'VNavigationDrawer',
  props: {
    color: String,
    disableResizeWatcher: Boolean,
    disableRouteWatcher: Boolean,
    expandOnHover: Boolean,
    floating: Boolean,
    modelValue: {
      type: Boolean,
      default: null
    },
    permanent: Boolean,
    rail: {
      type: Boolean,
      default: null
    },
    railWidth: {
      type: [Number, String],
      default: 56
    },
    scrim: {
      type: [String, Boolean],
      default: true
    },
    image: String,
    temporary: Boolean,
    touchless: Boolean,
    width: {
      type: [Number, String],
      default: 256
    },
    location: {
      type: String,
      default: 'start',
      validator: value => locations.includes(value)
    },
    sticky: Boolean,
    ...makeBorderProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: 'nav'
    }),
    ...makeThemeProps()
  },
  emits: {
    'update:modelValue': val => true,
    'update:rail': val => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'color'));
    const {
      elevationClasses
    } = useElevation(props);
    const {
      mobile
    } = useDisplay();
    const {
      roundedClasses
    } = useRounded(props);
    const router = useRouter();
    const isActive = useProxiedModel(props, 'modelValue', null, v => !!v);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const rootEl = ref();
    const isHovering = ref(false);
    const width = computed(() => {
      return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
    });
    const location = computed(() => {
      return toPhysical(props.location, isRtl.value);
    });
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
    const isSticky = computed(() => props.sticky && !isTemporary.value && location.value !== 'bottom');
    if (props.expandOnHover && props.rail != null) {
      watch(isHovering, val => emit('update:rail', !val));
    }
    if (!props.disableResizeWatcher) {
      watch(isTemporary, val => !props.permanent && nextTick(() => isActive.value = !val));
    }
    if (!props.disableRouteWatcher && router) {
      watch(router.currentRoute, () => isTemporary.value && (isActive.value = false));
    }
    watch(() => props.permanent, val => {
      if (val) isActive.value = true;
    });
    onBeforeMount(() => {
      if (props.modelValue != null || isTemporary.value) return;
      isActive.value = props.permanent || !mobile.value;
    });
    const {
      isDragging,
      dragProgress,
      dragStyles
    } = useTouch({
      isActive,
      isTemporary,
      width,
      touchless: toRef(props, 'touchless'),
      position: location
    });
    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
      return isDragging.value ? size * dragProgress.value : size;
    });
    const {
      layoutItemStyles,
      layoutRect,
      layoutItemScrimStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location,
      layoutSize,
      elementSize: width,
      active: computed(() => isActive.value || isDragging.value),
      disableTransitions: computed(() => isDragging.value),
      absolute: computed(() =>
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      props.absolute || isSticky.value && typeof isStuck.value !== 'string')
    });
    const {
      isStuck,
      stickyStyles
    } = useSticky({
      rootEl,
      isSticky,
      layoutItemStyles
    });
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === 'string' ? props.scrim : null;
    }));
    const scrimStyles = computed(() => ({
      ...(isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: 'none'
      } : undefined),
      ...(layoutRect.value ? {
        left: convertToUnit(layoutRect.value.left),
        right: convertToUnit(layoutRect.value.right),
        top: convertToUnit(layoutRect.value.top),
        bottom: convertToUnit(layoutRect.value.bottom)
      } : undefined),
      ...layoutItemScrimStyles.value
    }));
    provideDefaults({
      VList: {
        bgColor: 'transparent'
      }
    });
    useRender(() => {
      var _slots$image, _slots$prepend, _slots$default, _slots$append;
      const hasImage = slots.image || props.image;
      return _createVNode(_Fragment, null, [_createVNode(props.tag, _mergeProps({
        "ref": rootEl,
        "onMouseenter": () => isHovering.value = true,
        "onMouseleave": () => isHovering.value = false,
        "class": ['v-navigation-drawer', `v-navigation-drawer--${location.value}`, {
          'v-navigation-drawer--expand-on-hover': props.expandOnHover,
          'v-navigation-drawer--floating': props.floating,
          'v-navigation-drawer--is-hovering': isHovering.value,
          'v-navigation-drawer--rail': props.rail,
          'v-navigation-drawer--temporary': isTemporary.value,
          'v-navigation-drawer--active': isActive.value,
          'v-navigation-drawer--sticky': isSticky.value
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, dragStyles.value, ssrBootStyles.value, stickyStyles.value]
      }, attrs), {
        default: () => [hasImage && _createVNode("div", {
          "key": "image",
          "class": "v-navigation-drawer__img"
        }, [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots, {
          image: props.image
        }) : _createVNode("img", {
          "src": props.image,
          "alt": ""
        }, null)]), slots.prepend && _createVNode("div", {
          "class": "v-navigation-drawer__prepend"
        }, [(_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)]), _createVNode("div", {
          "class": "v-navigation-drawer__content"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), slots.append && _createVNode("div", {
          "class": "v-navigation-drawer__append"
        }, [(_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)])]
      }), _createVNode(Transition, {
        "name": "fade-transition"
      }, {
        default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && _createVNode("div", {
          "class": ['v-navigation-drawer__scrim', scrimColor.backgroundColorClasses.value],
          "style": [scrimStyles.value, scrimColor.backgroundColorStyles.value],
          "onClick": () => isActive.value = false
        }, null)]
      })]);
    });
    return {
      isStuck
    };
  }
});
//# sourceMappingURL=VNavigationDrawer.mjs.map
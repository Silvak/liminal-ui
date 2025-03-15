/**
 * Retrieves the props of a given React component or HTML element.
 * @template C
 * @param {C} component
 * @returns {React.ComponentPropsWithRef<C>}
 */
function getPropsOf(component) {
  return component?.props || {};
}

/**
 * Allows specifying an override of the default HTML tag.
 * Can also be another React component.
 * @template C
 * @typedef {{ as?: C }} AsProp
 */

/**
 * Merges two sets of props, ensuring that duplicate keys are overridden.
 * @param {Object} extendedProps
 * @param {Object} overrideProps
 * @returns {Object}
 */
function extendableProps(extendedProps = {}, overrideProps = {}) {
  return { ...extendedProps, ...overrideProps };
}

/**
 * Inherits props from a specified element type, allowing for common attributes like `children`,
 * `className`, `style`, and specific attributes such as ARIA roles.
 * @param {React.ElementType} component
 * @param {Object} props
 * @returns {Object}
 */
function inheritableElementProps(component, props = {}) {
  return extendableProps(getPropsOf(component), props);
}

/**
 * A more flexible version of `inheritableElementProps`, where the `as` prop determines
 * which props can be included.
 * @param {React.ElementType} component
 * @param {Object} props
 * @returns {Object}
 */
function polymorphicComponentProps(component, props = {}) {
  return inheritableElementProps(component, { ...props, as: props.as });
}

/**
 * Retrieves the `ref` of a given React component or HTML element.
 * @template C
 * @param {C} component
 * @returns {React.ComponentPropsWithRef<C>["ref"]}
 */
function getPolymorphicRef(component) {
  return component?.ref || null;
}

/**
 * Extends `polymorphicComponentProps` by including a `ref` property.
 * @param {React.ElementType} component
 * @param {Object} props
 * @returns {Object}
 */
function polymorphicComponentPropsWithRef(component, props = {}) {
  return {
    ...polymorphicComponentProps(component, props),
    ref: getPolymorphicRef(component),
  };
}

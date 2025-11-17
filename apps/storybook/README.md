# Code Conventions

## container queries over media queries where appropriate.

Consider templates are scaffolded out in code, but bits and pieces are customizable for the end-user via the webapp. The templates rely on the usage of container queries to provide website builder-like experience.

examples / read more: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries

## psuedo states use `&:`

if it can be avoided (it should be avoidable), do not use the full class name to target a psuedo state, but rather use nested css for consistent groupings

example:

```
.mn-navigation-list-item {
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom-color: var(--text-color);
  }
}
```

## no using `important!` ever

It's just creating a problem later. It can be easily avoided. Use order-of-specificity instead https://www.w3schools.com/css/css_specificity.asp.

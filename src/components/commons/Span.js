export const Span = (props) => (props.value ? props.child : null);

Span.defaultProps = {
    child: () => null,
};

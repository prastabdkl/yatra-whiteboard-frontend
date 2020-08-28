import { canAccess } from "../../misc/permissions";

export const Can = (props) =>
    canAccess(props.perform) ? props.yes() : props.no();

Can.defaultProps = {
    yes: () => null,
    no: () => null,
};

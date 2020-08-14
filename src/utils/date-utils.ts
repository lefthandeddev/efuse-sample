import { formatDistanceToNow } from "date-fns";

const fromNow = (date: Date): string => {
    return formatDistanceToNow(date, { addSuffix: true });
};

export default { fromNow };
